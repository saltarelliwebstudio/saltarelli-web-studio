import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Two callers hit this function:
    //  1. The website form  -> flat body { name, email, phone, website, message }
    //  2. The Retell phone agent (submit_lead tool) -> wrapped body
    //     { call: { from_number, ... }, name: "submit_lead", args: {...} }
    // Detect the Retell shape by the presence of an `args` object and unwrap it.
    const isPhone = body && typeof body.args === "object" && body.args !== null;
    const src = isPhone ? body.args : body;

    const name = src.name;
    const email = src.email;
    // Over the phone the caller's number is captured automatically; fall back to it.
    const phone = src.phone ?? (isPhone ? body?.call?.from_number : undefined);
    const website = src.website;
    const message = src.message;
    // The website-chat function passes source:"chat" explicitly; the website form
    // sends nothing and stays "website". Retell is detected by its wrapped shape.
    const source = isPhone ? "phone" : src.source === "chat" ? "chat" : "website";

    // --- Validation (name + email required; rest optional) ---
    if (!name || typeof name !== "string" || name.trim().length < 1 || name.length > 100) {
      return new Response(JSON.stringify({ error: "Please enter your name." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 255) {
      return new Response(JSON.stringify({ error: "Please enter a valid email." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (phone && (typeof phone !== "string" || phone.length > 30)) {
      return new Response(JSON.stringify({ error: "Invalid phone." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (website && (typeof website !== "string" || website.length > 300)) {
      return new Response(JSON.stringify({ error: "Invalid website." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (message && (typeof message !== "string" || message.length > 2000)) {
      return new Response(JSON.stringify({ error: "Message is too long." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const clean = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      website: website ? website.trim() : null,
      message: message ? message.trim() : null,
    };

    // --- Save the lead (service role, bypasses RLS) ---
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("qualify_leads").insert(clean);
    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Notify Adam (best-effort; never blocks the saved lead) ---
    const header =
      source === "phone" ? "📞 New PHONE lead"
      : source === "chat" ? "💬 New CHAT lead"
      : "🌐 New WEBSITE lead";
    const summary =
      `${header}\n` +
      `Name: ${clean.name}\n` +
      `Email: ${clean.email}\n` +
      (clean.phone ? `Phone: ${clean.phone}\n` : "") +
      (clean.website ? `Website: ${clean.website}\n` : "") +
      (clean.message ? `Message: ${clean.message}\n` : "");

    // Telegram (fires only if both secrets are set)
    // NOTE: SWS_-prefixed to avoid clobbering the Hub's existing TELEGRAM_* secrets.
    const tgToken = Deno.env.get("SWS_TELEGRAM_BOT_TOKEN");
    const tgChat = Deno.env.get("SWS_TELEGRAM_CHAT_ID");
    if (tgToken && tgChat) {
      try {
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: tgChat, text: summary }),
        });
      } catch (e) {
        console.warn("Telegram notify failed (non-fatal):", e);
      }
    }

    // Email via Resend (fires only if both secrets are set)
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const notifyEmail = Deno.env.get("NOTIFY_EMAIL");
    if (resendKey && notifyEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: Deno.env.get("RESEND_FROM_EMAIL") ?? "leads@saltarelliwebstudio.ca",
            to: notifyEmail,
            subject: `${source === "phone" ? "📞 Phone" : source === "chat" ? "💬 Chat" : "🌐 Website"} lead: ${clean.name}${clean.website ? " — " + clean.website : ""}`,
            text: summary,
          }),
        });
      } catch (e) {
        console.warn("Email notify failed (non-fatal):", e);
      }
    }

    // --- Auto-reply to the SUBMITTER (best-effort; never blocks the saved lead) ---
    // Sent for every lead (website form + Sam phone agent), per Adam 2026-07-17.
    const autoReplyText =
      `Hey ${clean.name}, Adam here from Saltarelli Web Studio. ` +
      `Got your message and I'll personally get back to you shortly. ` +
      `Feel free to reply right here if it's easier.`;

    // Auto-reply EMAIL (reuses the Resend key already used for Adam's notify)
    if (resendKey && clean.email) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: Deno.env.get("RESEND_FROM_EMAIL") ?? "leads@saltarelliwebstudio.ca",
            to: clean.email,
            reply_to: "saltarelliwebstudio@gmail.com",
            subject: "Got your message - Saltarelli Web Studio",
            text: autoReplyText,
          }),
        });
      } catch (e) {
        console.warn("Auto-reply email failed (non-fatal):", e);
      }
    }

    // Auto-reply TEXT via Quo/OpenPhone business line.
    // Normalize to E.164 (form often gets bare 10-digit input like "2899314142").
    // NOTE: the Quo line is A2P-approved for CANADIAN SMS only; US numbers 400 and
    // fail soft here (submitter still got the email above).
    const quoKey = Deno.env.get("QUO_BUSINESS_API_KEY");
    const quoFrom = Deno.env.get("QUO_BUSINESS_FROM");
    if (quoKey && quoFrom && clean.phone) {
      const digits = clean.phone.replace(/\D/g, "");
      const e164 =
        clean.phone.trim().startsWith("+") ? clean.phone.trim()
        : digits.length === 10 ? `+1${digits}`
        : digits.length === 11 && digits.startsWith("1") ? `+${digits}`
        : null;
      if (e164) {
        try {
          await fetch("https://api.openphone.com/v1/messages", {
            method: "POST",
            headers: { Authorization: quoKey, "Content-Type": "application/json" },
            body: JSON.stringify({ content: autoReplyText, from: quoFrom, to: [e164] }),
          });
        } catch (e) {
          console.warn("Auto-reply SMS failed (non-fatal):", e);
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
