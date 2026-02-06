import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

const KNOWLEDGE_BASE = `You are the helpful assistant for Saltarelli Web Studio, a web design and automation business in Ontario, Canada run by Adam Saltarelli.

## ABOUT THE BUSINESS
- **Owner**: Adam Saltarelli - a tech-savvy guy from Ontario who builds websites, AI agents, and business automations
- **Philosophy**: Quality workmanship, fair pricing, personal attention to every project
- **Turnaround**: Projects typically complete in 1-3 weeks
- **Pricing**: Affordable pricing starting at just a few hundred dollars

## SERVICES OFFERED

### 1. Custom Websites
**Website Creation** (Most Popular):
- Build new websites from scratch with professional design
- Full domain setup & configuration
- 1 round of revisions included
- Domain setup & basic SEO
- Mobile-responsive design
- Contact form integration
- 1-3 week turnaround

**Website Redesign**:
- Refresh and modernize existing sites
- Seamless transfer to existing domain
- Modern, responsive design
- SEO optimization
- Content migration
- Performance improvements
- 1-3 week turnaround

### 2. AI Agents (NEW!)
Voice and text agents that work 24/7:
- Never miss a call - AI answers 24/7
- Handle both voice calls and text messages
- Smart logging to Google Sheets
- Train with your exact business knowledge
- Capture leads automatically
- Professional voice experience
- Ongoing maintenance included
Use case: Perfect for businesses that miss calls when busy with other clients or after hours

### 3. Business Automations (NEW!)
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
1. **Discovery**: Free discovery call to discuss vision and project scope
2. **Design**: FREE concept website, AI agent demo, or automation walkthrough before any commitment
3. **Build**: 50% deposit to start, then collaborate to perfect every detail
4. **Launch & Support**: Domain setup, SEO, and ongoing maintenance

## CONTACT
To get started: Book a free Discovery Call at https://calendly.com/saltarelliwebstudio/30min

## PORTFOLIO HIGHLIGHTS
- Pop's Landscaping (popslandscaping.ca) - Landscaping website
- Genius Fitness & MMA (geniusfitnessandmma.com) - Fitness studio website
- Cassar Electric (cassarelectric.ca) - Electrical services website
- The Carrot Effect (thecarroteffect.ca) - Business consulting website

## KEY SELLING POINTS
- Quick turnaround (days, not weeks)
- See real results from real clients
- Free concept/demo before commitment
- Clear communication, no tech jargon
- Transparent pricing, no hidden fees
- Personal investment in every project

## INSTRUCTIONS FOR RESPONDING
- **ANSWER ONLY WHAT'S ASKED** - Don't volunteer extra info
- "How do I work with you?" / "How do I book a call?" → "Book a free discovery call at https://calendly.com/saltarelliwebstudio/30min"
- "How much?" → "Starting at a few hundred dollars, depends on scope"
- "What do you offer?" → Brief list of the 3 services, nothing more
- NO unsolicited details about deposits, turnaround, process steps
- 1-2 sentences max. Be direct. Be helpful. Stop there.`;

// Initialize Supabase client for logging
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function logConversation(
  sessionId: string,
  sourceUrl: string | null,
  userMessage: string,
  assistantMessage: string
) {
  try {
    const { error } = await supabase.from("chat_logs").insert({
      session_id: sessionId,
      source_url: sourceUrl,
      user_message: userMessage,
      assistant_message: assistantMessage,
    });
    if (error) {
      console.error("Failed to log conversation:", error);
    }
  } catch (e) {
    console.error("Error logging conversation:", e);
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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get the latest user message for logging
    const latestUserMessage = messages![messages!.length - 1]?.content || "";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: KNOWLEDGE_BASE },
          ...messages!,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create a TransformStream to intercept and collect the response
    const reader = response.body!.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let fullAssistantResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Pass through to client
            controller.enqueue(value);

            // Also collect the response for logging
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            
            for (const line of lines) {
              if (line.startsWith("data: ") && line !== "data: [DONE]") {
                try {
                  const json = JSON.parse(line.slice(6));
                  const content = json.choices?.[0]?.delta?.content;
                  if (content) {
                    fullAssistantResponse += content;
                  }
                } catch {
                  // Ignore parse errors for incomplete chunks
                }
              }
            }
          }
          controller.close();

          // Log the conversation after stream completes
          if (session_id && fullAssistantResponse) {
            await logConversation(
              session_id,
              source_url || null,
              latestUserMessage,
              fullAssistantResponse
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
