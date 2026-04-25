"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Name, email, and message are required." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Texongo <onboarding@resend.dev>",
      to: ["contact@texongo.com"],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #E9D5FF; padding-bottom: 10px;">New Inquiry</h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <div style="margin-top: 20px; padding: 15px; bg-color: #f9f9f9; border-left: 4px solid #E9D5FF;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #999;">This email was sent from the Texongo website contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Server Action Error:", err);
    return { error: "Something went wrong. Please try again later." };
  }
}
