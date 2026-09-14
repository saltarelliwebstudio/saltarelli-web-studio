import { CityPageLayout, CitySection } from "@/components/CityPageLayout";

/**
 * Fort Erie — border town, 20 minutes down the lake from Port Colborne. No
 * client is based here, so the proof stays the Port Colborne result. The angle
 * is the two-audience problem: locals plus a steady flow of visitors and
 * cross-border traffic who search from a phone and have no idea who's who.
 * Do not imply a Fort Erie-based client.
 */
const WebDesignFortErie = () => (
  <CityPageLayout
    city="Fort Erie"
    slug="web-design-fort-erie"
    title="Web Design in Fort Erie, Ontario"
    description="Websites, Google reviews and local SEO for Fort Erie, Ridgeway and Crystal Beach businesses. Twenty minutes from my desk in Port Colborne."
    intro="Fort Erie businesses serve two crowds: the people who live here and the people passing through. Most websites in town were built for neither."
  >
    <CitySection heading="Half your customers have never heard of you">
      <p>
        Fort Erie is not a town where everyone knows everyone. Between the
        Peace Bridge traffic, the race track, the Parkway, and the summer swell
        in Crystal Beach and Ridgeway, a big share of the people who need a
        plumber, a mechanic, a restaurant or a contractor this week did not
        grow up here and have nobody to ask. They pull out a phone and search.
      </p>
      <p>
        That is a different problem from a town like Port Colborne, where word
        of mouth still carries most of the weight. Here, the business that shows
        up first with real reviews, real photos and hours that are actually
        correct gets the call, whether or not it's the best one. The one that
        has been here thirty years and has no website gets nothing from that
        visitor, and never knows it.
      </p>
      <p>
        You're also competing with results from across the river. Search a trade
        from a phone near the bridge and Buffalo businesses show up beside
        yours. A proper Google Business Profile that says exactly where you are
        and what you cover is what keeps you in the Canadian results and out of
        the noise.
      </p>
    </CitySection>

    <CitySection heading="Ridgeway, Crystal Beach and Stevensville are separate searches">
      <p>
        Google treats Fort Erie, Ridgeway, Crystal Beach and Stevensville as
        different places, because to the people searching, they are. Someone in
        a cottage at Bay Beach searches "electrician Crystal Beach," not
        "electrician Fort Erie." If your site only says Fort Erie, you're
        leaving the other three on the table, and most of your competitors are
        doing exactly that.
      </p>
      <p>
        The fix is not four websites. It's one site that names the communities
        you actually serve, individual pages for the services people search for
        by name, and a Google profile with the service area set properly. That
        is unglamorous work and it is most of the difference between showing up
        and not.
      </p>
      <p>
        Twenty minutes west in Port Colborne, I took a local gym to number one
        on Google in the Niagara region in 60 days with the same three pieces:
        a real site, a filled-in Google profile, and a review engine so every
        happy customer was asked instead of being left to chance. Nothing about
        that is specific to gyms.
      </p>
    </CitySection>

    <CitySection heading="What I'd look at first if you're in Fort Erie">
      <p>
        Search your own trade from your phone, on data, standing in your
        parking lot. Look at who shows up, how many reviews they have, and
        whether your hours on Google match the ones on your door. That five
        minute exercise tells you more than any audit, and it's usually where
        the conversation starts.
      </p>
      <p>
        If you want the honest version of that from someone who does it every
        day, book a call. I'll go through your site, your Google profile and
        your reviews before we talk, and I'll tell you if you don't need me.
      </p>
    </CitySection>
  </CityPageLayout>
);

export default WebDesignFortErie;
