export const BRAND = {
  name: "Core829",
  tagline: "Build it. Rent it. Run it.",
  email: "hello@core829.net",
  phone: "",
  timezone: "Europe/Rome",
  social: {
    github: "https://github.com/core829",
    linkedin: "https://linkedin.com/company/core829",
    twitter: "https://x.com/core829",
    instagram: "https://instagram.com/core829",
    youtube: "https://youtube.com/@core829",
    facebook: "https://facebook.com/core829",
    threads: "https://threads.net/@core829",
  },
} as const;

export interface ServiceData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  numeral: string;
  description: string;
  diagram: string;
  category: string;
  problem: {
    title: string;
    description: string;
    pains: string[];
  };
  solution: {
    title: string;
    description: string;
    benefits: { label: string; desc: string }[];
  };
  features: { label: string; desc: string }[];
  faq: { q: string; a: string }[];
}

export const SERVICES: ServiceData[] = [
  {
    id: "rent-webapps",
    slug: "rent-webapps",
    name: "Rent-a-WebApp",
    tagline: "Pre-built tools, monthly license — no build wait, no dev overhead.",
    numeral: "01",
    description:
      "Production-ready web applications licensed by the month. Booking systems, inventory trackers, invoicing tools, review aggregators — pick what you need, use it today, cancel anytime. Hosting, updates, and support included.",
    diagram: "dashboard-plug",
    category: "product",
    problem: {
      title: "The problem with off-the-shelf software",
      description:
        "Most businesses need specialized tools — booking systems, inventory managers, invoicing platforms — but the options are frustrating.",
      pains: [
        "Off-the-shelf SaaS charges per-seat pricing that grows faster than your team.",
        "Custom development takes months and costs tens of thousands upfront.",
        "Free tools lack features, break without warning, and offer zero support.",
        "You're locked into annual contracts for software that barely fits your workflow.",
        "Every tool handles one thing well but nothing talks to each other.",
      ],
    },
    solution: {
      title: "Enterprise tools at a fraction of the cost",
      description:
        "Rent production-grade web apps by the month. No build wait, no dev team required, no long-term commitment.",
      benefits: [
        { label: "Monthly license", desc: "Predictable cost, cancel anytime. No annual lock-in." },
        { label: "Hosted & maintained", desc: "We handle servers, updates, security patches, and backups." },
        { label: "Use it today", desc: "Most apps are ready to deploy within hours, not weeks." },
        { label: "Support included", desc: "Direct Slack channel with the team that built it." },
      ],
    },
    features: [
      { label: "Booking systems", desc: "Appointment scheduling, resource booking, calendar sync." },
      { label: "Inventory trackers", desc: "Real-time stock management with low-stock alerts and reporting." },
      { label: "Invoicing tools", desc: "Generate invoices, track payments, send reminders automatically." },
      { label: "Review aggregators", desc: "Centralize reviews from Google, Facebook, and industry platforms." },
      { label: "Custom dashboards", desc: "Visualize your metrics in one place without building from scratch." },
    ],
    faq: [
      { q: "Can I request custom features?", a: "Yes. If the base app doesn't cover your workflow, we quote feature additions separately. Many clients start with the base and add custom modules over time." },
      { q: "What happens if I cancel?", a: "You keep your data. We export everything in a standard format within 48 hours of cancellation." },
      { q: "Do you offer discounts for multiple apps?", a: "Yes. Bundled licensing is available for teams using two or more apps. Contact us for a quote." },
    ],
  },
  {
    id: "web-design",
    slug: "web-design",
    name: "Custom Web Design",
    tagline: "Sites built to perform, not just to exist.",
    numeral: "02",
    description:
      "Full-stack web design and development tailored to your business. From marketing sites to complex web applications — responsive, accessible, conversion-optimised, and built to rank. No templates, no shortcuts.",
    diagram: "wireframe-assemble",
    category: "service",
    problem: {
      title: "A website should work as hard as your team",
      description:
        "Too many businesses settle for a site that looks fine but delivers nothing — low conversion, slow load times, impossible to update.",
      pains: [
        "Template sites look like every competitor in your space — no differentiation.",
        "PageSpeed scores in the red cost you rankings and customers.",
        "No CMS or locked into a proprietary editor you hate using.",
        "Mobile experience was clearly an afterthought — tiny text, broken layouts.",
        "Contact forms lose submissions, analytics isn't set up, and you have no idea who's visiting.",
      ],
    },
    solution: {
      title: "Built for speed, conversions, and full ownership",
      description:
        "Every site is hand-crafted with performance baked in from the first line of code. You get a site that ranks, converts, and you can actually update.",
      benefits: [
        { label: "Performance-first", desc: "Sub-second load times, 90+ Lighthouse scores, Core Web Vitals compliant." },
        { label: "Conversion architecture", desc: "Every layout decision tested against a clear funnel, not designer preference." },
        { label: "Full ownership", desc: "No proprietary builders. You get the source code, full edit access, zero lock-in." },
        { label: "Accessibility built in", desc: "WCAG 2.2 AA compliant as standard, not as an expensive retrofit." },
      ],
    },
    features: [
      { label: "Responsive design", desc: "Pixel-perfect across every device breakpoint." },
      { label: "SEO architecture", desc: "Semantic HTML, structured data, meta automation, and sitemap generation." },
      { label: "Headless or traditional CMS", desc: "Sanity, Strapi, WordPress, or no CMS — pick your edit experience." },
      { label: "Analytics integration", desc: "Privacy-compliant tracking with actionable dashboards from day one." },
      { label: "Performance optimization", desc: "Image optimization, code splitting, CDN distribution, caching strategy." },
    ],
    faq: [
      { q: "Do you redesign existing sites?", a: "Yes. We audit your current site's performance, content structure, and conversion gaps before proposing a redesign scope." },
      { q: "Can I edit the site myself?", a: "Yes. We build with a CMS or markdown-based workflow depending on your technical comfort. We also provide a handover guide." },
      { q: "How long does a typical project take?", a: "Marketing sites: 3-5 weeks. Web applications: 6-12 weeks depending on complexity." },
    ],
  },
  {
    id: "app-development",
    slug: "app-development",
    name: "Custom App Development",
    tagline: "Cross-platform apps from a single codebase.",
    numeral: "03",
    description:
      "iOS, Android, and web applications built simultaneously from shared logic. React Native, Flutter, or PWA — we pick the right stack for your use case, not our convenience.",
    diagram: "phone-browser",
    category: "service",
    problem: {
      title: "Building for every platform is expensive",
      description:
        "Native development for iOS and Android means two separate teams, two codebases, and essentially double the cost — most businesses can't justify it.",
      pains: [
        "Hiring separate iOS and Android teams doubles your engineering budget.",
        "Maintaining two codebases means every feature ships twice — or breaks on one platform.",
        "PWAs are great for content but can't access native hardware features reliably.",
        "Most cross-platform frameworks produce apps that feel sluggish compared to native.",
        "By the time you launch on both platforms, your market window has closed.",
      ],
    },
    solution: {
      title: "One codebase, two app stores, daily builds",
      description:
        "We build shared logic that renders natively on every platform. Features ship simultaneously, performance matches native, and you pay for one codebase.",
      benefits: [
        { label: "Single codebase", desc: "iOS, Android, and sometimes web from one TypeScript or Dart project." },
        { label: "Native performance", desc: "No WebView wrappers — actual native rendering on every target." },
        { label: "Unified features", desc: "Every feature ships to all platforms simultaneously." },
        { label: "Cost efficiency", desc: "Approximately 40-50% savings vs. separate native teams." },
      ],
    },
    features: [
      { label: "Cross-platform architecture", desc: "React Native or Flutter with shared business logic layers." },
      { label: "Native module integration", desc: "Camera, GPS, Bluetooth, biometrics, push notifications on all platforms." },
      { label: "Offline-first design", desc: "Local storage with background sync for unreliable connectivity." },
      { label: "CI/CD pipelines", desc: "Automated builds, test runs, and app store submissions." },
      { label: "App store deployment", desc: "Full Apple Developer and Google Play Console setup and submission." },
    ],
    faq: [
      { q: "Can you build on existing apps?", a: "Yes. We can audit your current codebase and add features, refactor, or rebuild specific screens without rewriting the whole app." },
      { q: "How do you handle push notifications?", a: "We integrate Firebase Cloud Messaging (Android) and APNs (iOS) through a unified service layer, so your server sends one payload to both platforms." },
      { q: "Do you support app store compliance?", a: "Yes. We handle Apple's App Review guidelines and Google Play policies including privacy manifests, data disclosure, and compliance documentation." },
    ],
  },
  {
    id: "executable-software",
    slug: "executable-software",
    name: "Custom Executable Software",
    tagline: "Native Windows and Mac applications for real workflows.",
    numeral: "04",
    description:
      "Desktop software for industries that can't run on a browser. Point-of-sale, offline-capable tools, automation scripts, installer-packaged applications with auto-update infrastructure.",
    diagram: "window-chrome",
    category: "service",
    problem: {
      title: "Some workflows can't live in a browser",
      description:
        "Manufacturing floors, retail counters, warehouses, and medical offices need software that works offline, talks to hardware, and runs reliably without a Wi-Fi signal.",
      pains: [
        "Web apps fail when the internet drops — and your operations can't wait for connectivity.",
        "POS systems, barcode scanners, and receipt printers require native hardware access browsers can't provide.",
        "Off-the-shelf desktop software is expensive, bloated, and designed for someone else's workflow.",
        "Your team is stuck using spreadsheets and email because no existing tool fits your process.",
        "Auto-updating software is a nightmare without infrastructure — most small teams just don't update.",
      ],
    },
    solution: {
      title: "Desktop-native software that works anywhere",
      description:
        "Installer-packaged applications for Windows and Mac with full offline capability, hardware integration, and automatic updates built in.",
      benefits: [
        { label: "Works offline", desc: "Zero dependency on internet connectivity. Sync when connected." },
        { label: "Hardware-native", desc: "Direct access to USB, serial ports, printers, scanners, and POS terminals." },
        { label: "Auto-update infrastructure", desc: "Built-in update system so every installation stays current without IT effort." },
        { label: "Installer packaged", desc: "One-click setup on Windows (MSI/EXE) and Mac (DMG). No runtime dependencies." },
      ],
    },
    features: [
      { label: "Cross-platform desktop", desc: "Electron, Tauri, or native — we choose the right framework for your use case." },
      { label: "Hardware integration", desc: "POS terminals, barcode scanners, receipt printers, card readers, scales." },
      { label: "Offline synchronization", desc: "Local SQLite or IndexedDB with background sync when connectivity returns." },
      { label: "Auto-update pipeline", desc: "Squirrel, electron-updater, or Sparkle-based update distribution." },
      { label: "System tray & background processes", desc: "Minimize to tray, background polling, desktop notifications." },
    ],
    faq: [
      { q: "Can it work without any internet?", a: "Yes. The app operates fully offline. Data syncs when a connection is available — or stays local if you prefer." },
      { q: "How do updates work?", a: "We set up an update server (self-hosted or S3/CloudFront). The app checks for updates on launch and installs silently in the background." },
      { q: "Do you support both Windows and Mac?", a: "Yes. We build for both platforms, either from a shared codebase (Electron/Tauri) or native (WPF on Windows, Swift on Mac) depending on requirements." },
    ],
  },
  {
    id: "social-media",
    slug: "social-media",
    name: "Social Media Management",
    tagline: "Systemized content operations, not ad-hoc posting.",
    numeral: "05",
    description:
      "Strategic social media management built on calendar-driven workflows, not vibes. Content production, scheduling, engagement analysis, and ad campaign support. Your brand voice, systemized.",
    diagram: "content-flow",
    category: "service",
    problem: {
      title: "Posting randomly won't build a following",
      description:
        "Most businesses start social media with enthusiasm and fizzle out after two weeks because there's no system — just sporadic posting with no strategy.",
      pains: [
        "You post when you remember, then go silent for weeks — inconsistent presence kills algorithm reach.",
        "Content creation takes hours that you don't have as a business owner.",
        "No clear content strategy — every post is a one-off decision rather than part of a plan.",
        "Engagement is flat and you don't know why because there's no analytics review.",
        "You're on three platforms and each one requires different content formats, tones, and cadences.",
      ],
    },
    solution: {
      title: "A content system that runs on autopilot",
      description:
        "We build a calendar-driven content operation tailored to your brand — production, scheduling, engagement tracking, and monthly performance reviews.",
      benefits: [
        { label: "Content calendar", desc: "Monthly planned content aligned with your campaigns, launches, and seasonal moments." },
        { label: "Consistent cadence", desc: "Predictable posting schedule optimized for each platform's algorithm." },
        { label: "Engagement analysis", desc: "Weekly engagement reports with actionable recommendations." },
        { label: "Brand voice system", desc: "Documented tone, style, and messaging framework so every post sounds like you." },
      ],
    },
    features: [
      { label: "Platform strategy", desc: "Platform-specific content plans for LinkedIn, Instagram, Twitter/X, Facebook, TikTok." },
      { label: "Content production", desc: "Copywriting, visual assets, short-form video scripts, and graphic templates." },
      { label: "Scheduling & publishing", desc: "Queue-based scheduling with optimal posting times per platform." },
      { label: "Community management", desc: "Comment responses, DM triage, and engagement tracking." },
      { label: "Performance reporting", desc: "Monthly analytics dashboards with reach, engagement, conversion, and growth metrics." },
    ],
    faq: [
      { q: "Do you create the visual assets too?", a: "Yes. We handle copy, graphics, and video scripting. For video production, we coordinate with your team or our production partners." },
      { q: "How do you measure success?", a: "We track reach, engagement rate, follower growth, website clicks, and conversion attribution. Monthly reports include benchmarks and optimization recommendations." },
      { q: "What platforms do you cover?", a: "LinkedIn, Instagram, Twitter/X, Facebook, and TikTok. We recommend the right platforms based on your audience and industry rather than forcing presence everywhere." },
    ],
  },
  {
    id: "crm",
    slug: "crm",
    name: "CRM Creation",
    tagline: "Custom CRM that fits your process, not the other way around.",
    numeral: "06",
    description:
      "Bespoke customer relationship management systems built around how your business actually works. Pipeline tracking, automated follow-ups, reporting dashboards — no forced workflows from off-the-shelf CRMs.",
    diagram: "node-flow",
    category: "service",
    problem: {
      title: "Generic CRMs force your team into their process",
      description:
        "Salesforce, HubSpot, and the rest are designed for enterprises with dedicated admins. For most businesses, they're overcomplicated, under-useful, and nobody actually uses them.",
      pains: [
        "Setup takes weeks and requires a dedicated admin to keep it running.",
        "Your sales process doesn't fit the CRM's pipeline model — so you compromise or abandon it.",
        "Per-seat pricing makes it expensive as your team grows, even for basic features.",
        "Customization requires developers and enterprise-tier plans that cost more than your rent.",
        "Reports are either too basic or too complex — never the one view you actually need.",
        "Adoption is low because the UI was designed for a Fortune 500 admin, not your sales team.",
      ],
    },
    solution: {
      title: "A CRM shaped around your actual workflow",
      description:
        "We build the exact pipeline, fields, automations, and reports your team needs. No bloat, no per-seat cost, no training required — because it works the way you do.",
      benefits: [
        { label: "Your process, coded", desc: "Pipeline stages, fields, and automations reflect your actual workflow, not a generic template." },
        { label: "Zero per-seat fees", desc: "Unlimited users, same price. Grow your team without CRM cost scaling." },
        { label: "Automated follow-ups", desc: "Email sequences, task creation, and status updates based on your rules." },
        { label: "Built for adoption", desc: "Designed for daily use by your actual team, not for CRM administrators." },
      ],
    },
    features: [
      { label: "Custom pipeline builder", desc: "Drag-and-drop pipeline stages with conditional logic and auto-transition rules." },
      { label: "Contact & account management", desc: "Unified contact profiles with communication history, notes, and task tracking." },
      { label: "Automation engine", desc: "Trigger-based actions: email sequences, task assignment, status changes, notifications." },
      { label: "Reporting dashboard", desc: "Real-time pipeline value, conversion rates, activity metrics, team performance." },
      { label: "Role-based access", desc: "Admin, manager, sales rep — each role sees what they need, nothing else." },
    ],
    faq: [
      { q: "Can you migrate data from our existing CRM?", a: "Yes. We extract contacts, deals, notes, and history from Salesforce, HubSpot, Pipedrive, or spreadsheets and import into your custom CRM." },
      { q: "Do you offer mobile access?", a: "Yes. Your CRM is accessible from any browser on any device. We can also build a companion mobile app." },
      { q: "How long does a custom CRM take to build?", a: "An MVP with core pipeline, contacts, and basic automation takes 3-5 weeks. Full-featured systems with reporting and integrations take 6-10 weeks." },
    ],
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    name: "AI Automation",
    tagline: "Automate the dirty work. Focus on what matters.",
    numeral: "07",
    description:
      "AI-powered automation that eliminates repetitive tasks across your business. From document processing and data extraction to workflow orchestration and intelligent routing — we build autonomous systems that handle the grunt work so your team can focus on strategy, creativity, and growth.",
    diagram: "ai-automation",
    category: "service",
    problem: {
      title: "Your team is drowning in repetitive work",
      description:
        "Hours every week are lost to tasks that follow the same pattern — data entry, email sorting, document processing, status checking — but still need human attention.",
      pains: [
        "Your team spends 20+ hours a week on repetitive data entry and manual processing.",
        "Email inboxes are chaos — no automated routing, triage, or response system.",
        "Document processing requires manual review, extraction, and data re-entry into multiple systems.",
        "Workflow handoffs between departments happen via email with no tracking or accountability.",
        "You know automation exists but every solution seems to require a dedicated engineering team to set up.",
      ],
    },
    solution: {
      title: "Autonomous systems that handle the grunt work",
      description:
        "We build AI agents that process documents, route emails, update records, trigger workflows, and learn from exceptions — so your team focuses on work that actually needs human judgment.",
      benefits: [
        { label: "Hours saved daily", desc: "Automate repetitive processing — data entry, document parsing, email triage." },
        { label: "Intelligent routing", desc: "AI classifies incoming requests and routes to the right team member automatically." },
        { label: "Self-improving systems", desc: "Exceptions and corrections feed back into the model for continuous accuracy improvement." },
        { label: "No platform lock-in", desc: "Works with your existing tools — email, CRM, project management, databases." },
      ],
    },
    features: [
      { label: "Document intelligence", desc: "Extract data from PDFs, invoices, contracts, and forms using vision AI and OCR." },
      { label: "Email triage automation", desc: "Classify, prioritize, route, and auto-respond to incoming emails based on content and sender." },
      { label: "Workflow orchestration", desc: "Multi-step automation that spans across your tools — Slack, email, CRM, databases." },
      { label: "Data extraction & entry", desc: "Parse structured and unstructured data, validate against rules, and write to your systems." },
      { label: "Monitoring dashboard", desc: "See what your automation processed, what was flagged, and where exceptions occurred." },
    ],
    faq: [
      { q: "Do I need a technical team to maintain this?", a: "No. We set up the system and provide ongoing maintenance. You interact through a dashboard and exception queue." },
      { q: "Can it integrate with our existing tools?", a: "Yes. We integrate with email (Gmail/Outlook), CRMs, project management tools, databases, Slack, and custom internal systems." },
      { q: "How accurate is AI document processing?", a: "With well-trained models, accuracy exceeds 95% for structured documents. Edge cases are flagged for human review and used to improve the model." },
    ],
  },
] as const;

