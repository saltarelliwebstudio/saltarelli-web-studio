import React from "react";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { businessSchema } from "@/lib/schema";
import { Link } from "react-router-dom";

// Plain-language terms for every offer. Pricing lives in each client's proposal, never here
// (setup fees vary by product, so this page must not say "no setup fee").
// Proposal emails link here and say "Payment constitutes acceptance of our Terms of
// Service", so this page IS the agreement for new clients. Keep the guarantee wording
// subjective: never tie the refund to leads, reviews or rankings.
// Clients signed before 2026-08-30 stay on their signed terms (old PDF in /public).
const LAST_UPDATED = "October 7, 2026";

const Terms = () => {
  return (
    <>
      <SEO
        canonical="/terms"
        title="Terms of Service | Saltarelli Web Studio"
        description="The simple agreement behind every Saltarelli Web Studio client: month-to-month, 60-day money-back guarantee, cancel anytime."
        schema={[businessSchema]}
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        <main className="relative z-10 flex-1 px-4 md:px-6 pt-32 pb-20">
          <article className="container mx-auto max-w-3xl glass-strong rounded-2xl border border-white/10 p-6 md:p-10">
            <p className="text-sm text-muted-foreground mb-2">Last updated {LAST_UPDATED}</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>

            <p className="text-muted-foreground leading-relaxed mb-4">
              This is a simple agreement, not a long contract. Saltarelli Web Studio ("we", "us") is a sole
              proprietorship in Port Colborne, Ontario, run by Adam Saltarelli. "You" means the business that
              hires us. When you make your first payment, you agree to these terms.
            </p>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 mb-8 text-sm leading-relaxed">
              <p className="font-medium text-foreground mb-1">The short version</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>You pay what's in your proposal. Monthly service is month-to-month. Cancel anytime.</li>
                <li>Not happy in your first 60 days after launch? You get your monthly fees back. No conditions tied to review counts or ranking positions.</li>
                <li>You own your domain, your Google Business Profile, your brand and your customer data. Always.</li>
                <li>We don't promise rankings or a set number of leads. We promise to do the work and show you the numbers every month.</li>
              </ul>
            </div>

            <Section title="1. What you're paying for">
              <p>
                Your proposal lists exactly what we're building and running for you. Depending on your plan, that
                can include:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Your website: design, hosting, updates, security, backups and monitoring.</li>
                <li>Your Google Business Profile: kept complete and current, with regular posts.</li>
                <li>Your reviews: a review campaign to your past customers, replies to the reviews that come in, a review QR phone wallpaper and an email signature banner.</li>
                <li>Your leads: instant alerts when a lead comes in, plus your own client dashboard login.</li>
                <li>A monthly report showing where you stand.</li>
                <li>AI phone agents and automations, when your proposal includes them.</li>
              </ul>
              <p className="mt-3">
                If something isn't in your proposal, it isn't included. Ad spend, social media management, and
                third-party software you pay for directly are not part of the monthly fee unless your proposal
                says so.
              </p>
            </Section>

            <Section title="2. Price and billing">
              <ul className="list-disc pl-5 space-y-2">
                <li>You pay the prices in your proposal, including any one-time setup fee and your monthly fee, in Canadian dollars unless it says otherwise.</li>
                <li>Any setup fee and your first month are charged when you sign up. After that, billing moves to the 1st or the 15th of the month, whichever comes first after your first month ends. The days in between are on us. There's no catch-up charge.</li>
                <li>Payments are taken automatically by card or bank debit through Stripe.</li>
                <li>Prices don't include sales tax. Where HST applies, it's added to your invoice.</li>
                <li>If a payment fails, we'll let you know and give you 14 days to fix it. After that the service may be paused until it's sorted out, unless we've agreed otherwise.</li>
                <li>We never raise your price without at least 30 days' notice by email, so you always have time to decide.</li>
              </ul>
            </Section>

            <Section title="3. The 60-day money-back guarantee">
              <p>
                If you're not satisfied in your first 60 days, you get your monthly fees back. The 60 days start on the
                day your work goes live (launch), not the day you sign, because you can't judge something that
                isn't running yet.
              </p>
              <p className="mt-3">
                To use it, email or text Adam inside that window. We refund every monthly fee you've paid us so far,
                with no questions and no conditions tied to review counts or ranking positions. The service ends
                when the refund goes out.
              </p>
              <p className="mt-3">
                Setup fees are not refundable. They cover the build work done before launch.
              </p>
            </Section>

            <Section title="4. Cancelling">
              <ul className="list-disc pl-5 space-y-2">
                <li>Month-to-month, no lock-in. Cancel anytime by email or text.</li>
                <li>Cancelling stops the next charge. You keep the service until the end of the month you've already paid for.</li>
                <li>After your 60-day window, months already paid aren't refunded.</li>
              </ul>
            </Section>

            <Section title="5. Timeline and what we need from you">
              <p>
                Most builds go live in 7 to 14 days. That clock depends on us getting what we need from you:
                logins or access (Google Business Profile, domain, any existing website or tools), your photos and
                info, and quick answers to our questions. We'll send you a short checklist the day you sign up.
                If we're waiting on you, the timeline moves with it.
              </p>
            </Section>

            <Section title="6. Changes and requests">
              <p>
                Small changes are included while you're a client: text and photo updates, hours, services, new
                sections, seasonal updates. Reach out and we'll take care of it. Most are done in 1 to 2
                business days, and always within 5 business days.
              </p>
              <p className="mt-3">
                Bigger things like a full redesign, a new system or a new integration are quoted separately before
                any work starts. You'll never get a surprise charge.
              </p>
            </Section>

            <Section title="7. Who owns what">
              <p className="font-medium text-foreground">Yours, always:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Your domain name and registrar account. You own it, and you pay for it.</li>
                <li>Your Google Business Profile. We work in it as a manager. You stay the owner.</li>
                <li>Your business name, logo, photos, written content and reviews.</li>
                <li>Your customer and lead data. Ask anytime and we'll export it for you.</li>
              </ul>
              <p className="font-medium text-foreground mt-4">Ours:</p>
              <p className="mt-2">
                The website build, code, design templates, automations, AI agent setup, dashboards and the hosting
                accounts that run them. You're licensed to use all of it while you're a client. It's a service,
                not a one-time purchase.
              </p>
              <p className="font-medium text-foreground mt-4">If you leave:</p>
              <p className="mt-2">
                At the end of your last paid month we take the site and systems offline and disconnect your
                domain. Before that, we'll hand back your content, photos and lead data, and remove ourselves from
                your Google Business Profile, so you walk away with everything that's yours.
              </p>
            </Section>

            <Section title="8. AI phone agents and automations">
              <p>If your plan includes an AI phone agent or automations:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>We map out the call flow with you and get your sign-off before it goes live. You approve what it says.</li>
                <li>AI can get things wrong. It works from the information you give us, so keep us posted when your prices, hours or services change.</li>
                <li>Calls may be recorded and transcribed so we can monitor and improve the agent. The agent tells callers when a call is recorded. You're responsible for meeting any rules specific to your industry.</li>
                <li>The agent should never be the only way an emergency or urgent call reaches you.</li>
              </ul>
            </Section>

            <Section title="9. What we can't promise">
              <ul className="list-disc pl-5 space-y-2">
                <li>We work to get you found on Google, but nobody controls Google. We don't guarantee a ranking position or a set number of leads, calls or reviews. You'll see the real numbers in your monthly report.</li>
                <li>We rely on other companies to run your service, like hosting, Google, Stripe, phone and AI providers. If one of them has an outage or changes how it works, we'll work around it as fast as we can, but we're not liable for their failures.</li>
                <li>No online service is up 100% of the time. Short outages don't count as a breach of this agreement.</li>
              </ul>
            </Section>

            <Section title="10. Your content">
              <p>
                You're responsible for making sure the content, photos, prices and claims you give us are accurate
                and that you have the right to use them. We can decline to publish anything that's misleading,
                illegal or harmful.
              </p>
            </Section>

            <Section title="11. Showing our work">
              <p>
                We may show your website or results in our portfolio, case studies and social posts. We only quote
                you word for word. If you'd rather we didn't feature you, tell us and we'll take it down.
              </p>
            </Section>

            <Section title="12. Privacy">
              <p>
                We keep your information and your customers' information private and only use it to deliver your
                service. Details are in our{" "}
                <Link to="/privacy" className="text-primary underline underline-offset-4">Privacy Policy</Link>.
              </p>
            </Section>

            <Section title="13. Limits of liability">
              <p>
                If something goes wrong, the most we're responsible for is what you paid us in the 3 months before
                the problem. We're not liable for lost profits, lost business or indirect losses. Nothing in these
                terms limits rights you have under Ontario law that can't be waived.
              </p>
            </Section>

            <Section title="14. Changes to these terms">
              <p>
                If we update these terms, we'll email you at least 30 days before the change applies to you. If
                you don't like the change, you can cancel before it takes effect. Clients who signed before August
                30, 2026 stay on the terms they signed unless we both agree in writing to move over.
              </p>
            </Section>

            <Section title="15. Governing law">
              <p>
                These terms are governed by the laws of Ontario and the federal laws of Canada that apply there. If
                there's ever a problem, call Adam first. Almost everything gets fixed on a phone call.
              </p>
            </Section>

            <Section title="Acceptance">
              <p>
                Making your first payment means you've read and accept these terms. Your proposal and these terms
                together are the whole agreement between us.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Saltarelli Web Studio · Port Colborne, Ontario, Canada
                <br />
                saltarelliwebstudio@gmail.com · 289-302-9451
              </p>
            </Section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-heading text-xl font-semibold mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export default Terms;
