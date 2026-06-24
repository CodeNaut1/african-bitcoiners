import { google } from 'googleapis'

// Sheet IDs sourced from env vars — will be replaced by GoogleSheetsSettings global
// once EM fills in the mappings from the admin dashboard.
export const SHEET_IDS = {
  volunteers: process.env.GSHEET_VOLUNTEERS ?? '',
  'feedback-bounties': process.env.GSHEET_FEEDBACK_BOUNTY ?? '',
  'bfb-feedback': process.env.GSHEET_BFB_FEEDBACK ?? '',
  nps: process.env.GSHEET_NPS ?? '',
  'miab-nominations': process.env.GSHEET_MIAB ?? '',
  'grad-applications': process.env.GSHEET_GRAD ?? '',
} as const

function getSheetsClient() {
  const email = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL
  const key = (process.env.GOOGLE_SHEETS_PRIVATE_KEY ?? '').replace(/\\n/g, '\n')
  if (!email || !key) return null

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

/**
 * Append a row to a Google Sheet.
 * @param spreadsheetId  The Google Sheet ID (from URL)
 * @param sheetName      The tab name within the sheet (e.g. "Sheet1")
 * @param values         Array of values to append as a new row
 */
export async function appendRow(
  spreadsheetId: string,
  sheetName: string,
  values: (string | number | boolean | null)[],
): Promise<void> {
  if (!spreadsheetId) {
    console.log(`[sheets:stub] no spreadsheetId for tab=${sheetName}`, values)
    return
  }

  const sheets = getSheetsClient()
  if (!sheets) {
    console.log(`[sheets:stub] not configured. sheet=${spreadsheetId} tab=${sheetName}`, values)
    return
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [values] },
    })
  } catch (err: any) {
    console.error('[sheets] appendRow error:', err.message)
  }
}

/**
 * Get the tab names within a spreadsheet.
 * Used by the admin UI to preview available sheets before mapping.
 */
export async function getSheetTabs(spreadsheetId: string): Promise<string[]> {
  if (!spreadsheetId) return []

  const sheets = getSheetsClient()
  if (!sheets) return []

  try {
    const res = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties.title',
    })
    return (res.data.sheets ?? []).map((s: any) => s.properties?.title ?? '').filter(Boolean)
  } catch (err: any) {
    console.error('[sheets] getSheetTabs error:', err.message)
    return []
  }
}
