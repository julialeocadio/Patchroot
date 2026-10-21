import { NextRequest, NextResponse } from "next/server";
import { connect as connectNet, type Socket } from "node:net";
import { connect as connectTls, type TLSSocket } from "node:tls";

export const runtime = "nodejs";

const allowedServices = new Set([
    "web-development",
    "cybersecurity",
    "both",
    "other",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const serviceLabels: Record<string, Record<string, string>> = {
  en: {
    "web-development": "Web Development",
    cybersecurity: "Cybersecurity",
    both: "Web Development and Cybersecurity",
    other: "Other",
  },
  pt: {
    "web-development": "Desenvolvimento Web",
    cybersecurity: "Cibersegurança",
    both: "Desenvolvimento Web e Cibersegurança",
    other: "Outro",
  },
  es: {
    "web-development": "Desarrollo Web",
    cybersecurity: "Ciberseguridad",
    both: "Desarrollo Web y Ciberseguridad",
    other: "Otro",
  },
};

const confirmationCopy: Record<
  string,
  { subject: string; greeting: string; body: string; closing: string }
> = {
  en: {
    subject: "We received your inquiry | PatchRoot",
    greeting: "Hello",
    body: "Thank you for contacting PatchRoot. We have received your inquiry and will review the information you shared.",
    closing: "This is an automatic confirmation. Please do not reply to this email with sensitive information.",
  },
  pt: {
    subject: "Recebemos sua mensagem | PatchRoot",
    greeting: "Olá",
    body: "Obrigado por entrar em contato com a PatchRoot. Recebemos sua mensagem e vamos analisar as informações enviadas.",
    closing: "Esta é uma confirmação automática. Não envie informações sensíveis em resposta a este e-mail.",
  },
  es: {
    subject: "Hemos recibido tu consulta | PatchRoot",
    greeting: "Hola",
    body: "Gracias por contactar con PatchRoot. Hemos recibido tu consulta y revisaremos la información que nos has enviado.",
    closing: "Esta es una confirmación automática. No respondas a este correo con información sensible.",
  },
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

type SmtpSocket = Socket | TLSSocket;

function readResponse(socket: SmtpSocket): Promise<{ code: number; text: string }> {
  return new Promise((resolve, reject) => {
    let response = "";

    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("close", onClose);
    };
    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };
    const onClose = () => {
      cleanup();
      reject(new Error("SMTP connection closed unexpectedly"));
    };
    const onData = (chunk: Buffer) => {
      response += chunk.toString("utf8");
      const lines = response.split(/\r?\n/);
      const finalLine = lines.find((line) => /^\d{3} /.test(line));

      if (finalLine) {
        cleanup();
        resolve({ code: Number(finalLine.slice(0, 3)), text: response });
      }
    };

    socket.on("data", onData);
    socket.once("error", onError);
    socket.once("close", onClose);
  });
}

async function smtpCommand(socket: SmtpSocket, command: string, expected: number[]) {
  const responsePromise = readResponse(socket);
  socket.write(`${command}\r\n`);
  const response = await responsePromise;

  if (!expected.includes(response.code)) {
    throw new Error(`SMTP command failed (${response.code}): ${response.text}`);
  }

  return response;
}

async function sendSmtpMail(mail: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || !Number.isFinite(port)) {
    throw new Error("SMTP configuration is incomplete");
  }

  let socket: SmtpSocket = await new Promise((resolve, reject) => {
    const connection = port === 465
      ? connectTls({ host, port, servername: host }, () => resolve(connection))
      : connectNet({ host, port }, () => resolve(connection));
    connection.once("error", reject);
  });

  try {
    const greeting = await readResponse(socket);
    if (greeting.code !== 220) throw new Error(`SMTP greeting failed: ${greeting.text}`);
    await smtpCommand(socket, `EHLO ${host}`, [250]);

    if (port !== 465) {
      await smtpCommand(socket, "STARTTLS", [220]);
      socket = await new Promise<TLSSocket>((resolve, reject) => {
        const secureSocket = connectTls({ socket: socket as Socket, servername: host }, () => resolve(secureSocket));
        secureSocket.once("error", reject);
      });
      await smtpCommand(socket, `EHLO ${host}`, [250]);
    }

    await smtpCommand(socket, "AUTH LOGIN", [334]);
    await smtpCommand(socket, Buffer.from(user).toString("base64"), [334]);
    await smtpCommand(socket, Buffer.from(pass).toString("base64"), [235]);
    await smtpCommand(socket, `MAIL FROM:<${mail.from}>`, [250]);
    await smtpCommand(socket, `RCPT TO:<${mail.to}>`, [250, 251]);
    await smtpCommand(socket, "DATA", [354]);

    const boundary = `patchroot-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const encode = (value: string) => Buffer.from(value, "utf8").toString("base64").replace(/.{1,76}/g, "$&\r\n");
    const headers = [
      `From: ${mail.from}`,
      `To: ${mail.to}`,
      ...(mail.replyTo ? [`Reply-To: ${mail.replyTo}`] : []),
      `Subject: =?UTF-8?B?${Buffer.from(mail.subject).toString("base64")}?=`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ].join("\r\n");
    const content = [
      headers,
      "",
      `--${boundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      encode(mail.text),
      `--${boundary}`,
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      encode(mail.html),
      `--${boundary}--`,
    ].join("\r\n").replace(/(^|\r\n)\./g, "$1..");

    const dataResponse = readResponse(socket);
    socket.write(`${content}\r\n.\r\n`);
    const sent = await dataResponse;
    if (sent.code !== 250) throw new Error(`SMTP delivery failed: ${sent.text}`);
    await smtpCommand(socket, "QUIT", [221]);
  } finally {
    socket.destroy();
  }
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);

  if (contentLength > 20_000) {
    return NextResponse.json(
      { success: false, error: "Request too large" },
      { status: 413 },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  // Silently accept honeypot submissions without sending email.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ success: true, confirmationSent: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service = typeof body.service === "string" ? body.service : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  const locale =
    typeof body.locale === "string" && ["en", "pt", "es"].includes(body.locale)
      ? body.locale
      : "en";

  if (
    name.length < 2 ||
    name.length > 100 ||
    !emailPattern.test(email) ||
    email.length > 254 ||
    !allowedServices.has(service) ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { success: false, error: "Invalid form fields" },
      { status: 400 },
    );
  }

  const inbox = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!inbox || !from) {
    console.error("Contact email configuration is incomplete");

    return NextResponse.json(
      { success: false, error: "Email service unavailable" },
      { status: 500 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");
  const selectedService =
    serviceLabels[locale]?.[service] || serviceLabels.en[service];
  const copy = confirmationCopy[locale] || confirmationCopy.en;

  try {
    // Send the inquiry to PatchRoot first.
    await sendSmtpMail({
      from,
      to: inbox,
      replyTo: email,
      subject: `[PatchRoot Contact] ${selectedService}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${selectedService}`,
        "",
        "Message:",
        message,
        "",
        `Locale: ${locale}`,
      ].join("\n"),
      html: `
        <h2>New PatchRoot inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Service:</strong> ${escapeHtml(selectedService)}</p>
        <p><strong>Locale:</strong> ${locale}</p>
        <hr />
        <p><strong>Message</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    // Confirmation is sent only after the inquiry email succeeds.
    try {
      await sendSmtpMail({
        from,
        to: email,
        subject: copy.subject,
        text: `${copy.greeting} ${name},\n\n${copy.body}\n\n${copy.closing}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.7;color:#202020;max-width:600px;margin:auto">
            <p style="color:#E6007E;font-weight:bold">PATCHROOT / CONTACT</p>
            <h2>${copy.greeting} ${safeName},</h2>
            <p>${copy.body}</p>
            <p>${copy.closing}</p>
            <hr style="border:0;border-top:1px solid #e5e5e5;margin:28px 0" />
            <p style="font-size:12px;color:#777">PatchRoot · Development & Security</p>
          </div>
        `,
      });

      return NextResponse.json({
        success: true,
        confirmationSent: true,
      });
    } catch (error) {
      console.error("Inquiry received, but confirmation email failed:", error);

      return NextResponse.json({
        success: true,
        confirmationSent: false,
      });
    }
  } catch (error) {
    console.error("Failed to deliver PatchRoot inquiry:", error);

    return NextResponse.json(
      { success: false, error: "Email delivery failed" },
      { status: 502 },
    );
  }
}