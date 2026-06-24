import crypto from 'node:crypto'

const API_URL = 'https://api.blink.sv/graphql'

function getApiKey() {
  return process.env.BLINK_API_KEY ?? ''
}

function getWalletId() {
  return process.env.BLINK_WALLET_ID ?? ''
}

async function graphqlRequest<T = any>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('[blink] BLINK_API_KEY not configured')

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`[blink] HTTP ${res.status}: ${text.slice(0, 200)}`)
  }

  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(`[blink] GraphQL error: ${json.errors[0].message}`)
  }

  return json.data
}

// ── Invoice types ─────────────────────────────────────────────────────────────

export type LnInvoiceResult = {
  paymentRequest: string
  paymentHash: string
  satoshis: number
}

// ── Lightning ─────────────────────────────────────────────────────────────────

export async function createLnInvoice(sats: number, memo: string): Promise<LnInvoiceResult> {
  const data = await graphqlRequest(
    `mutation LnInvoiceCreate($input: LnInvoiceCreateInput!) {
      lnInvoiceCreate(input: $input) {
        invoice { paymentRequest paymentHash satoshis }
        errors { message }
      }
    }`,
    { input: { walletId: getWalletId(), amount: sats, memo } },
  )

  const errors = data.lnInvoiceCreate?.errors
  if (errors?.length) throw new Error(`[blink] ${errors[0].message}`)

  const inv = data.lnInvoiceCreate?.invoice
  if (!inv) throw new Error('[blink] No invoice returned')

  return {
    paymentRequest: inv.paymentRequest,
    paymentHash: inv.paymentHash,
    satoshis: inv.satoshis,
  }
}

export async function checkLnPaymentStatus(paymentHash: string): Promise<'PAID' | 'PENDING'> {
  const data = await graphqlRequest(
    `query TxByPaymentHash($walletId: WalletId!, $paymentHash: PaymentHash!) {
      me {
        defaultAccount {
          walletById(walletId: $walletId) {
            transactionsByPaymentHash(paymentHash: $paymentHash) {
              status
            }
          }
        }
      }
    }`,
    { walletId: getWalletId(), paymentHash },
  )

  const txs = data?.me?.defaultAccount?.walletById?.transactionsByPaymentHash ?? []
  const settled = txs.some((tx: any) => tx.status === 'SUCCESS')
  return settled ? 'PAID' : 'PENDING'
}

// ── On-chain ──────────────────────────────────────────────────────────────────

export async function createOnchainAddress(): Promise<string> {
  const data = await graphqlRequest(
    `mutation OnChainAddressCreate($input: OnChainAddressCreateInput!) {
      onChainAddressCreate(input: $input) {
        address
        errors { message }
      }
    }`,
    { input: { walletId: getWalletId() } },
  )

  const errors = data.onChainAddressCreate?.errors
  if (errors?.length) throw new Error(`[blink] ${errors[0].message}`)

  const address = data.onChainAddressCreate?.address
  if (!address) throw new Error('[blink] No address returned')

  return address
}

export async function checkOnchainStatus(address: string): Promise<'PAID' | 'PENDING'> {
  const data = await graphqlRequest(
    `query TxByAddress($walletId: WalletId!, $address: OnChainAddress!) {
      me {
        defaultAccount {
          walletById(walletId: $walletId) {
            transactionsByAddress(address: $address) { status }
            pendingIncomingTransactionsByAddress(address: $address) { settlementAmount }
          }
        }
      }
    }`,
    { walletId: getWalletId(), address },
  )

  const wallet = data?.me?.defaultAccount?.walletById
  const settled = (wallet?.transactionsByAddress ?? []).some((tx: any) => tx.status === 'SUCCESS')
  const pending = (wallet?.pendingIncomingTransactionsByAddress ?? []).length > 0
  return settled || pending ? 'PAID' : 'PENDING'
}

// ── Webhook verification (Svix) ───────────────────────────────────────────────

export function verifyWebhook(
  payload: string,
  svixId: string,
  svixTimestamp: string,
  svixSignature: string,
): boolean {
  const secret = process.env.BLINK_WEBHOOK_SECRET ?? ''
  if (!secret) return false

  // Strip "whsec_" prefix, base64-decode to get the HMAC key
  const base64Key = secret.replace(/^whsec_/, '')
  const key = Buffer.from(base64Key, 'base64')

  // Reject timestamps older than 5 minutes
  const ts = parseInt(svixTimestamp, 10)
  if (isNaN(ts) || Date.now() / 1000 - ts > 300) return false

  // Signed content: "{svix-id}.{svix-timestamp}.{body}"
  const toSign = `${svixId}.${svixTimestamp}.${payload}`
  const expected = crypto.createHmac('sha256', key).update(toSign).digest('base64')

  // Svix may send multiple signatures separated by spaces; accept any match
  return svixSignature.split(' ').some((sig) => {
    const clean = sig.replace(/^v1,/, '')
    try {
      return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(clean))
    } catch {
      return false
    }
  })
}
