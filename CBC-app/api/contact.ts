import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"

type ContactPayload = {
  name?: string
  company?: string
  email?: string
  message?: string
  capabilities?: string[]
  lang?: string
  website?: string // honeypot — must stay empty
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set")
    return res.status(500).json({ error: "Email service is not configured" })
  }

  // Vercel parses JSON bodies automatically; guard for string bodies just in case.
  const body: ContactPayload =
    typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {})

  // Honeypot: silently accept bots without sending.
  if (body.website && body.website.trim() !== "") {
    return res.status(200).json({ ok: true })
  }

  const name = (body.name ?? "").trim()
  const email = (body.email ?? "").trim()
  const message = (body.message ?? "").trim()
  const company = (body.company ?? "").trim()
  const capabilities = Array.isArray(body.capabilities) ? body.capabilities : []
  const lang = body.lang === "es" ? "es" : "en"

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Invalid email address" })
  }

  const to = process.env.CONTACT_TO || "Corebuildconsulting@gmail.com"
  const from = process.env.CONTACT_FROM || "CORE Build Consulting <onboarding@resend.dev>"

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Capabilities", capabilities.length ? capabilities.join(", ") : "—"],
    ["Language", lang.toUpperCase()],
  ]

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0E140E;line-height:1.6">
      <h2 style="margin:0 0 16px">New enquiry — corebuildconsulting.com</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;vertical-align:top"><strong>${k}</strong></td><td style="padding:4px 0">${escapeHtml(
                v,
              )}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:16px 0 4px;color:#6b7280;font-size:14px"><strong>Message</strong></p>
      <p style="white-space:pre-wrap;font-size:14px;margin:0">${escapeHtml(message)}</p>
    </div>
  `

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    message,
  ].join("\n")

  try {
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      html,
      text,
    })

    if (error) {
      console.error("Resend error:", error)
      return res.status(502).json({ error: "Could not send the message" })
    }

    return res.status(200).json({ ok: true, id: data?.id })
  } catch (err) {
    console.error("Unexpected error sending email:", err)
    return res.status(500).json({ error: "Unexpected error" })
  }
}
