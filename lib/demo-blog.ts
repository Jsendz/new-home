// Shared demo data — no "use client" so it can be imported by both
// server components (page.tsx) and client components (BlogPreview.tsx)

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  readTime: number;
  mainImage?: string;
  author?: { name: string; role?: string; photo?: string };
  body?: string[];
}

export const DEMO_POSTS: BlogPost[] = [
  {
    _id: "1",
    title: "5 Things to Look for When Buying Your First Home",
    slug: { current: "first-home-buying-tips" },
    publishedAt: "2026-03-20",
    excerpt: "From neighborhood research to hidden costs, here's what seasoned buyers wish they knew before signing.",
    readTime: 6,
    mainImage: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&q=80",
    author: { name: "Emily Shaw", role: "Senior Property Consultant", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
    body: [
      "Buying your first home is exciting, but it's easy to get swept up in curb appeal and miss the details that matter most a year from now. Before you make an offer, slow down and look past the fresh paint.",
      "Start with the neighborhood, not the house. Drive through at different times of day, check commute times, and look up the school district even if you don't have kids — it affects resale value. A great house on the wrong street is still the wrong house.",
      "Next, budget for the costs nobody mentions at the open house: closing costs, moving expenses, an emergency repair fund, and property taxes that may reset to full assessed value after the sale. A good rule of thumb is to keep 1–3% of the home's value set aside annually for maintenance.",
      "Always get a full inspection, even on new construction. Roof age, HVAC condition, and foundation issues are the three most expensive surprises first-time buyers run into, and all three are catchable before closing.",
      "Finally, get pre-approved — not just pre-qualified — before you start touring. In a competitive market, a pre-approval letter is what lets you move fast when the right home comes along.",
    ],
  },
  {
    _id: "2",
    title: "Alaska Real Estate: Market Trends for 2026",
    slug: { current: "alaska-market-trends-2026" },
    publishedAt: "2026-02-14",
    excerpt: "Interest rates have stabilized and inventory is picking up. Here's what buyers and sellers can expect this year.",
    readTime: 8,
    mainImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    author: { name: "Tom Ridley", role: "Lead Market Analyst", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    body: [
      "After two volatile years, Alaska's housing market is settling into a more predictable rhythm. Mortgage rates have leveled off, and that stability alone has drawn buyers who were sitting on the sidelines back into the market.",
      "Inventory across the Mat-Su Valley and Anchorage metro is up modestly compared to last year, giving buyers more room to negotiate than they've had since before the pandemic — though well-priced homes in Wasilla and Palmer are still moving in under two weeks.",
      "Sellers should expect longer days-on-market than the frenzy of a few years ago, but pricing accurately from day one still matters more than ever: overpriced listings are sitting, while realistically priced homes are seeing multiple offers.",
      "For buyers, this is the most balanced the market has felt in years. It's still competitive at the entry-level price points, but there's finally room to negotiate on inspection repairs and closing costs on mid-to-upper tier homes.",
    ],
  },
  {
    _id: "3",
    title: "How to Stage Your Home for a Faster, Higher Sale",
    slug: { current: "home-staging-tips" },
    publishedAt: "2026-01-30",
    excerpt: "Small changes — the right lighting, decluttering, a fresh coat of paint — can add tens of thousands to your sale price.",
    readTime: 5,
    mainImage: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80",
    author: { name: "Sarah Connors", role: "Founder & Lead Agent", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b8c4?w=200&q=80" },
    body: [
      "Staging isn't about hiding what's wrong with a home — it's about helping buyers picture themselves living in it. And the data backs it up: staged homes consistently sell faster and closer to asking price than unstaged ones.",
      "Start with decluttering and depersonalizing. Buyers need to imagine their own life in the space, which is hard to do surrounded by someone else's family photos and collections. Clear countertops, closets, and shelves to about half their normal contents.",
      "Light is the cheapest upgrade you can make. Swap dim or mismatched bulbs for consistent, bright, warm-white lighting throughout, and open every curtain before a showing or photo session.",
      "A fresh coat of neutral paint in the entryway and main living areas is one of the highest-return changes you can make before listing — it reads as 'move-in ready' even in an older home.",
      "Finally, don't skip the exterior. The first seven seconds of a showing happen at the curb. A trimmed lawn, a clean walkway, and a freshly painted front door do more for a first impression than almost anything you can do indoors.",
    ],
  },
];
