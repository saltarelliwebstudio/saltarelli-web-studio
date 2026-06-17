import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { FadeIn } from "@/components/motion";

type Logo = { src: string; alt: string; url: string; imgClass?: string };

const BASE_IMG = "max-h-[60px] max-w-[85%] object-contain rounded-md";

const logos: Logo[] = [
  { src: "/logos/cassar-electrical.png", alt: "Cassar Electrical", url: "https://cassarelectric.ca" },
  { src: "/logos/mohawk-electric.png", alt: "Mohawk Electric", url: "https://mohawkelectric.ca" },
  { src: "/logos/genius-fitness.webp", alt: "Genius Fitness & MMA", url: "https://www.geniusfitnessandmma.com" },
  { src: "/logos/pops-landscaping.png", alt: "Pop's Landscaping", url: "https://popslandscaping.ca" },
  { src: "/logos/360-property-maintenance.png", alt: "360 Property Maintenance", url: "https://360propertymaintenance.com" },
  { src: "/logos/bell-marine.webp", alt: "Bell Marine", url: "https://bellmarineltd.com" },
  { src: "/logos/luxury-details.png", alt: "Luxury Details", url: "https://luxurydetails.ca" },
  { src: "/logos/mbv-specialty-services.png", alt: "MBV Specialty Services", url: "https://mbvinc.ca" },
  { src: "/logos/landscape-one.jpeg", alt: "Landscape One", url: "https://landscapeone.ca" },
  { src: "/logos/skunk-removal-niagara.png", alt: "Skunk Removal Services Niagara", url: "https://skunkremovalservicesniagara.ca" },
  { src: "/logos/mark-windows-and-doors.png", alt: "Mark Windows and Doors", url: "https://windowsanddoorsbymark.com", imgClass: "max-h-[52px] max-w-[94%] object-contain rounded-md" },
  { src: "/logos/santoro-pizza.png", alt: "Santoro Pizza", url: "https://santoropizza.ca", imgClass: "max-h-[82px] max-w-[88%] object-contain rounded-md" },
  { src: "/logos/ws-construction.png", alt: "WS Construction", url: "https://ws-construction.ca" },
  { src: "/logos/mary-maes.png", alt: "Mary N Mae's Tack N Feed", url: "http://www.marynmaetacknfeed.com", imgClass: "max-h-[78px] max-w-[88%] object-contain rounded-md" },
  { src: "/logos/mom-dukes.webp", alt: "Mom Duke's Authentic Jamaican Cuisine", url: "https://www.momdukes2020.com", imgClass: "max-h-[74px] max-w-[88%] object-contain rounded-md" },
  { src: "/logos/bluewater-stone.png", alt: "Bluewater Stone Hardscaping", url: "https://bluewaterstone.ca" },
  { src: "/logos/gd-landscaping.png", alt: "G&D Landscaping", url: "https://gdlandscaping.ca", imgClass: "max-h-[84px] max-w-[90%] object-contain rounded-md" },
  { src: "/logos/claudes-roofing.png", alt: "Claude's Roofing", url: "https://claudesroofing.ca", imgClass: "max-h-[84px] max-w-[92%] object-contain rounded-md" },
  { src: "/logos/tree-stump-removal.png", alt: "Tree and Stump Removal", url: "https://treeandstumpremoval.ca" },
  { src: "/logos/carrot-effect.png", alt: "The Carrot Effect", url: "https://thecarroteffect.ca" },
];

function LogoTile({ logo }: { logo: Logo }) {
  return (
    <a
      href={logo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${logo.alt}`}
      title={logo.alt}
      draggable={false}
      className="group flex h-28 w-48 select-none items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white to-slate-100 p-5 shadow-lg shadow-black/20 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
    >
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        draggable={false}
        className={logo.imgClass ?? BASE_IMG}
      />
    </a>
  );
}

export function TrustedBy() {
  return (
    <section className="py-16 md:py-20 relative z-10">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <FadeIn className="text-center mb-10">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
            Trusted By
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold">
            Businesses across the Niagara Region run on our work
          </h2>
          <p className="text-sm text-muted-foreground mt-3">
            Drag to explore. Tap any logo to visit their site.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <Carousel
          opts={{ loop: true, dragFree: true, align: "start", containScroll: false }}
          plugins={[
            AutoScroll({
              speed: 0.8,
              startDelay: 0,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full cursor-grab active:cursor-grabbing"
        >
          <CarouselContent className="-ml-0 py-8">
            {logos.map((logo, i) => (
              <CarouselItem key={i} className="basis-auto pl-0 pr-6">
                <LogoTile logo={logo} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </FadeIn>
    </section>
  );
}