export const PROCESS_STEPS = [
  {
    id: "intake",
    name: "Intake",
    description:
      "A structured discovery call where we map your current state, desired outcomes, and constraints. No sales pitch — we determine if there's a fit on both sides.",
    icon: "intake",
    duration: "1-2 days",
  },
  {
    id: "scope",
    name: "Scope & Architecture",
    description:
      "We produce a detailed scope document covering feature list, technical architecture, timeline, and fixed-cost or retainer pricing. You review, ask questions, and approve before any code is written.",
    icon: "scope",
    duration: "3-7 days",
  },
  {
    id: "design",
    name: "Design",
    description:
      "Wireframes → high-fidelity mockups → interactive prototype. We iterate on design in the browser, not static files, so you see exactly what you'll get before build begins.",
    icon: "design",
    duration: "5-14 days",
  },
  {
    id: "build",
    name: "Build",
    description:
      "Agile development in 1-2 week sprints. You get access to a live staging environment from sprint one, not a reveal at the end. Slack/Linear-based communication for zero-friction updates.",
    icon: "build",
    duration: "varies",
  },
  {
    id: "qa",
    name: "QA & Testing",
    description:
      "Automated and manual testing across devices, browsers, and edge cases. Performance profiling, accessibility audit, and security review before any production deployment.",
    icon: "qa",
    duration: "3-5 days",
  },
  {
    id: "launch",
    name: "Launch",
    description:
      "Production deployment with DNS, CDN, SSL, monitoring, and backup pipeline configured. We don't disappear after launch — you get a handover document and a support channel.",
    icon: "launch",
    duration: "1-2 days",
  },
  {
    id: "support",
    name: "Rent / Retainer",
    description:
      "Ongoing hosting, maintenance, updates, and support. Our rental model includes everything. Our retainer model gives you a monthly allocation for continued development. Either way, we stay available.",
    icon: "support",
    duration: "ongoing",
  },
] as const;
