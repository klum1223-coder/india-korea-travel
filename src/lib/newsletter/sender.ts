// ─── Newsletter Email Sender ──────────────────────────────────────────────────
// Uses Resend REST API when RESEND_API_KEY is set.
// Falls back to console.log simulation for local development.

const RESEND_API_URL = 'https://api.resend.com/emails'
const FROM_ADDRESS = 'Discover Korea <newsletter@discoverkorea.edu>'

// Brand colours
const PRIMARY = '#1B3A5C'
const SECONDARY = '#E8732A'

// ─── HTML Template ────────────────────────────────────────────────────────────

export function generateBlogNewsletterHtml(post: {
  title: string
  excerpt: string
  slug: string
}): string {
  const postUrl = `https://discoverkorea.edu/blog/${post.slug}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(post.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:${PRIMARY};padding:24px 32px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">
                Discover Korea
              </p>
              <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:1px;text-transform:uppercase;">
                Educational Travel for Indian Students
              </p>
            </td>
          </tr>

          <!-- Label -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <p style="margin:0;font-size:12px;font-weight:700;color:${SECONDARY};text-transform:uppercase;letter-spacing:1px;">
                New Article
              </p>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:0 32px 16px;">
              <h1 style="margin:0;font-size:24px;font-weight:700;color:${PRIMARY};line-height:1.3;">
                ${escapeHtml(post.title)}
              </h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <hr style="border:none;border-top:2px solid ${SECONDARY};margin:0;width:48px;text-align:left;" />
            </td>
          </tr>

          <!-- Excerpt -->
          <tr>
            <td style="padding:20px 32px 28px;">
              <p style="margin:0;font-size:15px;color:#444444;line-height:1.7;">
                ${escapeHtml(post.excerpt)}
              </p>
            </td>
          </tr>

          <!-- CTA button -->
          <tr>
            <td style="padding:0 32px 36px;">
              <a href="${postUrl}"
                 style="display:inline-block;background-color:${SECONDARY};color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 28px;border-radius:6px;letter-spacing:0.3px;">
                Read More &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9f9f9;border-top:1px solid #eeeeee;padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999999;">
                You received this email because you subscribed to Discover Korea updates.<br />
                &copy; 2026 Discover Korea. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Send ─────────────────────────────────────────────────────────────────────

export async function sendNewsletter(
  subject: string,
  htmlContent: string,
  subscriberList: string[]
): Promise<{ sent: number; failed: number }> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    // Development simulation
    console.log('─── [Newsletter] No RESEND_API_KEY — simulating send ───')
    console.log(`Subject : ${subject}`)
    console.log(`To      : ${subscriberList.length} subscriber(s)`)
    subscriberList.forEach((email) => console.log(`  • ${email}`))
    console.log('────────────────────────────────────────────────────────')
    return { sent: subscriberList.length, failed: 0 }
  }

  let sent = 0
  let failed = 0

  // Send individually so that one failure doesn't abort the whole batch.
  // For high volume, switch to Resend's batch endpoint: POST /emails/batch
  const results = await Promise.allSettled(
    subscriberList.map((to) =>
      fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_ADDRESS,
          to: [to],
          subject,
          html: htmlContent,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const text = await res.text()
          throw new Error(`Resend API error ${res.status}: ${text}`)
        }
        return res
      })
    )
  )

  for (const result of results) {
    if (result.status === 'fulfilled') {
      sent++
    } else {
      failed++
      console.error('[Newsletter] Failed to send email:', result.reason)
    }
  }

  return { sent, failed }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
