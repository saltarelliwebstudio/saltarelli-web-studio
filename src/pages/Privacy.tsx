import React from "react";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { businessSchema } from "@/lib/schema";
import { Link } from "react-router-dom";

// Plain-language privacy policy. The "Text messaging" section carries the exact
// clause US carriers require for 10DLC campaign registration (Quo Trust Center,
// step 3) -- do not reword it: "text messaging originator opt-in data and
// consent ... will not be shared with any third parties."
const LAST_UPDATED = "September 15, 2026";

const Privacy = () => {
  return (
    <>
      <SEO
        canonical="/privacy"
        title="Privacy Policy | Saltarelli Web Studio"
        description="How Saltarelli Web Studio collects, uses and protects your information, including text-message opt-in data."
        schema={[businessSchema]}
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        <main className="relative z-10 flex-1 px-4 md:px-6 pt-32 pb-20">
          <article className="container mx-auto max-w-3xl glass-strong rounded-2xl border border-white/10 p-6 md:p-10">
            <p className="text-sm text-muted-foreground mb-2">Last updated {LAST_UPDATED}</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Saltarelli Web Studio ("we", "us") is a sole proprietorship based in Port Colborne, Ontario,
              operated by Adam Saltarelli. This policy explains what we collect when you use
              saltarelliwebstudio.ca, book a call, fill out a form, or text with us, and what we do with it.
            </p>

            <Section title="What we collect">
              <ul className="list-disc pl-5 space-y-2">
                <li>Contact details you give us: name, business name, email, phone number, website.</li>
                <li>Messages you send us through forms, email, text, or the site chat.</li>
                <li>Basic usage data: pages visited, device type, and referring site, collected by our own analytics.</li>
                <li>Booking details if you schedule a call through Calendly.</li>
              </ul>
            </Section>

            <Section title="How we use it">
              <ul className="list-disc pl-5 space-y-2">
                <li>To reply to you, run the call you booked, and deliver the services you hire us for.</li>
                <li>To send booking confirmations, reminders, and follow-ups you asked for.</li>
                <li>To improve the site and understand which pages help people.</li>
              </ul>
              <p className="mt-3">We do not sell your information. We do not rent lists.</p>
            </Section>

            <Section title="Who we share it with">
              <p>
                Only the service providers we need to operate: our website host, email provider,
                scheduling tool (Calendly), database provider, and our business phone and texting
                provider (Quo). Each one handles your data only to provide that service to us.
              </p>
              <p className="mt-3 font-medium text-foreground">
                All the above categories exclude text messaging originator opt-in data and consent; this
                information will not be shared with any third parties.
              </p>
            </Section>

            <Section title="Text messaging">
              <p>
                If you opt in to text messages from Saltarelli Web Studio, we will send booking
                confirmations, appointment reminders, replies to your questions, and follow-ups about the
                service you asked about. Message frequency varies. Message and data rates may apply.
              </p>
              <p className="mt-3">
                You can opt out at any time by replying <strong>STOP</strong>. Reply <strong>HELP</strong> for
                help, or email saltarelliwebstudio@gmail.com. Your text-message opt-in and consent records are
                kept private and are not shared with or sold to any third party. See our{" "}
                <Link to="/sms" className="text-primary underline underline-offset-4">text message terms</Link>.
              </p>
            </Section>

            <Section title="Keeping it safe">
              <p>
                Your information is stored with providers that use encryption in transit and at rest. Access is
                limited to Adam and the systems needed to run the business. We keep contact records for as long
                as we work together or as long as needed to respond to you, then delete them on request.
              </p>
            </Section>

            <Section title="Your choices">
              <p>
                You can ask us at any time to see, correct, or delete the information we hold about you. Email
                saltarelliwebstudio@gmail.com or call 289-302-9451 and we'll take care of it.
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

export default Privacy;
