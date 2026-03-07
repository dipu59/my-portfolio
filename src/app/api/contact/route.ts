import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, projectType, budget, timeline } =
      await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Prefer generic SMTP_* config if present; otherwise fall back to a simple
    // Gmail-style setup using EMAIL_USER / EMAIL_PASS.
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const smtpSecure =
      process.env.SMTP_SECURE === "true" || smtpPort === 465 ? true : false;
    const fromAddress =
      process.env.SMTP_FROM || process.env.EMAIL_FROM || smtpUser || email;

    if (!smtpHost || !smtpUser || !smtpPass || !fromAddress) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email service is not configured on the server. Please ask the site owner to add SMTP or email credentials.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailSubject =
      subject?.trim() || "New message from portfolio contact form";

    await transporter.sendMail({
      from: `"Portfolio Contact" <${fromAddress}>`,
      to: process.env.EMAIL_TO || "12biswasdipu@gmail.com",
      subject: mailSubject,
      replyTo: email,
      text: [
        `You have a new message from your portfolio contact form:`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        projectType ? `Project type: ${projectType}` : "",
        budget ? `Budget: ${budget}` : "",
        timeline ? `Timeline: ${timeline}` : "",
        subject ? `Subject: ${subject}` : "",
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending contact email:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error sending email.";

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to send message. Please try again later.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 }
    );
  }
}

