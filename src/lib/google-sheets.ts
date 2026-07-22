import { google } from 'googleapis'

import {
  FEEDBACK_LIVE_SPREADSHEET_ID,
  FEEDBACK_LIVE_TABS,
  type FeedbackLiveTabKey,
} from '@/lib/feedback-live-sheet'

// Legacy per-form env vars — prefer GSHEET_FEEDBACK_LIVE (one workbook, many tabs).
export const SHEET_IDS = {
  volunteers: process.env.GSHEET_VOLUNTEERS ?? '',
  'feedback-bounties':
    process.env.GSHEET_FEEDBACK_BOUNTY || FEEDBACK_LIVE_SPREADSHEET_ID || '',
  'bfb-feedback': process.env.GSHEET_BFB_FEEDBACK || FEEDBACK_LIVE_SPREADSHEET_ID || '',
  nps: process.env.GSHEET_NPS || FEEDBACK_LIVE_SPREADSHEET_ID || '',
  'miab-nominations': process.env.GSHEET_MIAB || FEEDBACK_LIVE_SPREADSHEET_ID || '',
  'grad-applications': process.env.GSHEET_GRAD || FEEDBACK_LIVE_SPREADSHEET_ID || '',
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
 * @param sheetName      The tab name within the spreadsheet (e.g. "NPS Feedback")
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
    // Quote tab names that contain spaces / special chars for A1 notation
    const safeTab = sheetName.includes(' ') || /[^A-Za-z0-9_]/.test(sheetName)
      ? `'${sheetName.replace(/'/g, "''")}'`
      : sheetName

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${safeTab}!A:Z`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [values] },
    })
  } catch (err: any) {
    console.error('[sheets] appendRow error:', err.message)
  }
}

/** Append a row to a tab inside the Feedback Live workbook. */
export async function appendFeedbackLiveRow(
  tabKey: FeedbackLiveTabKey,
  values: (string | number | boolean | null)[],
): Promise<void> {
  const spreadsheetId = FEEDBACK_LIVE_SPREADSHEET_ID
  if (!spreadsheetId) {
    console.log(`[sheets:stub] GSHEET_FEEDBACK_LIVE missing — skip tab=${FEEDBACK_LIVE_TABS[tabKey]}`, values)
    return
  }
  await appendRow(spreadsheetId, FEEDBACK_LIVE_TABS[tabKey], values)
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
