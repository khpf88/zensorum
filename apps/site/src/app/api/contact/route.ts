import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(req: Request) {
  if (!resend) {
    return NextResponse.json(
      { error: 'Resend API key not configured.' },
      { status: 500 }
    );
  }
  try {
    const { name, email, company, industry, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and Email are required.' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Zensorum Leads <leads@zensorum.com>', 
      to: ['khpf88@gmail.com'], 
      subject: `New Strategic Inquiry: ${company || name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #3B82F6;">New Strategic Inquiry</h2>
          <p>A new lead has requested platform access via Zensorum.com.</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;"><strong>Full Name:</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Work Email:</strong></td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
              <td style="padding: 8px 0;">${company || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Industry:</strong></td>
              <td style="padding: 8px 0;">${industry || 'Not specified'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <p style="margin-bottom: 10px; color: #666;"><strong>Message / Goals:</strong></p>
            <p style="white-space: pre-wrap;">${message || 'No message provided.'}</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            This inquiry was generated from the Zensorum.com contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
