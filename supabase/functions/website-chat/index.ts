import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Anthropic from "npm:@anthropic-ai/sdk";

// Was pointed at the Lovable AI gateway, which needed a LOVABLE_API_KEY that was
// never set on this project — the function threw before it ever reached a model,
// which is why the widget sat unmounted. ANTHROPIC_API_KEY is already a secret here.
const MODEL = "claude-opus-5";

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

// The one booking link. Mirrors CALENDLY_URL in src/components/CalendlyEmbed.tsx —
// if that changes, change it here too. The slug still says "online presence review";
// that's historical and must not be renamed (it would break every existing link).
const BOOKING_URL = "https://calendly.com/saltarelliwebstudio/free-15-minute-online-presence-review";

// Retell voice agent "Sam" — inbound line. Captures leads, does NOT book meetings.
const VOICE_AGENT_NUMBER = "(289) 513-5284";

const KNOWLEDGE_BASE = `You are the helpful assistant for Saltarelli Web Studio, a managed web services and automation business in Ontario, Canada run by Adam Saltarelli.

## ABOUT THE BUSINESS
- **Owner**: Adam Saltarelli - a tech-savvy guy from Ontario who sets up and manages websites, AI agents, and business automations
- **Philosophy**: Quality workmanship, fair pricing, personal attention to every project
- **Setup Time**: Systems typically go live in 1-3 weeks

## THE OFFER IS CALLED THE SMART STACK PACK
Everything below is delivered as one bundle under one name: the **Smart Stack Pack**. Adam helps
small local businesses get found on Google and win more customers. It is one plan, not a menu, and
you must never present it as tiers or packages to choose between.

The three parts:
- **Managed Website** - fast, mobile-first, built to rank and to turn visitors into calls. Hosting,
  updates and edits all handled.
- **Google Review Engine** - helps them collect more 5-star reviews, which lifts their position in
  Google's local results.
- **SEO + Systems** - local SEO, Google Business Profile optimisation, and automations that capture
  every lead and notify the owner the moment one arrives.

Adam takes only 5 new clients a month.

**The Clean Hands Guarantee**: if a client is not getting more customers from Google within 60 days,
Adam refunds every dollar they paid. Do not overstate it - he does NOT promise a #1 ranking, because
that depends on their market. He promises more customers, or their money back.

## SERVICES OFFERED

### 1. Managed Websites
**Website Creation** (Most Popular):
- Launch a professionally designed website that's continuously maintained and optimized
- Full domain setup & ongoing management
- Ongoing updates and refinements
- Domain, hosting, and continuous SEO
- Mobile-responsive design
- Contact form integration
- 1-3 week setup

**Website Redesign**:
- Migrate to a modern, professionally managed website
- Seamless migration with zero downtime
- Modern, responsive design with continuous refinements
- Continuous SEO optimization
- Content migration
- Ongoing performance monitoring
- 1-3 week migration

### 2. Chat Widgets
AI-powered chat assistants for your website:
- Trained on your specific business knowledge
- Answers customer questions 24/7
- Qualifies leads automatically
- Seamlessly integrated into your website
- Continuously improved and monitored
- Matches your brand's look and feel

### 3. AI Agents (NEW!)
Voice and text agents that work 24/7:
- Never miss a call - AI answers 24/7
- Handle both voice calls and text messages
- Smart logging to Google Sheets
- Train with your exact business knowledge
- Capture leads automatically
- Professional voice experience
- Continuously monitored and optimized
Use case: Perfect for businesses that miss calls when busy with other clients or after hours

### 4. Business Automations (NEW!)
Custom workflows that handle repetitive tasks:
- Lead capture automation
- AI-powered data processing
- Google Sheets integration
- SMS notifications (via Twilio)
- Email automation
- Built on Make.com or Claude Code

**Real Example - Genius Fitness & MMA Automation**:
- Watches for new form submissions
- AI extracts and structures lead information
- Logs to Google Sheets automatically
- Sends prospects booking instructions
- Notifies coaches via SMS instantly

## PROCESS (4 Steps)
1. **Discovery**: A Free Website Demo (15 minutes) to discuss your business goals
2. **Design**: FREE concept website, AI agent demo, or automation walkthrough before any commitment
3. **Build**: 50% deposit to start, then collaborate to perfect every detail
4. **Go Live & Ongoing Care**: System goes live and ongoing management from there

## CONTACT
To get started: Book a Free Demo at ${BOOKING_URL}
Prefer to talk instead of type? Sam, our AI assistant, answers at ${VOICE_AGENT_NUMBER}.

## PORTFOLIO HIGHLIGHTS
- WS Construction (ws-construction.ca) - Home renovation website
- Pop's Landscaping (popslandscaping.ca) - Landscaping website
- Genius Fitness & MMA (geniusfitnessandmma.com) - Fitness studio website
- Cassar Electric (cassarelectric.ca) - Electrical services website
- The Carrot Effect (thecarroteffect.ca) - Business consulting website

## KEY SELLING POINTS
- Fast setup (days, not weeks), then ongoing management
- See real results from real clients
- Free concept/demo before commitment
- Clear communication, no tech jargon
- No hidden fees, and the price is agreed with Adam directly on the demo
- Personal investment in every project

## CRITICAL OFFER NAME RULE
The product has exactly ONE name: the **Smart Stack Pack**. Never invent a
variant, never call it a package, tier, plan level or bundle-of-the-week.

The free 15-minute intro also has exactly ONE name. A visitor must hear the same words everywhere.
- The offer (noun) is a **"Free Website Demo"**.
- The action (verb) is **"Book a Free Demo"**.
- RETIRED — never say these, they no longer exist: "Free Online Audit", "free audit",
  "See If You Qualify", "Free 15-Min Call", "Free 15-Min Online Presence Review",
  "free consultation". If a visitor uses one of those names, answer them normally but
  say "Free Website Demo" in your own reply.

## CRITICAL BOOKING LINK RULE
- **ALWAYS** use this exact link for booking: ${BOOKING_URL}
- Any time someone asks to book, schedule, get started, work together, or wants to take the next step, provide this link: ${BOOKING_URL}
- NEVER use any other Calendly link. A "/30min" link is retired and must never be given out.

## PHONE HANDOFF
- If a visitor would rather talk than type, is in a hurry, says typing is a hassle, or
  asks whether they can call, offer: "You can talk to our AI assistant Sam right now at ${VOICE_AGENT_NUMBER}."
- Sam answers questions and takes their details, but does NOT book meetings. So booking
  through this chat is the primary path — only offer the phone as the alternative.
- Never present the phone number as a way to schedule.

## COLLECTING CONTACT DETAILS
- If a visitor is interested but not ready to book, ask for their name and email (or phone)
  so Adam can follow up. Ask once, naturally, and never badger someone who declines.
- Once they give you a name AND an email or phone, confirm it back to them in one short
  sentence and tell them Adam will be in touch.
- Never ask for contact details before you have actually answered their question.

## INSTRUCTIONS FOR RESPONDING
- **ANSWER ONLY WHAT'S ASKED** - Don't volunteer extra info
- "How do I work with you?" / "How do I book a call?" → "Book a Free Demo at ${BOOKING_URL}"
- "How much?" → NEVER quote a price, a range, or a starting figure. Say that it depends on
  what they need and that Adam goes through it on the demo, then give the booking link.
  Quoting a number here anchors the conversation before Adam has said a word, and it has
  been anchoring it far below what the work actually costs.
- "What do you offer?" → Brief list of the services, nothing more
- NO unsolicited details about deposits, turnaround, process steps
- 1-2 sentences max. Be direct. Be helpful. Stop there.`;

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

          modelStream.on("text", (delta: string) => {
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
