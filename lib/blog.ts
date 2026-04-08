export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  sections: Array<{
    heading: string;
    body: string[];
    metrics?: string[];
  }>;
}

const blogPosts: BlogPost[] = [
  {
    slug: "how-credex-reviews-syndicators",
    title: "How Credex Reviews Syndicators",
    publishedAt: "2026-03-29",
    summary:
      "Our review process is a weighted scorecard with explicit metrics: return quality, leverage discipline, execution variance, and reporting reliability.",
    sections: [
      {
        heading: "1) Source stack and data confidence",
        body: [
          "Every metric must map to source evidence: settlement statements, distribution ledgers, loan docs, operating statements, and capital event notices.",
          "Each field gets a confidence level. Level A is directly evidenced from a primary source. Level B is triangulated from two consistent sponsor sources. Level C is sponsor-asserted and explicitly labeled.",
          "Confidence coverage itself is a metric. Profiles with less than 80% Level A/B coverage do not receive a high-confidence publication flag.",
        ],
        metrics: [
          "Evidence coverage ratio = high-confidence fields / total published fields",
          "Primary source ratio = fields supported by primary docs / total fields",
          "Attribution completeness = attributed projects / total reported projects",
        ],
      },
      {
        heading: "2) Return quality score (35% weight)",
        body: [
          "We evaluate realized IRR, equity multiple, annualized cash yield, and the distribution profile (early versus back-ended cash flow).",
          "Core formulas include: IRR, MOIC, cash yield by year, and paid-in to distributed capital ratio to separate realized value from paper marks.",
          "Penalty rules: a sponsor with IRR above cohort median can still lose score if cash yield persistence is weak or if outcomes depend on one outlier exit.",
          "Cohort normalization: strategies are compared against strategy peers over similar hold periods. Value-add is never benchmarked against core as if risk were equivalent.",
        ],
        metrics: [
          "Realized IRR (deal-level and sponsor median)",
          "MOIC / Equity Multiple",
          "Annualized cash yield by year",
          "DPI and TVPI-style realized versus unrealized split",
          "Return concentration index = % total gains from top 1-2 exits",
        ],
      },
      {
        heading: "3) Leverage and debt resilience score (25% weight)",
        body: [
          "Key metrics: entry LTC, stabilized LTV, DSCR at underwriting and actual, fixed versus floating debt share, and weighted average debt cost.",
          "Stress metrics: DSCR under +100 bps and +200 bps rate shocks, and refinance proceeds versus remaining principal at projected exit cap plus 50 bps.",
          "Red-flag thresholds include repeated sub-1.20x DSCR periods, refinance dependence on optimistic cap compression, and heavy floating-rate exposure without hedging.",
          "Debt discipline is scored separately so cyclical tailwinds do not mask structural financing risk.",
        ],
        metrics: [
          "Entry LTC and stabilized LTV",
          "DSCR: underwritten, actual, and stressed",
          "Floating-rate debt share and hedge coverage",
          "Weighted average debt cost",
          "Refinance coverage ratio under stressed exit assumptions",
        ],
      },
      {
        heading: "4) Execution variance score (25% weight)",
        body: [
          "We track plan-versus-actual deltas: occupancy, blended rent growth, NOI margin, bad debt, concession load, and capex per unit.",
          "Primary reliability metric: percentage of quarters within underwriting tolerance. Standard tolerance bands are +/-2% for occupancy and +/-5% for NOI.",
          "Timeline metrics: business-plan completion lag (months), hold-period drift, and refinance/disposition timing variance.",
          "Sponsors with repeated variance clustering in downside periods are scored lower even if final project-level returns still look acceptable.",
        ],
        metrics: [
          "Occupancy variance (actual minus underwritten)",
          "NOI variance and NOI margin drift",
          "Rent growth variance and concession drift",
          "Capex per unit variance",
          "Schedule variance: actual hold period minus underwritten hold period",
        ],
      },
      {
        heading: "5) Reporting quality score (15% weight)",
        body: [
          "Reporting is measured with objective cadence and completeness metrics: on-time report rate, KPI field completeness, and update latency after adverse events.",
          "A quarterly process benchmark is 95% on-time delivery and inclusion of occupancy, collections, NOI bridge, variance commentary, and debt covenant status.",
          "The final profile displays the weighted score and highlights the two strongest and two weakest dimensions for faster investor diligence.",
        ],
        metrics: [
          "On-time reporting rate",
          "KPI completeness score",
          "Adverse event disclosure latency (days)",
          "Variance commentary coverage ratio",
        ],
      },
    ],
  },
  {
    slug: "what-we-verify-before-a-profile-goes-live",
    title: "What We Verify Before a Profile Goes Live",
    publishedAt: "2026-03-28",
    summary:
      "Before publication, profiles pass hard verification gates across identity, attribution, metric reconciliation, and assumption realism.",
    sections: [
      {
        heading: "1) Identity and control checks",
        body: [
          "We map legal entities, guarantors, key principals, and decision authority by investment period. Attribution must tie to who actually controlled underwriting and asset-level decisions.",
          "Attribution confidence is quantified: sponsor-led, shared-control, or minority-role. Shared and minority roles are disclosed so performance is not over-attributed.",
        ],
        metrics: [
          "Control attribution coverage across reported track record",
          "Sponsor-led vs shared-control deal mix",
          "Unattributed outcome percentage",
        ],
      },
      {
        heading: "2) Core KPI reconciliation protocol",
        body: [
          "We reconcile realized IRR, MOIC, cash yield, hold period, fee load, write-down incidence, and realized loss ratio across every available source file.",
          "Tolerance rules: monetary line items must reconcile within 0.5%; ratio fields within 20 bps unless source timing explains the spread.",
          "If a metric fails reconciliation, publication is blocked until corrected evidence or an explicit variance memo is provided.",
          "We never blend conflicting numbers into a single average. The discrepancy is either resolved or surfaced.",
        ],
        metrics: [
          "Reconciliation pass rate by metric family",
          "Monetary reconciliation tolerance: <= 0.5%",
          "Ratio reconciliation tolerance: <= 20 bps",
          "Open variance count at publication time",
        ],
      },
      {
        heading: "3) Underwriting realism tests",
        body: [
          "We compare underwritten assumptions to market history and realized outcomes: rent CAGR, expense growth, bad debt, and exit cap movement.",
          "Base stress pack includes: +150 bps debt cost, -500 bps occupancy, +10% opex shock, and +75 bps exit cap expansion.",
          "Pass criteria require positive DSCR and no forced capital call under stress unless clearly disclosed as part of strategy.",
          "This keeps the review focused on survival and durability, not just upside narratives.",
        ],
        metrics: [
          "Stressed DSCR at +150 bps debt cost",
          "NOI coverage under occupancy and opex stress",
          "Refinance viability under cap expansion",
          "Capital call probability under stress scenarios",
        ],
      },
      {
        heading: "4) Publication gates and confidence labels",
        body: [
          "Publication gate A: minimum 80% high-confidence (Level A/B) metric coverage.",
          "Publication gate B: no unresolved reconciliation failures on core return or leverage fields.",
          "Publication gate C: complete attribution and control mapping across the reported track record window.",
          "Profiles are labeled High, Moderate, or Limited confidence so investors can calibrate how much evidentiary weight to place on each metric set.",
        ],
        metrics: [
          "High-confidence coverage threshold: >= 80%",
          "Unresolved critical variance count: must be 0",
          "Attribution completeness threshold: 100% for reported projects",
        ],
      },
    ],
  },
  {
    slug: "why-we-prioritize-comparison-over-promotion",
    title: "Why We Prioritize Comparison Over Promotion",
    publishedAt: "2026-03-27",
    summary:
      "Investor decisions improve when operators are compared with standardized, falsifiable metrics instead of narrative-heavy marketing decks.",
    sections: [
      {
        heading: "1) The comparability problem in syndication",
        body: [
          "Two sponsors can both report 17% IRR with very different risk paths. One may have 1.45x average DSCR and stable cash yield, while another may show 1.10x coverage and high refinance dependence.",
          "Standardized fields solve this by forcing apples-to-apples comparison on return quality, leverage resilience, and variance behavior.",
          "Core comparison set: realized IRR, MOIC, loss ratio, DSCR distribution, NOI variance, hold-period drift, and reporting timeliness.",
        ],
        metrics: [
          "Realized IRR and MOIC",
          "Loss ratio / impairment frequency",
          "DSCR distribution over hold period",
          "NOI and occupancy variance bands",
          "Reporting timeliness score",
        ],
      },
      {
        heading: "2) Books that shaped our methodology",
        body: [
          "The Hands-Off Investor by Brian Burke is useful for LP framing: manager selection, risk controls, and sponsor vetting discipline.",
          "The Best Ever Apartment Syndication Book by Joe Fairless and Theo Hicks helps decode sponsor process and role structure, which improves profile interpretation.",
          "What Every Real Estate Investor Needs to Know About Cash Flow by Frank Gallinelli sharpens our cash-flow-first reading of sponsor claims and stress assumptions.",
          "Investing in Real Estate Private Equity by Sean Cook and Mauricio Rauld informs how we evaluate governance, alignment, and structure in sponsor-led vehicles.",
          "The Real Estate Game by Peter Linneman reinforces our emphasis on separating process quality from cyclical luck when judging operators.",
        ],
      },
      {
        heading: "3) A practical investor scorecard you can run in 15 minutes",
        body: [
          "Step 1: Filter for return durability. Look for realized IRR and MOIC supported by recurring cash distributions, not just terminal-event gains.",
          "Step 2: Check leverage discipline. Review median DSCR, floating-rate exposure, and refinance break-even assumptions.",
          "Step 3: Evaluate execution reliability. Use NOI and occupancy variance bands across projects and across tougher market windows.",
          "Step 4: Audit reporting behavior. On-time reporting rate below 90% is usually a meaningful governance signal.",
          "Step 5: Build a call agenda from weak metrics. Ask directly about the two largest variances and the controls added after those misses.",
        ],
        metrics: [
          "Return durability: IRR, MOIC, cash yield consistency",
          "Debt discipline: median DSCR, floating-rate share, hedge ratio",
          "Execution reliability: NOI variance and schedule drift",
          "Governance: on-time reporting rate and KPI completeness",
        ],
      },
    ],
  },
];

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
