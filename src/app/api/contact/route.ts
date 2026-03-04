import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "jeff@consortiumnyc.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "leads@thenycseo.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, formType } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields missing." },
        { status: 400 }
      );
    }

    if (formType === "general-inquiry") {
      const { subject } = body;
      await resend.emails.send({
        from: `The NYC SEO <${FROM_EMAIL}>`,
        to: NOTIFY_EMAIL,
        subject: `General Inquiry: ${subject || "No subject"} - ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #0080FE;">General Inquiry - TheNYCSEO.com</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${row("Name", name)}
              ${row("Email", `<a href="mailto:${email}">${email}</a>`)}
              ${row("Phone", phone)}
              ${row("Subject", subject)}
              ${row("Message", message)}
            </table>
            <p style="margin-top: 16px; color: #6b7280; font-size: 14px;">
              From <a href="https://www.thenycseo.com">TheNYCSEO.com</a> &mdash; General Contact Form
            </p>
          </div>
        `,
      });
    } else {
      const { businessName, service, location, website, monthlyBudget, currentMarketing, timeline, additionalServices } = body;
      await resend.emails.send({
        from: `The NYC SEO <${FROM_EMAIL}>`,
        to: NOTIFY_EMAIL,
        subject: `Partnership Request: ${businessName || name} - ${service || "General"} ${location ? `in ${location}` : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #0080FE;">Partnership Request - TheNYCSEO.com</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${row("Name", name)}
              ${row("Business", businessName)}
              ${row("Email", `<a href="mailto:${email}">${email}</a>`)}
              ${row("Phone", phone)}
              ${row("Business Type", service)}
              ${row("Service Area", location)}
              ${row("Website", website ? `<a href="${website}">${website}</a>` : "None")}
              ${row("Monthly Budget", formatBudget(monthlyBudget))}
              ${row("Current Marketing", currentMarketing)}
              ${row("Timeline", timeline)}
              ${row("Additional Services", Array.isArray(additionalServices) && additionalServices.length > 0 ? additionalServices.join(", ") : "None selected")}
              ${row("Message", message)}
            </table>
            <p style="margin-top: 16px; color: #6b7280; font-size: 14px;">
              From <a href="https://www.thenycseo.com">TheNYCSEO.com</a> &mdash; Partnership Request Form
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}

function row(label: string, value: string | undefined) {
  return `<tr>
    <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb; vertical-align: top;">${label}</td>
    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${value || "Not provided"}</td>
  </tr>`;
}

function formatBudget(val: string | undefined) {
  const map: Record<string, string> = {
    "under-1000": "Under $1,000",
    "1000-2500": "$1,000 - $2,500",
    "2500-5000": "$2,500 - $5,000",
    "5000-10000": "$5,000 - $10,000",
    "10000+": "$10,000+",
  };
  return val ? map[val] || val : "Not provided";
}
