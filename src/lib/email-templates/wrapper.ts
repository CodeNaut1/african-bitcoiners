/**
 * AB-branded HTML email wrapper.
 * Use for all transactional and notification emails.
 */
export function wrapEmail(bodyContent: string, previewText = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>African Bitcoiners</title>
  ${previewText ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText}&nbsp;</div>` : ''}
</head>
<body style="margin:0;padding:0;background:#FFF9F5;font-family:Arial,Helvetica,sans-serif;color:#2F2614;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF9F5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#253343;padding:28px 40px;text-align:center;">
            <p style="margin:0 0 4px;color:#FD5A47;font-size:11px;letter-spacing:3px;font-weight:bold;text-transform:uppercase;">African Bitcoiners</p>
            <p style="margin:0;color:rgba(255,255,255,0.6);font-size:12px;">Building a Bitcoin-native Africa</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            ${bodyContent}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F9FAFB;padding:20px 40px;border-top:1px solid #E5E7EB;text-align:center;">
            <p style="margin:0 0 10px;font-size:12px;color:#9CA3AF;">
              Follow us:
              <a href="https://twitter.com/AfricanBitcoins" style="color:#FD5A47;text-decoration:none;margin:0 6px;">X / Twitter</a>
              <a href="https://t.me/africanbitcoiners" style="color:#FD5A47;text-decoration:none;margin:0 6px;">Telegram</a>
              <a href="https://www.instagram.com/africanbitcoiners/" style="color:#FD5A47;text-decoration:none;margin:0 6px;">Instagram</a>
            </p>
            <p style="margin:0;font-size:11px;color:#D1D5DB;">
              African Bitcoiners ·
              <a href="https://bitcoiners.africa" style="color:#FD5A47;text-decoration:none;">bitcoiners.africa</a>
              · <a href="https://bitcoiners.africa/unsubscribe" style="color:#9CA3AF;text-decoration:none;">Unsubscribe</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

/** Convenience: wrap a simple notification with a title + data dump. */
export function notificationEmail(title: string, data: Record<string, unknown>): string {
  const rows = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:7px 12px;font-weight:600;color:#667085;font-size:13px;white-space:nowrap;vertical-align:top;width:150px;">${k}</td>
          <td style="padding:7px 12px;font-size:13px;color:#2F2614;">${String(v)}</td>
        </tr>`,
    )
    .join('')

  const body = `
    <h2 style="margin:0 0 20px;font-size:18px;color:#253343;">${title}</h2>
    <table style="width:100%;border-collapse:collapse;background:#F9FAFB;border-radius:8px;overflow:hidden;">
      ${rows}
    </table>
  `

  return wrapEmail(body, title)
}
