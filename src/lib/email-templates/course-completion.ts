import { wrapEmail } from './wrapper'

type CourseCompletionEmailParams = {
  name: string
  email: string
  uniqueCode?: string | null
  tbtDiscount?: string | null
}

const CERTIFICATE_URL = 'https://bitcoiners.africa/get-certificate'
const TBT_URL = 'https://bitcoinertest.com/'

export function buildCourseCompletionEmail(params: CourseCompletionEmailParams): {
  subject: string
  html: string
} {
  const { name, email, uniqueCode, tbtDiscount } = params
  const includeDiscount = Boolean(tbtDiscount)

  const uniqueCodeLine = uniqueCode
    ? `<p>Your Course completion Unique code: <strong>${uniqueCode}</strong> (Only applicable to external education forum students).</p>`
    : ''

  const discountSection = includeDiscount
    ? `
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:28px 0;" />
        <p>Ready for the next challenge? As a graduate of the Bitcoin for Beginners Course, you get an exclusive 50% discount to assess your knowledge on The Bitcoiner Test. <a href="${TBT_URL}" style="color:#FD5A47;">Link to The Bitcoiner Test</a></p>
        <p><strong>Discount code: ${tbtDiscount}</strong></p>
        <p>Use the code to get a discount on the test to showcase your expertise in Bitcoin and get industry certified today!</p>
      `
    : ''

  const body = `
    <p>Hello ${name},</p>
    <p>Congratulations on passing the Bitcoin for Beginners Course, we are so proud of you! This was not a simple journey but you persevered and scaled through, therefore we say well done.</p>
    <p>To download your Certificate, please take note of your email address used in taking the course below. This will be needed to download your certificate using this link: <a href="${CERTIFICATE_URL}" style="color:#FD5A47;">Link to Download Certificate</a></p>
    <p><strong>Email address:</strong> ${email}</p>
    <p>Copy your email address above and follow the certificate link to download your certificate, IF you haven't done so already!</p>
    ${uniqueCodeLine}
    ${discountSection}
    <p>Best regards,<br />African Bitcoiners</p>
  `

  return {
    subject: 'WOO HOO, YOU DID IT! 🎉',
    html: wrapEmail(body, 'Congratulations on passing the BFB course!'),
  }
}
