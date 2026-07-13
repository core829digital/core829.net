export interface Testimonial {
  rating: number;
  text: string;
  attribution: string;
  draft?: boolean;
}

export interface CaseStudyData {
  slug: string;
  client: string;
  category: string;
  problem: string;
  built: string[];
  summary: string;
  metric: number;
  metricLabel: string;
  heroAssetUrl?: string;
  gallery: string[];
  serviceTags: string[];
  content: string;
  published: boolean;
  testimonial?: Testimonial;
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    slug: "bidwyz",
    client: "Bidwyz",
    category: "Procurement",
    problem: "Manual supplier sourcing was slow and opaque.",
    built: ["Reverse auction engine", "Supplier qualification pipeline", "Real-time bid dashboard", "Procurement analytics suite"],
    summary: "Reverse auction platform connecting procurement teams with qualified suppliers.",
    metric: 340,
    metricLabel: "Suppliers onboarded",
    serviceTags: ["Web Application", "Fullstack"],
    content: "Full case study content for Bidwyz.",
    gallery: [],
    published: true,
    testimonial: { rating: 4.8, text: "Transformed our procurement workflow.", attribution: "CPO, Bidwyz" },
  },
  {
    slug: "winex-advance",
    client: "Winex Advance",
    category: "Inventory",
    problem: "Wine inventory tracking was fragmented across spreadsheets.",
    built: ["Wine catalog with 1200+ varieties", "Inventory tracking system", "Supplier integration API", "Analytics dashboard"],
    summary: "Advanced wine trading and inventory management platform.",
    metric: 1200,
    metricLabel: "Wine varieties cataloged",
    serviceTags: ["Web Application", "Data Engineering"],
    content: "Full case study content for Winex Advance.",
    gallery: [],
    published: true,
    testimonial: { rating: 4.6, text: "Finally, a system that understands wine.", attribution: "Operations Director, Winex Advance" },
  },
  {
    slug: "kranely",
    client: "Kranely",
    category: "Marketplace",
    problem: "Matching crane operators to job sites was inefficient.",
    built: ["Operator matching algorithm", "Booking and scheduling system", "Real-time availability tracking", "Mobile app for operators"],
    summary: "Crane rental marketplace connecting operators with construction sites.",
    metric: 85,
    metricLabel: "Active operators",
    serviceTags: ["Web Application", "UI/UX Design"],
    content: "Full case study content for Kranely.",
    gallery: [],
    published: true,
    testimonial: { rating: 4.9, text: "Our utilization rate doubled.", attribution: "CEO, Kranely" },
  },
  {
    slug: "outlier",
    client: "Outlier",
    category: "Analytics",
    problem: "Business intelligence was locked in static reports.",
    built: ["Real-time data pipeline", "Interactive dashboard builder", "AI-powered insight engine", "Export and scheduling system"],
    summary: "AI-powered data analytics platform for business intelligence.",
    metric: 50000,
    metricLabel: "Data points processed daily",
    serviceTags: ["Frontend", "UI/UX Design"],
    content: "Full case study content for Outlier.",
    gallery: [],
    published: true,
    testimonial: { rating: 4.7, text: "Actionable insights in real-time.", attribution: "Head of Data, Outlier" },
  },
  {
    slug: "zelo",
    client: "Zelo",
    category: "Logistics",
    problem: "Urban delivery coordination was chaotic and slow.",
    built: ["Route optimization engine", "Real-time tracking system", "Delivery partner mobile app", "Customer notification system"],
    summary: "Delivery logistics optimization platform for urban areas.",
    metric: 98,
    metricLabel: "On-time delivery rate",
    serviceTags: ["Web Application", "Mobile App"],
    content: "Full case study content for Zelo.",
    gallery: [],
    published: true,
    testimonial: { rating: 4.5, text: "Delivery times cut in half.", attribution: "Operations Lead, Zelo" },
  },
  {
    slug: "airlaw",
    client: "Airlaw",
    category: "Legal",
    problem: "Aviation legal documents were scattered across systems.",
    built: ["Document management system", "Version control and approval workflow", "Client portal", "Compliance tracking dashboard"],
    summary: "Legal document management system for aviation industry.",
    metric: 1500,
    metricLabel: "Documents processed",
    serviceTags: ["Web Application", "Fullstack"],
    content: "Full case study content for Airlaw.",
    gallery: [],
    published: true,
  },
  {
    slug: "ml-inference",
    client: "ML Inference",
    category: "AI/ML",
    problem: "Real-time ML predictions needed a scalable API.",
    built: ["RESTful inference API", "Model versioning system", "Performance monitoring dashboard", "Auto-scaling infrastructure"],
    summary: "Machine learning inference API for real-time predictions.",
    metric: 99.9,
    metricLabel: "Uptime percentage",
    serviceTags: ["Backend", "AI/ML"],
    content: "Full case study content for ML Inference.",
    gallery: [],
    published: true,
  },
];
