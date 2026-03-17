import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  interest?: string;
  message: string;
}

const interestLabels: Record<string, string> = {
  "ot-security": "OT Cybersecurity",
  "enterprise-security": "Enterprise Security",
  "endpoint-management": "Endpoint Management",
  "identity-access": "Identity & Access",
  "data-governance": "Data Governance",
  "cyber-services": "Cyber Services",
  "other": "Other",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const submission: ContactSubmission = await req.json();

    // Validate required fields
    if (!submission.firstName || !submission.lastName || !submission.email || !submission.company || !submission.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submission.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const interestLabel = submission.interest ? interestLabels[submission.interest] || submission.interest : "Not specified";

    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Tandem Website <onboarding@resend.dev>",
      to: ["letstalk@tandem.co.ke"],
      subject: `New Contact Form Submission from ${submission.firstName} ${submission.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${submission.firstName} ${submission.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${submission.email}">${submission.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${submission.phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Company</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${submission.company}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Area of Interest</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${interestLabel}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${submission.message}</td>
          </tr>
        </table>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to user
    const userEmailResponse = await resend.emails.send({
      from: "Tandem Security <onboarding@resend.dev>",
      to: [submission.email],
      subject: "We received your message - Tandem Security",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">Thank you for contacting us, ${submission.firstName}!</h1>
          <p style="color: #333; line-height: 1.6;">
            We have received your message and one of our security experts will get back to you within 24 hours.
          </p>
          <p style="color: #333; line-height: 1.6;">
            In the meantime, feel free to explore our <a href="https://tandem.co.ke/resources" style="color: #16a34a;">resources</a> 
            to learn more about how we can help protect your organization.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #666; font-size: 14px;">
            Best regards,<br />
            <strong>The Tandem Security Team</strong><br />
            <a href="mailto:letstalk@tandem.co.ke" style="color: #16a34a;">letstalk@tandem.co.ke</a> | 
            <a href="tel:+254734258175" style="color: #16a34a;">+254 734 258 175</a>
          </p>
        </div>
      `,
    });

    console.log("User confirmation sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact form submitted successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
