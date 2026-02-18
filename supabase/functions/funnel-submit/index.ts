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
    const {
      name,
      email,
      phone,
      business_name,
      industry,
      avg_job_value,
      missed_calls_per_week,
      calculated_annual_loss,
    } = body;

    // --- Validation ---
    if (!name || typeof name !== "string" || name.trim().length < 1 || name.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 255) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 7 || phone.length > 30) {
      return new Response(JSON.stringify({ error: "Invalid phone" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!business_name || typeof business_name !== "string" || business_name.trim().length < 1 || business_name.length > 150) {
      return new Response(JSON.stringify({ error: "Invalid business name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const allowedIndustries = ["Roofing", "Concrete", "Landscaping", "HVAC", "Plumbing", "General Contractor", "Other"];
    if (!industry || !allowedIndustries.includes(industry)) {
      return new Response(JSON.stringify({ error: "Invalid industry" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const allowedJobValues = ["$500", "$1,000", "$2,500", "$5,000", "$10,000+"];
    if (!avg_job_value || !allowedJobValues.includes(avg_job_value)) {
      return new Response(JSON.stringify({ error: "Invalid avg_job_value" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const allowedMissedCalls = ["1-3", "4-7", "8-12", "12+"];
    if (!missed_calls_per_week || !allowedMissedCalls.includes(missed_calls_per_week)) {
      return new Response(JSON.stringify({ error: "Invalid missed_calls_per_week" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (typeof calculated_annual_loss !== "number" || calculated_annual_loss < 0) {
      return new Response(JSON.stringify({ error: "Invalid calculated_annual_loss" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Insert into DB using service role ---
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("funnel_leads").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      business_name: business_name.trim(),
      industry,
      avg_job_value,
      missed_calls_per_week,
      calculated_annual_loss,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save lead" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Fire webhook to Modal (placeholder) ---
    const MODAL_WEBHOOK_URL = "https://placeholder-modal-webhook.example.com/lead";
    try {
      await fetch(MODAL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          business_name: business_name.trim(),
          industry,
          avg_job_value,
          missed_calls_per_week,
          calculated_annual_loss,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (webhookErr) {
      // Non-fatal — lead is already saved; log and continue
      console.warn("Webhook fire failed (non-fatal):", webhookErr);
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
