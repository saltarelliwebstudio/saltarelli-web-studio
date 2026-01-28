import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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
To get started: Book a free Discovery Call at /get-started

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
- **BE CONCISE**: Keep responses to 1-3 sentences max. No walls of text.
- Only elaborate if the user explicitly asks for more details
- Answer the specific question asked - don't over-explain or list everything
- For pricing: "Starting at a few hundred dollars - book a discovery call for exact quotes"
- Guide to the right page/service without lengthy descriptions
- Friendly and warm, but get to the point quickly
- If unsure, suggest a discovery call in one sentence`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

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
          ...messages,
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

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
