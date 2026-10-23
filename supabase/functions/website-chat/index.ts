import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Anthropic from "npm:@anthropic-ai/sdk";

// Was pointed at the Lovable AI gateway, which needed a LOVABLE_API_KEY that was
// never set on this project — the function threw before it ever reached a model,
// which is why the widget sat unmounted. ANTHROPIC_API_KEY is already a secret here.
const MODEL = "claude-sonnet-5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Input validation limits
const MAX_MESSAGE_LENGTH = 1000;
const MAX_MESSAGES_IN_CONTEXT = 20;
const MAX_SESSION_ID_LENGTH = 100;
const MAX_SOURCE_URL_LENGTH = 500;

function getClientIP(req: Request): string {
  // Check various headers for the real IP
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIP);

  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!clientData || now > clientData.resetTime) {
    // New window
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((clientData.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  clientData.count++;
  return { allowed: true };
}

function validateInput(data: unknown): { 
  valid: boolean; 
  error?: string; 
  messages?: Array<{ role: string; content: string }>; 
  session_id?: string; 
  source_url?: string 
} {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { messages, session_id, source_url } = data as Record<string, unknown>;

  // Validate messages array
  if (!Array.isArray(messages) || messages.length === 0) {
    return { valid: false, error: "Messages array is required" };
  }

  if (messages.length > MAX_MESSAGES_IN_CONTEXT) {
    return { valid: false, error: `Too many messages. Maximum is ${MAX_MESSAGES_IN_CONTEXT}` };
  }

  // Validate each message
  const validatedMessages: Array<{ role: string; content: string }> = [];
  for (const msg of messages) {
    if (!msg || typeof msg !== "object") {
      return { valid: false, error: "Invalid message format" };
    }
    
    const { role, content } = msg as Record<string, unknown>;
    
    if (typeof role !== "string" || !["user", "assistant", "system"].includes(role)) {
      return { valid: false, error: "Invalid message role" };
    }
    
    if (typeof content !== "string") {
      return { valid: false, error: "Message content must be a string" };
    }
    
    if (content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message too long. Maximum is ${MAX_MESSAGE_LENGTH} characters` };
    }

    validatedMessages.push({ role, content: content.trim() });
  }

  // Validate session_id
  let validatedSessionId: string | undefined;
  if (session_id !== undefined) {
    if (typeof session_id !== "string" || session_id.length > MAX_SESSION_ID_LENGTH) {
      return { valid: false, error: "Invalid session_id" };
    }
    validatedSessionId = session_id;
  }

  // Validate source_url
  let validatedSourceUrl: string | undefined;
  if (source_url !== undefined) {
    if (typeof source_url !== "string" || source_url.length > MAX_SOURCE_URL_LENGTH) {
      return { valid: false, error: "Invalid source_url" };
    }
    // Basic URL validation
    try {
      new URL(source_url);
      validatedSourceUrl = source_url;
    } catch {
      return { valid: false, error: "Invalid source_url format" };
    }
  }

  return { 
    valid: true, 
    messages: validatedMessages, 
    session_id: validatedSessionId, 
    source_url: validatedSourceUrl 
  };
}

// The one booking link. Must match CALENDLY_URL in src/components/CalendlyEmbed.tsx.
// 2026-10-23: this pointed at "free-15-minute-online-presence-review", an event type that
// was switched OFF in Calendly, so every link the bot handed out was a dead page.
const BOOKING_URL = "https://calendly.com/saltarelliwebstudio/30min";
// What the site's buttons call the call. Change it here and the bot follows.
const CALL_NAME = "Free Strategy Call";

// Retell voice agent "Sam" — inbound line. Captures leads, does NOT book meetings.
const VOICE_AGENT_NUMBER = "(289) 513-5284";

// Keep this in step with saltarelliwebstudio.ca. When the homepage copy changes, re-read it
// (src/pages/Index.tsx) and update this, or the bot contradicts the site.
const KNOWLEDGE_BASE = `You are the assistant on saltarelliwebstudio.ca, for Saltarelli Web Studio, run by Adam Saltarelli in the Niagara Region, Ontario.

## WHAT ADAM DOES
He helps local businesses get more customers from Google and spend less time on admin. Mostly trades and
local service businesses in Niagara, plus some B2B and clients across Canada over video.

It is one offer, the **Smart Stack Pack**. Never present it as tiers, packages or a menu. It includes:
- **Managed website**: fast, mobile-first, built to show up on Google and turn visitors into calls. Hosting, updates and edits handled.
- **Google review engine**: gets more 5-star reviews, which lifts them in Google's local results.
- **Local SEO + systems**: Google Business Profile, local SEO, and automations that catch every lead and follow up fast (AI chat, AI phone answering, instant lead alerts, follow-up texts and emails).

It takes the owner about 15 minutes of their time. Adam takes 5 new clients a month.

## PROOF (only use these, word for word facts)
- A 24/7 gym in Port Colborne (Genius Fitness & MMA) went to #1 on Google in the Niagara region in 60 days.
- Trades Pro Supply went from 0 to 11 five-star Google reviews in under a month.
- All Yukon Refrigeration in Whitehorse: ChatGPT named them its top pick for heat pump installs (the owner's own screenshot, Sept 2026; AI answers vary).
- 5.0 stars from 29 Google reviews.

## GUARANTEE (Clean Hands Guarantee)
If they're not satisfied inside the first 60 days, they get a full refund. No conditions tied to review counts or rankings.
Never promise a #1 ranking or a number of calls. Say "get found on Google", never "rank #1".

## PRICE
Never quote a price, range or starting figure. Say it depends on the business and Adam goes over it on the call, then give the booking link.

## AREAS
All of Niagara: Port Colborne, Welland, St. Catharines, Niagara Falls, Fort Erie, Crystal Beach, Ridgeway, Fonthill, Thorold, Grimsby, Niagara-on-the-Lake. Also clients across Ontario and Canada over video.

## BOOKING
- The call is the **${CALL_NAME}**: 30 minutes on Google Meet, no pitch. Adam looks at their website, Google profile and reviews first and shows them where they're losing customers.
- Book here, always this exact link: ${BOOKING_URL}
- On the website the booking buttons say "Talk to an Expert". Same call.
- Never give any other Calendly link. Never call it a 15-minute call, a demo, an audit or a consultation.
- Rather talk than type? Sam, the AI assistant, answers at ${VOICE_AGENT_NUMBER}. Sam takes details but does NOT book, so the link is the main path.

## CONTACT DETAILS
If they're interested but not ready to book, ask once for a name and an email or phone so Adam can follow up. Only after you've answered their question. Confirm it back in one sentence.

## OTHER
- Free tool: the Get Found Score at saltarelliwebstudio.ca/score shows how a business shows up on Google.
- Adam's Eye (adamseye.ca): Adam spends a day inside a business and hands over a ranked list of where time and money leak.
- Never mention Make.com, Zapier or no-code tools. Never mention deposits or setup fees.

## HOW TO ANSWER
- Answer only what's asked. 1-2 sentences. Plain words, no jargon.
- Never use em dashes. Use a period or a comma instead.
- "How do I get started / book?" → the ${CALL_NAME} link.
- "What do you do?" → one sentence on the Smart Stack Pack.`;

// Initialize Supabase client for logging
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/** Saltarelli Web Studio's own pod. Our website chat is stored exactly like a
 *  client's, through the same tables and the same shape, so if transcript
 *  storage ever breaks we find out on our own site before a client does. */
const SWS_POD_ID = "00000000-0000-4000-8000-00005a5a5a5a";

/**
 * Persist one exchange.
 *
 * FIXED 2026-08-18. This previously inserted session_id / user_message /
 * assistant_message / source_url into public.chat_logs. None of those columns
 * exist on that table - it is the DASHBOARD support chat and is
 * user_id/role/content with user_id NOT NULL. So every insert failed from the
 * 2026-08-14 launch onward, and because the failure was only console.error'd the
 * widget looked perfect while discarding every conversation on the site.
 *
 * Now writes to chat_conversations / chat_messages, the same pair the client
 * sites use, which are built for anonymous visitors and have no user_id.
 */
async function logConversation(
  sessionId: string,
  sourceUrl: string | null,
  userMessage: string,
  assistantMessage: string
) {
  try {
    const { data: convo, error: convoErr } = await supabase
      .from("chat_conversations")
      .upsert(
        {
          pod_id: SWS_POD_ID,
          session_id: sessionId,
          source_url: sourceUrl,
          last_message_at: new Date().toISOString(),
        },
        { onConflict: "pod_id,session_id" }
      )
      .select("id, message_count")
      .single();

    if (convoErr || !convo) {
      console.error("Failed to upsert conversation:", convoErr);
      return;
    }

    const { error: msgErr } = await supabase.from("chat_messages").insert([
      { conversation_id: convo.id, role: "user", content: userMessage },
      { conversation_id: convo.id, role: "assistant", content: assistantMessage },
    ]);
    if (msgErr) {
      console.error("Failed to insert messages:", msgErr);
      return;
    }

    await supabase
      .from("chat_conversations")
      .update({ message_count: (convo.message_count ?? 0) + 2 })
      .eq("id", convo.id);
  } catch (e) {
    console.error("Error logging conversation:", e);
  }
}

// Sessions we've already turned into a lead, so a long conversation doesn't
// create a duplicate on every subsequent message. In-memory only: worst case an
// isolate restart lets one duplicate through, which is cheaper than adding a table.
const submittedSessions = new Set<string>();

const EMAIL_RE = /[^\s@<>()[\]]+@[^\s@<>()[\]]+\.[a-z]{2,}/i;

/**
 * If the visitor handed over contact details in chat, push them into the same
 * `qualify-submit` function the website form and the Retell phone agent use, so a
 * chat lead lands in `qualify_leads` and pings Telegram like any other lead.
 *
 * Trigger is deterministic: we only spend an extraction call once an email actually
 * appears in something the VISITOR typed. `qualify-submit` requires name + email.
 */
async function captureLeadIfPresent(
  messages: Array<{ role: string; content: string }>,
  sessionId: string,
  sourceUrl: string | null,
  anthropic: Anthropic
) {
  if (submittedSessions.has(sessionId)) return;

  const visitorText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n");

  if (!EMAIL_RE.test(visitorText)) return;

  try {
    const res = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      output_config: {
        effort: "low",
        format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              name: { type: ["string", "null"] },
              email: { type: ["string", "null"] },
              phone: { type: ["string", "null"] },
              website: { type: ["string", "null"] },
              message: {
                type: ["string", "null"],
                description: "One sentence on what the visitor wants.",
              },
            },
            required: ["name", "email", "phone", "website", "message"],
            additionalProperties: false,
          },
        },
      },
      system:
        "Extract the visitor's contact details from this chat transcript. " +
        "Use null for anything they did not actually provide. Never invent a name or an email.",
      messages: [{ role: "user", content: visitorText }],
    });

    const text = res.content.find((b) => b.type === "text")?.text;
    if (!text) return;

    const lead = JSON.parse(text);
    // qualify-submit rejects anything without both, so don't waste the call.
    if (!lead?.name || !lead?.email) return;

    // Mark before awaiting so two in-flight messages can't both submit.
    submittedSessions.add(sessionId);
    if (submittedSessions.size > 5000) submittedSessions.clear();

    const submitRes = await fetch(`${supabaseUrl}/functions/v1/qualify-submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "chat",
        name: lead.name,
        email: lead.email,
        phone: lead.phone ?? undefined,
        website: lead.website ?? undefined,
        message: [lead.message, sourceUrl ? `(from ${sourceUrl})` : null]
          .filter(Boolean)
          .join(" "),
      }),
    });

    if (!submitRes.ok) {
      console.error("qualify-submit rejected chat lead:", submitRes.status, await submitRes.text());
      submittedSessions.delete(sessionId); // let a later message retry
    }
  } catch (e) {
    console.warn("Chat lead capture failed (non-fatal):", e);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateCheck = checkRateLimit(clientIP);
    
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }), 
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": String(rateCheck.retryAfter || 60)
          },
        }
      );
    }

    // Parse and validate input
    let rawData: unknown;
    try {
      rawData = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const validation = validateInput(rawData);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, session_id, source_url } = validation;
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }

    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    // Get the latest user message for logging
    const latestUserMessage = messages![messages!.length - 1]?.content || "";

    const encoder = new TextEncoder();
    let fullAssistantResponse = "";

    // The wire format stays the OpenAI-style `data: {choices:[{delta:{content}}]}`
    // the frontend parser already reads. Translating here keeps Chatbot.tsx's
    // stream handling untouched.
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const modelStream = anthropic.messages.stream({
            model: MODEL,
            max_tokens: 2048,
            // Thinking is on by default on this model. Left on deliberately —
            // disabling it can leak <thinking> tags into the visible reply.
            // `low` effort keeps it quick enough for a chat widget.
            output_config: { effort: "low" },
            system: KNOWLEDGE_BASE,
            messages: messages!.map((m) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            })),
          });

          modelStream.on("text", (raw: string) => {
            // House style bans em dashes in anything a visitor reads; the prompt alone
            // didn't stop the model, so swap them on the way out.
            const delta = raw.replace(/\s*—\s*/g, ", ");
            fullAssistantResponse += delta;
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ choices: [{ delta: { content: delta } }] })}\n\n`
              )
            );
          });

          await modelStream.finalMessage();

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();

          // Log the conversation after stream completes
          if (session_id && fullAssistantResponse) {
            await logConversation(
              session_id,
              source_url || null,
              latestUserMessage,
              fullAssistantResponse
            );

            // Then see if this conversation just became a lead. Runs after the
            // reply has already streamed out, so it costs the visitor nothing.
            await captureLeadIfPresent(
              messages!,
              session_id,
              source_url || null,
              anthropic
            );
          }
        } catch (e) {
          console.error("Stream error:", e);
          controller.error(e);
        }
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
