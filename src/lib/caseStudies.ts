export interface CaseStudyData {
  slug: string;
  client: string;
  category: string;
  problem: string;
  built: string[];
  metric: number | null;
  metricLabel: string | null;
  serviceTags: string[];
  testimonial: {
    text: string;
    attribution: string;
    rating: number;
    draft: boolean;
  } | null;
  heroAssetUrl: string | null;
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    slug: "bidwyz",
    client: "BidWyz",
    category: "Web App Development, AI Integration",
    problem: "An online auction marketplace needed to differentiate from generic bidding sites by making the bidding experience itself feel intelligent rather than just a countdown timer.",
    built: [
      "Full AI-assisted online auction marketplace covering both buyer and seller sides.",
      "AI recommendation/matching engine that learns from bidding behavior and surfaces relevant auctions.",
      "Advanced bidding system: proxy bidding, real-time updates, automatic auction-extension logic.",
      "AI-driven smart alerts — personalized notifications instead of blanket broadcast emails.",
      "Trust and security layer: Stripe payments, seller verification, fraud-detection baked in.",
      "Workflow automation across the listing-to-close pipeline with analytics dashboard.",
      "Modular, cloud-native architecture for volume growth without re-platform.",
      "Tiered pricing model (free entry tier, paid scaling tiers) supporting the product's own GTM.",
    ],
    metric: null,
    metricLabel: null,
    serviceTags: ["app-development", "ai-integration"],
    testimonial: {
      text: "We didn't want another auction site — we wanted bidding to feel guided. Core829 built the AI layer and the whole marketplace end to end, and the recommendation engine genuinely surprises our beta users in a good way. There are still a few workflow edges we're refining together post-launch.",
      attribution: "Andrei, Founder",
      rating: 4.7,
      draft: true,
    },
    heroAssetUrl: null,
  },
  {
    slug: "winex-advance",
    client: "Winex Advance",
    category: "Custom Web Design, Corporate Site",
    problem: "A PVC/aluminium/wood window-and-door manufacturer with genuine multi-decade production experience needed a site that read as technically credible across three markets.",
    built: [
      "Trilingual (English/Italian/French) corporate site reflecting materials expertise without stock-photo territory.",
      "Clear three-step process narrative (Order → Realization → Distribution) turning manufacturing into a trust-building story.",
      "Dedicated sections separating brand story, technical About Us, and Joinery deep-dive.",
      "Contact and quotation-request path capturing real project specifics up front.",
      "Multi-language routing at the infrastructure level for fully localized market experiences.",
    ],
    metric: null,
    metricLabel: null,
    serviceTags: ["web-design"],
    testimonial: {
      text: "Our old site looked like every other joinery contractor page. Core829 rebuilt it so it actually reflects the technical side of what we do, in three languages, and quote requests come in with the right details already attached instead of a back-and-forth email chain.",
      attribution: "Marius, Winex Advance",
      rating: 4.65,
      draft: true,
    },
    heroAssetUrl: null,
  },
  {
    slug: "kranely",
    client: "Kranely",
    category: "Custom App Development, Business Automation",
    problem: "Window/door installation businesses were running quotes, supplier coordination, job-site tracking, and payment collection across disconnected tools with no single source of truth.",
    built: [
      "Unified management platform consolidating quote generation, supplier relationships, job-site tracking, and payment status.",
      "Quote-to-job pipeline so estimates flow directly into trackable project records.",
      "Supplier-side visibility for coordinated material ordering and job scheduling.",
      "Payment tracking tied to job-site milestones, closing the work-to-invoice loop.",
      "Mobile-usable by design for installers working on job sites.",
    ],
    metric: null,
    metricLabel: null,
    serviceTags: ["app-development", "business-automation"],
    testimonial: {
      text: "Before this, tracking which job was actually paid meant checking three different places. Now it's one screen. It's not flashy — it just works, and that's exactly what we needed.",
      attribution: "Cristian, Kranely",
      rating: 4.8,
      draft: true,
    },
    heroAssetUrl: null,
  },
  {
    slug: "pvc-aluminium-joinery-calculator",
    client: "PVC & Aluminium Joinery Calculator",
    category: "Custom Web Design, App Development, B2B2C Systems",
    problem: "A joinery supplier needed a way to sell through dealers at different price tiers while still letting end clients configure and price their own windows/doors instantly.",
    built: [
      "Single platform serving three permission-scoped roles: Supplier (full admin), Dealer (special pricing, auto commission), Client (visual configurator, instant pricing).",
      "Real-time visual configurator letting end clients build specifications and see instant accurate pricing including transport and installation.",
      "Automatic PDF quote generation at every tier.",
      "Commission logic computed automatically as dealer-tier sales close.",
      "Full audit/reporting and data-backup controls at the supplier level.",
    ],
    metric: null,
    metricLabel: null,
    serviceTags: ["web-design", "app-development", "b2b-systems"],
    testimonial: {
      text: "We needed one system that could be strict about pricing for us as the supplier, flexible for our dealers, and dead simple for the end customer. Getting all three of those right in one tool, without it feeling like three different apps stitched together, was the hard part — and it delivered.",
      attribution: "Founder, PVC & Aluminium Joinery Calculator",
      rating: 4.75,
      draft: true,
    },
    heroAssetUrl: null,
  },
  {
    slug: "iwhome",
    client: "IWHome",
    category: "Custom App Development, B2B/B2C Platform, Workflow Automation",
    problem: "A home renovation and materials business needed to manage the full journey from client request through design, supplier coordination, and production across different user types.",
    built: [
      "Role-based platform with five distinct permission levels (admin, supplier, collaborator, client, base user).",
      "Structured multi-step workflow carrying renovation projects from request through to production unlock.",
      "Split-payment handling with mandatory proof-of-payment upload gating production stages.",
      "Automatic PDF generation for proposals/contracts at relevant workflow stages.",
      "Renovation cost calculator for immediate structured cost estimates.",
      "Public-facing brand experience integrated with the operational management system.",
    ],
    metric: null,
    metricLabel: null,
    serviceTags: ["app-development", "b2b-platform", "workflow-automation"],
    testimonial: {
      text: "Renovation projects fail in the gaps — between the client, the supplier, and whoever's actually on site. This system closes most of those gaps: everyone sees the same project status, and payments are verified before production moves, which alone solved a recurring headache for us.",
      attribution: "Operations Lead, IWHome",
      rating: 4.9,
      draft: true,
    },
    heroAssetUrl: null,
  },
  {
    slug: "core829-crm",
    client: "Core829 CRM",
    category: "CRM Creation, Internal Systems",
    problem: "Core829 itself needed a CRM structured around how it actually sells (lead → pipeline → client) and organizes people, rather than bending a generic off-the-shelf CRM into that shape.",
    built: [
      "Purpose-built CRM enforcing strict organizational hierarchy (Company → Work Group → Team → Salesperson) at the architecture level.",
      "Full pipeline management from lead contact through qualification to closed client, with geographic lead mapping.",
      "Structured onboarding sequence and in-app tooltip system for non-technical team members.",
      "Italian-localized throughout reflecting Core829's operating market.",
      "Liquid glass visual treatment for a daily-use product the team actually enjoys opening.",
    ],
    metric: null,
    metricLabel: null,
    serviceTags: ["crm", "internal-systems"],
    testimonial: {
      text: "We built our own CRM the same way we build one for clients: around how the business actually sells, not around what a generic template assumes.",
      attribution: "Core829",
      rating: 0,
      draft: false,
    },
    heroAssetUrl: null,
  },
];
