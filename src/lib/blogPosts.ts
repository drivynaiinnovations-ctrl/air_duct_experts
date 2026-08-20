import type { ServiceAccent } from "./serviceAccent";

export type BlogBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cta"; text: string; label: string; href: string };

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  accent: ServiceAccent;
  date: string; // ISO
  readMinutes: number;
  excerpt: string;
  body: BlogBlock[];
  faq: { q: string; a: string }[];
  relatedServices: string[];
  relatedLocations: string[];
}

const p = (text: string): BlogBlock => ({ type: "p", text });
const h2 = (id: string, text: string): BlogBlock => ({ type: "h2", id, text });
const ul = (items: string[]): BlogBlock => ({ type: "ul", items });
const cta = (text: string, label: string, href: string): BlogBlock => ({ type: "cta", text, label, href });

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "complete-hvac-system-cleaning-explained",
    title: "What Does Complete HVAC System Cleaning Actually Mean?",
    metaTitle: "What Is Complete HVAC System Cleaning? | Air Duct Experts",
    description: "A plain-English breakdown of what \"complete HVAC system cleaning\" covers — supply and return ducts, the blower, the coil, and the air handler — and why it matters more than a quick vent wipe.",
    category: "Education",
    accent: "blue",
    date: "2026-01-14",
    readMinutes: 6,
    excerpt: "\"Duct cleaning\" means different things to different companies. Here's what should actually be included, and why the parts you can't see matter more than the ones you can.",
    body: [
      p("If you've ever called around for duct cleaning quotes, you've probably noticed the price swings wildly — $99 here, $600 there — for what sounds like the same service. The reason is simple: \"duct cleaning\" isn't a standardized term, and most homeowners never find out what was actually cleaned until after the technician has left."),
      h2("what-it-covers", "The parts of the system that should be cleaned"),
      p("Complete HVAC system cleaning means cleaning the entire path air travels through your home, not just the grille you can see in the ceiling or wall. That includes:"),
      ul([
        "Supply ducts — the ducts that carry conditioned air into each room",
        "Return ducts — the ducts that pull air back to the system to be reconditioned",
        "Registers and grilles — the visible vent covers, cleaned inside and out",
        "Main trunk lines — the large central ducts everything else branches from",
        "Blower compartment and blower motor/wheel — the fan that moves all that air",
        "Evaporator coil — where dust and moisture combine into buildup if never cleaned",
        "Air handler or furnace cabinet — the housing everything sits inside",
      ]),
      h2("why-it-matters", "Why the invisible parts matter more than the visible ones"),
      p("Here's the part most low-cost ads leave out: the blower and coil are where air actually gets pulled through and pushed back out. If those components are coated in dust, every cycle of your HVAC system recirculates that buildup through the ducts you just paid to have cleaned. A vent-only cleaning can look great in the register and do almost nothing for the air quality in the room."),
      p("This is also why we don't advertise a single flat rate for every home. The right approach depends on your number of systems, vents, and how the ductwork is configured — which is exactly what an estimate is for."),
      cta(
        "Want a straightforward explanation of what your specific home would need?",
        "Get My Estimate",
        "/#estimate"
      ),
      h2("how-to-tell", "How to tell if a quote covers the complete system"),
      p("Ask directly: does the price include the blower motor, the evaporator coil, and the air handler cabinet — or only the ductwork and registers? A company that can answer clearly and explain what's excluded is being straight with you. One that dodges the question, or adds a per-vent fee once they're already in your house, usually isn't."),
    ],
    faq: [
      { q: "Is duct cleaning the same as HVAC system cleaning?", a: "Not always. \"Duct cleaning\" can mean anything from a full-system service to a quick pass at the visible vents. \"Complete HVAC system cleaning\" specifically includes the blower, coil and air handler in addition to the ductwork." },
      { q: "Does the blower motor really need to be cleaned?", a: "Yes — it's one of the main places dust and debris collect, and it pushes air through your entire home. Skipping it leaves a major contamination point untouched." },
      { q: "How do I know what my quote includes?", a: "Ask specifically whether the blower, coil, and air handler cabinet are part of the price. If a company can't answer clearly, that's worth noting before you book." },
    ],
    relatedServices: ["air-duct-cleaning", "indoor-air-quality"],
    relatedLocations: ["woodbridge"],
  },

  {
    slug: "why-cleaning-only-the-vents-isnt-enough",
    title: "Why Cleaning Only the Vents Isn't Enough",
    metaTitle: "Why Vent-Only Cleaning Falls Short | Air Duct Experts",
    description: "A quick vent wipe looks clean, but it skips the blower, coil and air handler where most of the buildup actually lives. Here's why that matters for dust and air quality.",
    category: "Education",
    accent: "blue",
    date: "2026-01-21",
    readMinutes: 5,
    excerpt: "A register can look spotless while the rest of the system stays untouched. Here's what a vent-only cleaning misses — and why it shows up as dust again within weeks.",
    body: [
      p("It's an easy mistake to make: you look at a clean, dust-free vent cover and assume the job is done. But the vent cover is the very last few inches of a system that can run 50, 100, sometimes 200+ feet through your home's walls, floors and ceilings."),
      h2("the-register-is-not-the-system", "The register is not the system"),
      p("Picture your HVAC system as a network of tunnels connected to a central fan (the blower) and a cooling component (the evaporator coil). Dust, pet dander, and debris don't stop at the register — they travel the whole network, settling in bends, the trunk line, and eventually the blower and coil themselves."),
      p("A technician who only reaches as far as a vacuum hose can push into the visible register is cleaning maybe the first few feet of that network. Everything past that point — including the parts that move air through your entire home — goes untouched."),
      h2("what-happens-next", "What happens after a vent-only cleaning"),
      ul([
        "Dust in the untouched sections gets stirred loose the next time the system runs",
        "It travels back through the (now clean) register and right back into your rooms",
        "Within a few weeks, dust looks like it's \"back\" — because it never actually left the system",
        "Odors tied to a dirty coil or blower don't go away, since that's not where the cleaning happened",
      ]),
      h2("the-fix", "What a complete cleaning changes"),
      p("Cleaning the full path — ducts, blower, coil, and air handler cabinet — removes the buildup at its actual source instead of just the part you can see. It's more thorough, takes longer, and costs more than a 20-minute vent wipe. It's also the difference between a cleaning that lasts and one that needs to be redone every few months."),
      cta(
        "See exactly what's included in a complete air duct cleaning.",
        "View Air Duct Cleaning",
        "/services/air-duct-cleaning"
      ),
    ],
    faq: [
      { q: "Why does dust come back so fast after a cheap duct cleaning?", a: "If the blower and coil weren't cleaned, dust in those areas gets recirculated the next time your system runs — so it looks like the cleaning didn't work, even though the visible vents really were cleaned." },
      { q: "Can I tell from the outside if my ducts were fully cleaned?", a: "Not reliably. A clean register tells you almost nothing about the condition of the blower, coil or trunk lines further into the system." },
    ],
    relatedServices: ["air-duct-cleaning"],
    relatedLocations: ["dale-city"],
  },

  {
    slug: "whats-included-in-professional-air-duct-cleaning",
    title: "What Should Be Included in Professional Air Duct Cleaning?",
    metaTitle: "What's Included in Professional Duct Cleaning? | Air Duct Experts",
    description: "A homeowner's checklist for what a professional air duct cleaning should include — from supply and return ducts to the blower, coil, and air handler cabinet.",
    category: "Buying Guide",
    accent: "blue",
    date: "2026-01-28",
    readMinutes: 6,
    excerpt: "Before you book anything, use this checklist to compare what different companies are actually offering — not just what they're charging.",
    body: [
      p("Because \"duct cleaning\" isn't a regulated term, the easiest way to compare companies isn't the price — it's the scope. Here's a practical checklist to run through before you book."),
      h2("the-checklist", "The complete-system checklist"),
      ul([
        "Supply ducts cleaned throughout the home, not just near the unit",
        "Return ducts cleaned, including the main return trunk",
        "Every register and grille removed, cleaned, and wiped down — not just vacuumed in place",
        "Blower compartment cleaned",
        "Blower motor or wheel cleaned — ask specifically, this is commonly skipped",
        "Evaporator coil cleaned",
        "Air handler or furnace cabinet cleaned",
        "A clear explanation of what's included before any work starts",
      ]),
      h2("questions-that-reveal-the-scope", "Two questions that reveal the real scope"),
      p("\"Is the blower motor included?\" and \"Is the coil included?\" are the two fastest ways to find out whether a quote covers the complete system or just the ductwork. If the answer is vague, or if either is offered only as a costly add-on discovered mid-visit, treat that as a red flag."),
      h2("estimates-vs-final-price", "Why a real estimate isn't a fixed price sight-unseen"),
      p("A company that gives you an exact final price without seeing your home, your number of systems, or your number of vents is guessing — and guesses tend to turn into upsells once a technician is standing in your house. A properly built estimate is based on what you share up front, then confirmed by a technician on-site before any work begins."),
      cta(
        "Get an estimate built around your actual home, not a generic flat rate.",
        "Get My Estimate",
        "/#estimate"
      ),
    ],
    faq: [
      { q: "Is the evaporator coil really part of duct cleaning?", a: "It should be, for a complete system cleaning. The coil sits directly in the airflow path and collects dust and moisture, which can affect both air quality and system efficiency if never cleaned." },
      { q: "What's a reasonable number of vents to expect covered in a quote?", a: "Every vent in the home should be included — supply and return. If a company charges extra per vent past a low included number, ask for the full total before booking." },
    ],
    relatedServices: ["air-duct-cleaning", "dryer-vent-cleaning"],
    relatedLocations: ["manassas"],
  },

  {
    slug: "questions-to-ask-before-hiring-a-duct-cleaning-company",
    title: "9 Questions to Ask Before Hiring a Duct Cleaning Company",
    metaTitle: "9 Questions to Ask a Duct Cleaning Company | Air Duct Experts",
    description: "Vet any duct cleaning company with these nine questions before you book — covering scope, pricing, and what happens if extra work is found.",
    category: "Buying Guide",
    accent: "amber",
    date: "2026-02-04",
    readMinutes: 5,
    excerpt: "A five-minute phone call with the right questions tells you more than any advertisement will. Here's what to ask before you book.",
    body: [
      p("Duct cleaning is one of those services where the difference between a good and a disappointing experience usually comes down to what was agreed on before the technician showed up. These nine questions take a few minutes and can save you from an unpleasant surprise."),
      h2("the-nine-questions", "The nine questions"),
      ul([
        "Does the price include the blower motor and evaporator coil, or only the ducts and registers?",
        "Is the quoted price an estimate, or a guaranteed final price?",
        "What happens if you find additional work is needed once you're on-site?",
        "How many vents does the quoted price actually cover?",
        "Do you sanitize or deodorize, and is that included or an add-on?",
        "How long will the appointment take for a home our size?",
        "Can you walk me through what you'll do, step by step?",
        "Do you offer dryer vent cleaning at the same visit?",
        "What's not included in this price?",
      ]),
      h2("red-flags", "Answers worth being cautious about"),
      p("Vague answers, pressure to book immediately without a real conversation about your home, or a price that seems too good to be true relative to competitors are all worth a second look. A company confident in its process will walk you through the scope without hesitation."),
      h2("what-good-looks-like", "What a good answer sounds like"),
      p("A straightforward company will tell you plainly what's included, be upfront that the online estimate is a starting point (not a guarantee), and explain that a technician verifies your exact system on arrival — with any additional work explained and approved by you before it happens, not billed after the fact."),
      cta(
        "Ask us these questions directly — call or text any time.",
        "Call (571) 337-9306",
        "tel:5713379306"
      ),
    ],
    faq: [
      { q: "Should I be worried if a company won't give an exact price over the phone?", a: "Not necessarily — an honest estimate depends on details like home size, number of systems and vents. A company that gives a firm price without asking any of that is more likely guessing than being accurate." },
      { q: "What should happen if a technician finds more work needed?", a: "They should explain what they found and why, then get your approval before doing anything beyond the original scope — never bill you for surprise work." },
    ],
    relatedServices: ["air-duct-cleaning", "indoor-air-quality"],
    relatedLocations: ["fairfax"],
  },

  {
    slug: "what-does-a-199-duct-cleaning-ad-really-include",
    title: "What Does a $199 Duct Cleaning Ad Actually Include?",
    metaTitle: "What's Really Included in a $199 Duct Cleaning Ad? | Air Duct Experts",
    description: "Low flat-rate duct cleaning ads are everywhere. Here's what that price typically covers, what it usually skips, and how to compare it against a complete system cleaning.",
    category: "Buying Guide",
    accent: "amber",
    date: "2026-02-11",
    readMinutes: 5,
    excerpt: "That $199 number is real — it's the scope behind it that's usually the problem. Here's what to look for before you book based on price alone.",
    body: [
      p("If you've searched for duct cleaning near you, you've seen the ads: $99, $149, $199, sometimes with \"unlimited vents\" in the fine print. These prices aren't fake, but they're almost always attached to a limited scope of work."),
      h2("whats-typically-covered", "What a flat-rate ad typically covers"),
      ul([
        "A set number of supply vents — often far fewer than a typical home actually has",
        "A quick vacuum or brush pass at the visible register only",
        "No access to the blower compartment or motor",
        "No evaporator coil cleaning",
        "No sanitizing or deodorizing unless purchased separately",
      ]),
      h2("the-fine-print", "Where the price usually grows"),
      p("\"Unlimited vents\" ads commonly define a vent narrowly, then charge per additional supply or return opening once a technician is in your home counting them. A home advertised at $199 can end up well past that number once every actual vent, return, and any recommended add-on is priced in."),
      h2("how-to-compare-fairly", "How to compare a flat-rate ad to a real estimate"),
      p("The fairest comparison isn't the sticker price — it's the total price for your actual home, with the blower, coil and air handler included, against the advertised number plus its likely add-ons. Ask the flat-rate company directly whether the blower and coil are included at the advertised price. If not, get the full number before deciding."),
      cta(
        "Get a straightforward estimate for your actual home — no per-vent surprises.",
        "Get My Estimate",
        "/#estimate"
      ),
    ],
    faq: [
      { q: "Are $199 duct cleaning ads a scam?", a: "Not necessarily a scam, but the price usually reflects a limited scope of work. The issue isn't dishonesty so much as an incomplete picture until you ask what's actually included." },
      { q: "Why doesn't Air Duct Experts advertise one flat rate?", a: "Because homes vary — different numbers of systems, vents, and ductwork configurations mean a single flat number either overcharges simple homes or undercharges larger ones. An estimate based on your specific home is more honest." },
    ],
    relatedServices: ["air-duct-cleaning"],
    relatedLocations: ["springfield"],
  },

  {
    slug: "signs-your-air-ducts-need-cleaning",
    title: "8 Signs Your Air Ducts Need Cleaning",
    metaTitle: "8 Signs You Need Air Duct Cleaning | Air Duct Experts",
    description: "Not sure if your ducts need attention? These eight signs — from visible dust to musty odors — are the most common indicators DMV homeowners notice first.",
    category: "Education",
    accent: "blue",
    date: "2026-02-18",
    readMinutes: 5,
    excerpt: "Most homeowners don't think about their ducts until something feels off. Here are the signs worth paying attention to.",
    body: [
      p("Air ducts are easy to forget about — they're hidden behind walls and ceilings, doing their job quietly for years. But there are usually a few noticeable signs before things get bad enough to be obvious."),
      h2("the-eight-signs", "The eight most common signs"),
      ul([
        "Visible dust building up around vents or settling quickly on furniture after cleaning",
        "A musty or stale smell specifically when the HVAC system turns on",
        "You recently bought, moved into, or renovated the home and don't know its duct history",
        "Allergy or sinus symptoms that ease noticeably when you're away from the house",
        "It's been years since the ducts were cleaned — or you're not sure they ever have been",
        "Visible debris or discoloration when you look inside a register with a flashlight",
        "Pets shed heavily and dander seems to circulate through the house",
        "A recent pest issue near ductwork or in the attic/crawlspace",
      ]),
      h2("why-these-signs-matter", "Why these signs are worth acting on"),
      p("None of these alone means something is seriously wrong — but together, they're a reasonable reason to have a technician take a look. Ducts that haven't been cleaned in a long time, or a home you've just moved into with unknown history, are exactly the situations where an inspection tends to be worthwhile."),
      h2("what-to-do-next", "What a technician actually checks"),
      p("On a duct cleaning visit, your technician verifies your system's configuration — number of systems, vents, and general condition — before recommending exactly what's needed. That's a more useful next step than guessing based on symptoms alone."),
      cta(
        "Not sure if it's time? Get an estimate and we'll help you figure it out.",
        "Get My Estimate",
        "/#estimate"
      ),
    ],
    faq: [
      { q: "How do I check my ducts myself?", a: "Remove a register cover and look inside with a flashlight. Visible dust, debris, or discoloration is a reasonable sign it's worth having a professional look further into the system." },
      { q: "Is it normal to not know when ducts were last cleaned?", a: "Very common, especially for homes bought from a previous owner. It's one of the most frequent reasons homeowners request their first cleaning." },
    ],
    relatedServices: ["air-duct-cleaning", "indoor-air-quality"],
    relatedLocations: ["burke"],
  },

  {
    slug: "how-often-should-dryer-vents-be-cleaned",
    title: "How Often Should Dryer Vents Be Cleaned?",
    metaTitle: "How Often to Clean Your Dryer Vent | Air Duct Experts",
    description: "Lint builds up inside your dryer vent long before it's visible. Here's how often to have it cleaned, and the warning signs that mean it's overdue.",
    category: "Maintenance",
    accent: "amber",
    date: "2026-02-25",
    readMinutes: 4,
    excerpt: "A slow-drying dryer isn't just annoying — it's usually the first sign your vent needs attention. Here's the timeline to follow.",
    body: [
      p("Dryer vent cleaning is one of the most overlooked pieces of home maintenance — mostly because the problem builds up somewhere you never see."),
      h2("the-general-rule", "The general rule of thumb"),
      p("Most homes benefit from a dryer vent cleaning about once a year. Households that do more laundry — larger families, frequent guests, pet bedding — may need it more often. Homes with a long or bent vent run between the dryer and the exterior wall also tend to accumulate lint faster and benefit from more frequent attention."),
      h2("signs-its-overdue", "Signs it's overdue before the year mark"),
      ul([
        "Clothes need two or more cycles to fully dry",
        "The dryer or laundry room feels unusually hot during a cycle",
        "A burning smell during drying",
        "Visible lint buildup around the exterior exhaust vent",
        "The outside vent flap doesn't open freely when the dryer runs",
      ]),
      h2("why-it-matters", "Why this isn't just about drying time"),
      p("Beyond the inconvenience of longer drying cycles, lint is highly flammable and a blocked vent traps heat inside the dryer and duct — a well-known contributor to dryer-related house fires. A clear vent also means your dryer isn't working harder (and using more energy) than it needs to."),
      cta(
        "Bundle dryer vent cleaning with your next duct cleaning appointment.",
        "View Dryer Vent Cleaning",
        "/services/dryer-vent-cleaning"
      ),
    ],
    faq: [
      { q: "Can I clean my dryer vent myself?", a: "You can clean the lint trap and the first foot or two yourself, but a full vent run to the exterior wall usually requires proper tools to reach lint further down the line." },
      { q: "Does dryer vent cleaning need its own appointment?", a: "It can be booked on its own or bundled with an air duct cleaning visit for convenience." },
    ],
    relatedServices: ["dryer-vent-cleaning", "air-duct-cleaning"],
    relatedLocations: ["lorton"],
  },

  {
    slug: "can-dirty-ducts-cause-dust-throughout-your-home",
    title: "Can Dirty Ducts Contribute to Dust Throughout Your Home?",
    metaTitle: "Can Dirty Ducts Cause Household Dust? | Air Duct Experts",
    description: "If you dust constantly and it never seems to help, your HVAC system might be part of the problem. Here's how dirty ducts contribute to household dust.",
    category: "Indoor Air Quality",
    accent: "teal",
    date: "2026-03-04",
    readMinutes: 5,
    excerpt: "Dusting the same shelf every week and never getting ahead of it? Your air ducts might be recirculating the problem faster than you can clean it.",
    body: [
      p("Household dust comes from a lot of sources — skin cells, fabric fibers, outdoor particles tracked in, pet dander. But if your home feels dusty no matter how often you clean, your HVAC system is worth a look."),
      h2("how-air-moves-dust", "How your HVAC system moves dust around"),
      p("Every time your system runs, it pulls air in through the returns and pushes it back out through the supply vents — cycling the air in your home dozens of times a day. If the ducts, blower, or coil are coated in dust, some of that gets carried along with the air and redistributed through every room the system serves."),
      h2("why-it-feels-endless", "Why dusting never seems to keep up"),
      ul([
        "Surface dust gets wiped away, but the source inside the ductwork keeps producing more",
        "Rooms furthest from the return often show buildup fastest, since air has traveled the most duct distance",
        "Allergy symptoms that ease away from home are a common side effect of this cycle",
        "New dust appears within days of a deep clean, which feels discouraging but points to a system-level cause",
      ]),
      h2("what-actually-helps", "What actually breaks the cycle"),
      p("Cleaning the complete HVAC system — not just the visible vents — removes the buildup that's being recirculated in the first place. It won't stop dust from ever appearing again (that's normal in any home), but it removes one of the biggest hidden contributors many homeowners never think to check."),
      cta(
        "If dust feels endless, let's find out if your system is contributing.",
        "Get My Estimate",
        "/#estimate"
      ),
    ],
    faq: [
      { q: "Will duct cleaning eliminate dust completely?", a: "No cleaning eliminates dust entirely — it's a normal part of any home. But removing buildup from the ducts, blower and coil removes a major recirculating source." },
      { q: "Does a HEPA filter fix this on its own?", a: "A good filter helps capture particles moving through the system, but it doesn't remove buildup already sitting in the ducts, blower or coil — that requires a physical cleaning." },
    ],
    relatedServices: ["indoor-air-quality", "air-duct-cleaning"],
    relatedLocations: ["alexandria"],
  },

  {
    slug: "moving-into-a-new-home-duct-cleaning-checklist",
    title: "Just Bought or Moved Into a New Home? Put Duct Cleaning on Your Checklist",
    metaTitle: "Duct Cleaning Checklist for New Homeowners | Air Duct Experts",
    description: "New home, unknown duct history. Here's why duct cleaning belongs on your move-in checklist, and what to ask the previous owner or your inspector.",
    category: "Homeowner Tips",
    accent: "teal",
    date: "2026-03-11",
    readMinutes: 5,
    excerpt: "Between the movers, the paperwork and the unpacking, duct cleaning is easy to forget. Here's why it deserves a spot near the top of the list.",
    body: [
      p("Moving is chaotic enough without adding more to the list — but a new-to-you home almost always comes with an unknown HVAC and duct history, which makes this one of the easiest times to get ahead of a problem before it becomes familiar background noise."),
      h2("why-new-homes-are-different", "Why a new home is a blank slate"),
      p("Unless the seller or listing specifically mentions it, you likely have no idea when the ducts were last cleaned — or if they ever have been. Previous owners' pets, renovations, smoking history, or simple years of normal use all leave a mark that a walkthrough or standard home inspection doesn't typically catch."),
      h2("what-to-ask", "Questions worth asking before or right after closing"),
      ul([
        "Do you have any records of duct or HVAC system cleaning?",
        "Were there pets in the home, and for how long?",
        "Was any renovation or construction done that could have left dust in the ductwork?",
        "How old is the current HVAC system, and has it had regular maintenance?",
      ]),
      h2("why-timing-matters", "Why sooner is easier than later"),
      p("It's far easier to have ducts cleaned before furniture, rugs and belongings fill the home than after. If you're renovating before move-in, that's also the ideal window — construction dust is one of the most common reasons for a needed cleaning, and doing it before you've unpacked means you're not cleaning around your own things."),
      cta(
        "New home, new estimate — let's figure out what your system needs.",
        "Get My Estimate",
        "/#estimate"
      ),
    ],
    faq: [
      { q: "Should I clean ducts before or after moving furniture in?", a: "Before, if possible. It's easier for the technician to access every register and vent without furniture and belongings in the way." },
      { q: "Does a home inspection cover duct cleanliness?", a: "Typically not in detail. Most standard home inspections focus on system function rather than internal duct condition, which is why a separate look is worthwhile." },
    ],
    relatedServices: ["air-duct-cleaning", "carpet-cleaning"],
    relatedLocations: ["stafford"],
  },

  {
    slug: "pet-owners-guide-to-cleaner-ducts-and-carpets",
    title: "Pet Owners: How Air Ducts and Carpets Collect More Than Just Dust",
    metaTitle: "Pet Owners' Guide to Ducts & Carpets | Air Duct Experts",
    description: "Pet hair, dander and odor don't just settle on the couch — they end up in your ductwork and deep in carpet fibers. Here's what pet owners should know.",
    category: "Homeowner Tips",
    accent: "teal",
    date: "2026-03-18",
    readMinutes: 5,
    excerpt: "If you have pets, your HVAC system and carpets are working harder than you think. Here's where dander and odor actually end up.",
    body: [
      p("Pets are part of the family — but their hair, dander, and the occasional accident don't stay confined to their favorite spots. Two places pet owners consistently underestimate are the HVAC system and the carpet padding underneath the fibers you can see."),
      h2("where-dander-actually-goes", "Where pet dander actually ends up"),
      p("Airborne dander gets pulled into your HVAC returns along with everything else circulating through the house. Over time, it settles in the ductwork, the blower, and on the evaporator coil — right alongside regular household dust. That means a home with pets often benefits from duct cleaning on a shorter interval than a pet-free home."),
      h2("carpets-and-odor", "Why carpet odor treatment is separate from a standard cleaning"),
      ul([
        "Standard carpet cleaning addresses surface dirt and general wear",
        "Pet stains and odor often sink into the padding underneath, not just the visible fibers",
        "A standard cleaning can leave a stain looking better while the odor source remains",
        "Dedicated pet stain and odor treatment targets that underlying source directly",
      ]),
      h2("a-simple-plan", "A simple maintenance plan for pet households"),
      p("Consider air duct cleaning somewhat more frequently than the general recommendation if shedding is heavy, and treat carpet pet stains and odor as soon as they happen rather than waiting for a general cleaning. Bundling carpet cleaning with pet treatment and a duct cleaning in the same visit is often the most convenient way to handle all of it at once."),
      cta(
        "Ask about bundling duct cleaning with pet stain and odor treatment.",
        "Get My Estimate",
        "/#estimate"
      ),
    ],
    faq: [
      { q: "Do pet households need duct cleaning more often?", a: "Often yes — heavy shedding means more dander circulating through the system, which can mean buildup happens faster than in a pet-free home." },
      { q: "Can carpet cleaning fully remove pet odor?", a: "Standard cleaning helps, but odor that has reached the padding usually needs dedicated pet stain and odor treatment to address the actual source." },
    ],
    relatedServices: ["carpet-cleaning", "upholstery-cleaning", "air-duct-cleaning"],
    relatedLocations: ["arlington"],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, count);
}
