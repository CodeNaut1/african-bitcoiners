export function bountyAcceptedEmail({
  name,
  feedbackTitle,
  voucherCode,
}: {
  name: string
  feedbackTitle: string
  voucherCode: string
}): { subject: string; html: string } {
  return {
    subject: '🎉 Your Feedback Has Been Accepted — Claim Your 1,000 Sats!',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Feedback Accepted</title></head>
<body style="margin:0;padding:0;background:#FFF9F5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF9F5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:#253343;padding:32px 40px;text-align:center;">
          <p style="margin:0;color:#F7931A;font-size:13px;letter-spacing:3px;font-weight:bold;">AFRICAN BITCOINERS</p>
          <h1 style="margin:12px 0 0;color:#ffffff;font-size:24px;">Feedback Bounty</h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <p style="color:#2F2614;font-size:16px;margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
          <p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 20px;">
            Congratulations! Your feedback has been reviewed and <strong>accepted</strong>. We truly appreciate you taking the time to help us improve African Bitcoiners.
          </p>
          <div style="background:#FFF9F5;border:1px solid #E5E7EB;border-radius:8px;padding:20px;margin:0 0 24px;">
            <p style="margin:0 0 8px;font-size:13px;color:#667085;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Your Feedback</p>
            <p style="margin:0;font-size:15px;color:#253343;font-weight:600;">${feedbackTitle}</p>
          </div>
          <p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 20px;">As a thank you, here is your <strong>1,000 sats reward</strong>:</p>
          <!-- Voucher code box -->
          <div style="background:#253343;border-radius:8px;padding:24px;text-align:center;margin:0 0 24px;">
            <p style="margin:0 0 8px;color:#F7931A;font-size:12px;letter-spacing:2px;font-weight:bold;">YOUR VOUCHER CODE</p>
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:bold;font-family:monospace;letter-spacing:2px;">${voucherCode}</p>
          </div>
          <p style="color:#333;font-size:14px;line-height:1.7;margin:0 0 8px;"><strong>How to redeem:</strong></p>
          <ol style="color:#333;font-size:14px;line-height:1.9;margin:0 0 24px;padding-left:20px;">
            <li>Open your Bitcoin Lightning wallet (e.g. Phoenix, Muun, Zeus)</li>
            <li>Scan or paste the LNURL voucher code above</li>
            <li>Confirm to receive your 1,000 sats</li>
          </ol>
          <p style="color:#667085;font-size:13px;line-height:1.7;margin:0 0 24px;">
            If you have any trouble redeeming, reply to this email and we'll help you out.
          </p>
          <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;">
          <p style="color:#333;font-size:14px;line-height:1.7;margin:0;">
            Thank you for helping us build a better Bitcoin community for Africa. 🌍<br>
            <strong style="color:#253343;">The African Bitcoiners Team</strong>
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#F9FAFB;padding:20px 40px;text-align:center;border-top:1px solid #E5E7EB;">
          <p style="margin:0;font-size:12px;color:#9CA3AF;">African Bitcoiners · <a href="https://bitcoiners.africa" style="color:#F7931A;text-decoration:none;">bitcoiners.africa</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  }
}
