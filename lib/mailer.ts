import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site.config";

interface ContactProps { name: string; email: string; subject: string; message: string; }

export async function sendContactMail({ name, email, subject, message }: ContactProps) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USER || siteConfig.email, pass: process.env.SMTP_PASS },
  });

  const wrapper = "font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;padding:32px;border-radius:12px;max-width:650px;margin:auto;color:#e2e8f0;line-height:1.6;";
  const card = "background:#1e293b;border-radius:10px;padding:24px;margin:20px 0;box-shadow:0 4px 12px #0005;";

  // Visitor Confirmation Email
  // © 2025 Ronak Malam – Portfolio Code. Signature ID: RM-PORT-2025

  const visitorHtml = `
    <div style="${wrapper}">
      <div style="text-align:center;margin-bottom:28px;">
        <h1 style="color:#2563eb;font-size:2rem;margin:0;">Thanks, ${name}! 🙌</h1>
        <p style="color:#94a3b8;font-size:1.1rem;margin-top:10px;">
          I truly appreciate your message and the time you took to connect. It means a lot and I’ll get back to you as soon as possible.
        </p>
      </div>
      <div style="${card}">
        <p><b style="color:#38bdf8;">Subject:</b> ${subject}</p>
        <p><b style="color:#38bdf8;">Message:</b></p>
        <div style="margin-top:8px;background:#0f172a;padding:16px;border-radius:8px;color:#f1f5f9;font-size:1.05rem;line-height:1.5;">
          ${message.replace(/\n/g, "<br/>")}
        </div>
      </div>
       <div style="text-align:center;margin:28px 0;">
        <p style="color:#cbd5e1;font-size:1.05rem;margin-bottom:20px;">
          I usually reply within <b>24 hours</b>. Meanwhile, feel free to connect with me:
        </p>
        <a href="${siteConfig.social.linkedin}" style="display:inline-block;margin:6px;padding:12px 20px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-size:1rem;">💼 LinkedIn</a>
        <a href="${siteConfig.social.github}" style="display:inline-block;margin:6px;padding:12px 20px;background:#1e293b;color:#38bdf8;border-radius:8px;text-decoration:none;font-size:1rem;">⚡ GitHub</a>
      </div>
      <div style="border-top:1px solid #334155;padding-top:20px;text-align:center;color:#94a3b8;font-size:0.95rem;">
        <p style="margin:0;">— <b style="color:#f1f5f9;">Ronak Malam</b></p>
        <p style="margin-top:8px;"><a href="${siteConfig.social.website}" style="color:#2563eb;text-decoration:none;">Visit My Portfolio</a></p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `Ronak Malam <${process.env.SMTP_USER || siteConfig.email}>`,
    to: email,
    subject: `Thanks, ${name}! I Received Your Message`,
    html: visitorHtml,
  });

  // Notification Email to You
  // © 2025 Ronak Malam – Portfolio Code. Signature ID: RM-PORT-2025

  const ownerHtml = `
    <div style="${wrapper}">
      <h2 style="text-align:center;color:#38bdf8;margin-bottom:20px;">📬 New Message via Portfolio</h2>
      <div style="${card}">
        <p><b><span style="color:#2563eb;">Name:</span></b> ${name}</p>
        <p><b><span style="color:#2563eb;">Email:</span></b> ${email}</p>
        <p><b><span style="color:#2563eb;">Subject:</span></b> ${subject}</p>
        <p><b><span style="color:#2563eb;">Message:</span></b></p>
        <div style="margin-top:8px;background:#0f172a;padding:14px;border-radius:8px;font-size:1.05rem;color:#f1f5f9;line-height:1.5;">
          ${message.replace(/\n/g, "<br/>")}
        </div>
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:0.95rem;">
        <b>Ronak Malam Portfolio</b> | <a href="${siteConfig.social.website}" style="color:#2563eb;text-decoration:none;">Visit Website</a>
      </p>
    </div>
  `;

  return transporter.sendMail({
    from: `Portfolio Contact <${process.env.SMTP_USER || siteConfig.email}>`,
    to: siteConfig.email,
    subject: `New Message from ${name}: "${subject}"`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    html: ownerHtml,
  });
}
