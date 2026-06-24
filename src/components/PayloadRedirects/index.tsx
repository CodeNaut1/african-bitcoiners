import type React from 'react'
import type { Page, Post } from '@/payload-types'

import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { normalizeRedirectPath } from '@/utilities/homePage'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

function shouldFollowRedirect(currentUrl: string, destination: string): boolean {
  const target = normalizeRedirectPath(destination)
  const current = normalizeRedirectPath(currentUrl)
  return target !== current
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      if (shouldFollowRedirect(url, redirectItem.to.url)) {
        redirect(normalizeRedirectPath(redirectItem.to.url))
      }
    } else {
      let redirectUrl: string

      if (typeof redirectItem.to?.reference?.value === 'string') {
        const collection = redirectItem.to?.reference?.relationTo
        const id = redirectItem.to?.reference?.value

        const document = (await getCachedDocument(collection, id)()) as Page | Post
        redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
          document?.slug
        }`
      } else {
        redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
          typeof redirectItem.to?.reference?.value === 'object'
            ? redirectItem.to?.reference?.value?.slug
            : ''
        }`
      }

      if (redirectUrl && shouldFollowRedirect(url, redirectUrl)) {
        redirect(normalizeRedirectPath(redirectUrl))
      }
    }
  }

  if (disableNotFound) return null

  notFound()
}
