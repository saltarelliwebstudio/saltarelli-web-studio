import { CityPageLayout, CitySection } from "@/components/CityPageLayout";

/**
 * St. Catharines — Niagara's largest and most competitive local search market.
 * Named client: G&D Landscaping (Dyllon and Gord), verified against their live
 * site for services and service radius.
 */
const WebDesignStCatharines = () => (
  <CityPageLayout
    city="St. Catharines"
    slug="web-design-st-catharines"
    title="Web Design in St. Catharines, ON"
    description="Websites, Google reviews and local SEO for St. Catharines businesses. Built for Niagara's most competitive search market, where reviews decide the ranking."
    intro="St. Catharines is the one Niagara market where you have real competition on Google. Ranking here is a different job than ranking in a small town, and it's won on reviews."
  >
    <CitySection heading="Here you are actually competing">
      <p>
        This is the largest city in Niagara, and it's the only local market in
        the region where search results are genuinely contested. Type in almost
        any trade or service and you get a full map pack, a page of established
        businesses, and several of them running paid ads underneath.
      </p>
      <p>
        That changes the work. In Port Colborne, having a decent website and a
        verified Google profile can be enough to put you at the top, because most
        of your competitors have neither. In St. Catharines everyone credible
        already has both. Being present is table stakes. The ranking gets decided
        on the things most businesses neglect.
      </p>
      <p>
        The one that matters most is review velocity. Not your total, your
        recency and your rate. A business with 180 reviews where the last one
        arrived fourteen months ago consistently loses to a business with 60 that
        is adding three or four a month. Google reads the second one as currently
        busy and currently trusted. Most owners are proud of the total and have
        never once thought about the rate.
      </p>
    </CitySection>

    <CitySection heading="G&amp;D Landscaping">
      <p>
        Dyllon and Gord run G&amp;D Landscaping out of St. Catharines. It's a
        genuinely broad operation: lawn care and maintenance, garden and bed
        work, hedge and shrub trimming, spring and fall cleanups, interlock and
        stone work, tree and brush removal, earth works, and snow and ice control
        through the winter. They cover roughly a 45-minute radius from central
        St. Catharines, which takes in Niagara Falls, Thorold and Welland.
      </p>
      <p>
        The trap for a business like that is a website that flattens all of it
        into one "Services" page. Someone searching for interlock and someone
        searching for snow removal are two completely different customers with
        two completely different budgets, and a single page can't rank for both.
        Separating the work out, and being explicit about the area covered, is
        what lets each service compete on its own terms.
      </p>
    </CitySection>

    <CitySection heading="Seasonality swings harder than owners expect">
      <p>
        Plenty of St. Catharines businesses are effectively two businesses
        depending on the month. Landscapers become snow contractors. Roofers get
        buried in spring. HVAC lives and dies on the first cold week of
        November and the first hot week of July.
      </p>
      <p>
        Search demand moves the same way, and it moves before the weather does.
        People start looking for snow removal contracts in October, not after the
        first storm. If the page for that work only goes up once you need the
        business, you've already missed the window where the searching happened.
        Both sides of the year need to exist on the site year round.
      </p>
      <p>
        If you're in St. Catharines and you want to know where you genuinely
        stand against the businesses ranking above you, book a call. Fifteen
        minutes, and I'll have looked at your site, your profile and your review
        pattern before we speak.
      </p>
    </CitySection>
  </CityPageLayout>
);

export default WebDesignStCatharines;
