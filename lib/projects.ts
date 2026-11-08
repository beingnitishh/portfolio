import { GITHUB_URL } from "./site";

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

export type CaseFeature = {
    title: string;
    description: string;
};

export type CaseStep = {
    title: string;
    description: string;
};

export type CaseFlowNode = {
    title: string;
    detail?: string;
};

export type CaseScreenshot = {
    src: string;
    alt: string;
    caption: string;
};

export type CaseTechGroup = {
    heading: string;
    items: string[];
};

export type ProjectCaseStudy = {
    tagline: string;
    heroBadges: string[];
    overview: {
        eyebrow: string;
        heading: string;
        body: string;
    };
    features: {
        eyebrow: string;
        heading: string;
        intro?: string;
        items: CaseFeature[];
    };
    howItWorks: {
        eyebrow: string;
        heading: string;
        intro?: string;
        steps: CaseStep[];
    };
    architecture: {
        eyebrow: string;
        heading: string;
        intro?: string;
        nodes: CaseFlowNode[];
        footnote?: string;
    };
    ai: {
        eyebrow: string;
        heading: string;
        intro: string;
        steps: CaseStep[];
        prompts: string[];
        promptLabel?: string;
    };
    techStack: {
        eyebrow: string;
        heading: string;
        groups: CaseTechGroup[];
    };
    screenshots: {
        eyebrow: string;
        heading: string;
        intro?: string;
        items: CaseScreenshot[];
    };
    cta: {
        heading: string;
        body: string;
    };
};

export type ProjectCardData = {
    id: string;
    title: string;
    badge: string;
    accent: string;
    /** Case-study route for internal projects, or an external URL when `external` is true. */
    href: string;
    external?: boolean;
    /** Live site, shown as a secondary "Live" link on the card. */
    liveUrl?: string;
    desc: string;
    highlights: string[];
    stack: string[];
};

export type ProjectCase = {
    slug: string;
    title: string;
    badge: string;
    accent: string;
    liveUrl?: string;
    githubUrl?: string;
    summary: string;
    /** Short copy + bullets used by the homepage project cards. */
    card: {
        description: string;
        highlights: string[];
    };
    /** Page-level SEO copy. Falls back to title/summary when omitted. */
    seo?: {
        title: string;
        description: string;
    };
    tech: string[];
    /* Long-form story used by the plain case-study layout. */
    problem?: string;
    audience?: string;
    solution?: string;
    architecture?: string;
    challenges?: string[];
    outcomes?: string[];
    learnings?: string[];
    next?: string;
    /* Rich, sectioned case study (hero → CTA). */
    caseStudy?: ProjectCaseStudy;
};

/* -------------------------------------------------------------------------- */
/*  Case studies                                                              */
/* -------------------------------------------------------------------------- */

export const PROJECTS: ProjectCase[] = [
    {
        slug: "sellermetric",
        title: "SellerMetric",
        badge: "LIVE",
        accent: "#3B82F6",
        liveUrl: "https://sellermetric.vercel.app/",
        summary:
            "A browser-based analytics tool that turns Flipkart Earn More Reports into profit, SKU, and return-rate dashboards — without uploading seller data to a backend.",
        card: {
            description: "Web analytics platform for Flipkart sellers",
            highlights: [
                "Upload & analyze Earn More Reports in-browser (no backend)",
                "Recharts dashboards for profit/SKU/return rate",
                "Surfaces loss-making products from raw data",
            ],
        },
        tech: ["React", "Tailwind CSS", "Recharts", "SheetJS"],
        problem:
            "Flipkart sellers receive dense Earn More Reports. Finding loss-making SKUs, return spikes, and ad waste usually means hours in Excel and easy-to-miss rows.",
        audience:
            "Flipkart marketplace sellers and operators who already export Earn More Reports and need faster, visual reads of catalog health.",
        solution:
            "SellerMetric lets a seller upload the report in the browser. SheetJS parses the file locally. Recharts then surfaces profit, SKU performance, and return-rate views so loss-making products are obvious.",
        architecture:
            "Client-only processing: the spreadsheet never leaves the device. React renders the UI, SheetJS reads the workbook, and Recharts draws the dashboards. There is no server-side storage of seller reports.",
        challenges: [
            "Mapping inconsistent Earn More Report columns into a stable analytics model.",
            "Keeping large workbooks usable entirely in-browser.",
            "Making loss-making SKUs visible without requiring a data-science background.",
        ],
        outcomes: [
            "Sellers can inspect profit, SKU, and return rate without a backend login.",
            "Loss-making products surface from the same files operators already download.",
            "Privacy-first: report data stays on the seller’s machine.",
        ],
        learnings: [
            "Marketplace reports are messy; column mapping is the product, not a side task.",
            "In-browser parsing is enough for typical seller file sizes and removes a trust barrier.",
        ],
        next: "Richer cohort views and clearer export of “fix these SKUs first” lists.",
    },
    {
        slug: "starstock",
        title: "StarStock",
        badge: "LIVE",
        accent: "#00F5FF",
        liveUrl: "https://starstock-one.vercel.app",
        githubUrl: "https://github.com/beingnitishh/StarStock",
        summary: "Multi-warehouse inventory system with an AI connector",
        seo: {
            title: "StarStock — Multi-Warehouse Inventory System Case Study",
            description:
                "How I built StarStock: a Next.js and PostgreSQL inventory system tracking stock per warehouse, logging every movement as a transaction, surfacing low-stock SKUs, and exposing live stock data to AI assistants through an OAuth-protected MCP server.",
        },
        card: {
            description: "Multi-warehouse inventory system with an AI connector",
            highlights: [
                "Piece + carton quantities per SKU, tracked per warehouse",
                "Every inbound, outbound, transfer and adjustment logged",
                "Remote MCP server lets AI assistants query live stock",
            ],
        },
        tech: ["Next.js", "TypeScript", "PostgreSQL", "MCP"],
        caseStudy: {
            tagline: "Multi-warehouse inventory system with an AI connector",
            heroBadges: ["Next.js", "TypeScript", "PostgreSQL", "MCP"],
            overview: {
                eyebrow: "CONTEXT",
                heading: "Overview",
                body:
                    "Tracking stock across multiple warehouses in spreadsheets leads to wrong counts, no movement history and no warning before an SKU runs out. StarStock is a web-based inventory system that keeps one accurate record of every product, every warehouse and every stock movement.",
            },
            features: {
                eyebrow: "WHAT IT DOES",
                heading: "Key Features",
                intro:
                    "The product is deliberately narrow: one trustworthy number per SKU per warehouse, and a complete record of how that number changed.",
                items: [
                    {
                        title: "SKU-based product catalogue",
                        description:
                            "Every product is identified by its SKU, with stock held as both individual pieces and full cartons so picking and auditing read the same record.",
                    },
                    {
                        title: "Multiple warehouses",
                        description:
                            "Stock is tracked per warehouse, so the count at one location never stands in for another.",
                    },
                    {
                        title: "Four movement types",
                        description:
                            "Inbound, outbound, transfer and adjustment entries cover receiving, dispatch, inter-warehouse moves and corrections after a physical count.",
                    },
                    {
                        title: "Full transaction history",
                        description:
                            "Every movement is appended to a permanent log and displayed newest first, so any number can be traced back to the entries that produced it.",
                    },
                    {
                        title: "Low-stock view",
                        description:
                            "A dedicated view filters the catalogue down to SKUs that need reordering, turning replenishment into a short list instead of a full audit.",
                    },
                    {
                        title: "Catalogue summary totals",
                        description:
                            "Catalogue-level rollups give a quick read on how many products and units are on hand at any moment.",
                    },
                    {
                        title: "Product image upload",
                        description:
                            "Each product can carry an image, so the catalogue is scannable by people instead of only by code.",
                    },
                    {
                        title: "Excel file handling",
                        description:
                            "ExcelJS powers spreadsheet import and export, giving existing sheet-based workflows a practical on-ramp.",
                    },
                    {
                        title: "Secure login with user management",
                        description:
                            "The app sits behind a login, and users can be added or removed as the warehouse team changes.",
                    },
                ],
            },
            howItWorks: {
                eyebrow: "THE FLOW",
                heading: "How It Works",
                intro: "Five steps from an empty catalogue to a replenishment list.",
                steps: [
                    {
                        title: "Log in",
                        description:
                            "Access the workspace with a user account managed by the team.",
                    },
                    {
                        title: "Add a product with opening stock",
                        description:
                            "Create the SKU, set piece and carton quantities, attach an image, and record opening stock against the warehouse that physically holds it.",
                    },
                    {
                        title: "Record a stock movement",
                        description:
                            "Choose inbound, outbound, transfer or adjustment for a specific warehouse when goods actually move.",
                    },
                    {
                        title: "Transaction logged automatically",
                        description:
                            "Each movement writes a transaction record in the same action, so history and current stock never drift apart.",
                    },
                    {
                        title: "Low-stock view flags reorders",
                        description:
                            "Anything at or below its reorder level surfaces in the low-stock view, ready to be restocked.",
                    },
                ],
            },
            architecture: {
                eyebrow: "UNDER THE HOOD",
                heading: "Architecture",
                intro: "A single Next.js deployment with a server API and a relational database behind it.",
                nodes: [
                    { title: "User", detail: "Browser, signed in" },
                    { title: "Next.js web app", detail: "App Router UI" },
                    { title: "Server API", detail: "Validated requests" },
                    { title: "Drizzle ORM", detail: "Typed queries" },
                    { title: "PostgreSQL", detail: "Supabase" },
                ],
                footnote:
                    "Every stock change is written as a transaction record, so the movement log is the source of truth behind each current quantity. Deployed on Vercel.",
            },
            ai: {
                eyebrow: "AI INTEGRATION",
                heading: "Talk to your inventory",
                intro:
                    "StarStock includes a remote MCP (Model Context Protocol) server running on the same deployment, protected with OAuth. It lets AI assistants like Claude and ChatGPT connect to StarStock as a custom connector and work with live stock data in plain language. The server exposes 11 tools: 7 read tools (search products, get product by SKU, list products, catalogue summary, low stock, list warehouses, list transactions) and 4 action tools (add product, inbound stock, outbound stock, product image upload link).",
                steps: [
                    {
                        title: "You ask in plain language",
                        description: "“Which products are low on stock?” — no query syntax, no dashboard hunting.",
                    },
                    {
                        title: "The AI picks the right tool",
                        description: "The assistant maps the question to one of the read or action tools the server exposes.",
                    },
                    {
                        title: "OAuth login verified, data queried",
                        description:
                            "The MCP server checks the OAuth-protected session, then queries live inventory through the same application logic.",
                    },
                    {
                        title: "Answer comes back in chat",
                        description: "Results land as a normal conversation reply — with the stock numbers already up to date.",
                    },
                ],
                promptLabel: "Try asking",
                prompts: [
                    "Which products are low on stock?",
                    "Show the last 10 stock movements",
                    "Add stock to a product in a warehouse",
                ],
            },
            techStack: {
                eyebrow: "TOOLING",
                heading: "Tech Stack",
                groups: [
                    {
                        heading: "Frontend",
                        items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"],
                    },
                    {
                        heading: "Backend and Data",
                        items: [
                            "PostgreSQL (Supabase)",
                            "Drizzle ORM",
                            "drizzle-kit migrations",
                            "node-postgres",
                            "ExcelJS",
                        ],
                    },
                    {
                        heading: "AI",
                        items: ["MCP server (mcp-handler)", "OAuth"],
                    },
                    {
                        heading: "Quality and Security",
                        items: [
                            "Vitest",
                            "ESLint",
                            "Row Level Security enabled",
                            "Public table access locked down",
                            "GitHub Dependabot and secret scanning",
                        ],
                    },
                    {
                        heading: "Hosting",
                        items: ["Vercel"],
                    },
                ],
            },
            screenshots: {
                eyebrow: "PRODUCT",
                heading: "Screenshots",
                intro: "A look at the working app. Click any frame to view it larger.",
                items: [
                    {
                        src: "/projects/starstock/dashboard.jpg",
                        alt: "StarStock dashboard showing catalogue totals and stock levels",
                        caption: "Dashboard",
                    },
                    {
                        src: "/projects/starstock/inventory.jpg",
                        alt: "StarStock inventory table listing products by SKU and warehouse",
                        caption: "Inventory",
                    },
                    {
                        src: "/projects/starstock/transactions.jpg",
                        alt: "StarStock transaction history with the newest stock movements first",
                        caption: "Transactions",
                    },
                    {
                        src: "/projects/starstock/ai-chat.jpg",
                        alt: "An AI assistant answering a low-stock question through the StarStock MCP server",
                        caption: "AI chat",
                    },
                ],
            },
            cta: {
                heading: "See it running",
                body:
                    "The live app is open in the browser, and the source is public if you want to read the schema, API routes and MCP server.",
            },
        },
    },
    {
        slug: "star-work-warranty",
        title: "Star Work Warranty Portal",
        badge: "DEPLOYED",
        accent: "#10B981",
        summary:
            "A branded warranty registration flow that writes customer and product data to both Google Sheets and Supabase, replacing manual spreadsheet entry.",
        card: {
            description: "Branded warranty registration with dual-backend architecture",
            highlights: [
                "Google Sheets + Supabase synced on submission",
                "Multi-step form captures customer/product/purchase data",
                "Replaced manual spreadsheet entry with self-serve flow",
            ],
        },
        tech: ["React", "Google Sheets API", "Supabase"],
        problem:
            "Warranty registrations were collected by hand into spreadsheets — slow, error-prone, and hard to audit.",
        audience: "Star Work customers registering a purchase, and the internal team that tracks those warranties.",
        solution:
            "A multi-step form captures customer, product, and purchase details, then syncs the submission to Google Sheets and Supabase so operations keep a familiar sheet while also having a structured database.",
        architecture:
            "React multi-step form on the client. On submit, the same payload is written to the Google Sheets API and to Supabase so neither system is the single point of failure for record-keeping.",
        challenges: [
            "Keeping two backends in sync from one submission.",
            "Designing a form that customers can finish without training.",
        ],
        outcomes: [
            "Self-serve registration replaced manual spreadsheet typing.",
            "Operations still have a sheet; engineering has a queryable store.",
        ],
        learnings: [
            "Dual-write is worth it when one audience lives in Sheets and another needs a database.",
        ],
        next: "Status lookup for customers and cleaner failure handling if one write path is down.",
    },
    {
        slug: "meesho-label-sorter",
        title: "Meesho Label Sorter Pro",
        badge: "TOOL",
        accent: "#F59E0B",
        summary:
            "A shipping-label parser that groups Meesho orders by courier so warehouse staff stop sorting 50+ daily labels by hand.",
        card: {
            description: "Shipping label parser eliminating manual courier sorting",
            highlights: [
                "Parses Meesho label files and groups orders by courier automatically",
                "Built for sellers managing 50+ daily shipments across multiple providers",
            ],
        },
        tech: ["JavaScript"],
        problem:
            "Meesho sellers shipping across multiple couriers were reading each label and stacking by provider — slow and easy to mis-sort at volume.",
        audience: "Meesho sellers handling 50+ daily shipments across more than one courier.",
        solution:
            "The tool parses Meesho label files and automatically groups orders by courier so packing can follow one stack per provider.",
        architecture:
            "A JavaScript parser reads the label export, extracts courier identity, and groups orders in the UI. No marketplace API credentials are required.",
        challenges: [
            "Label layouts vary; courier detection has to tolerate messy source files.",
            "The UI has to be usable on a packing desk, not just a laptop.",
        ],
        outcomes: [
            "Courier grouping no longer depends on reading every label.",
            "Built around the real daily volume of multi-courier Meesho sellers.",
        ],
        learnings: [
            "Ops tools win when they remove one repetitive motion, not when they add a dashboard.",
        ],
        next: "Print-ready stacks and support for additional marketplace label formats.",
    },
];

/* -------------------------------------------------------------------------- */
/*  Homepage cards (derived, so a new PROJECTS entry is all it takes)          */
/* -------------------------------------------------------------------------- */

const HOMEPAGE_EXTRAS: ProjectCardData[] = [
    {
        id: "portfolio",
        title: "Personal Portfolio",
        badge: "PERSONAL",
        accent: "#EC4899",
        href: `${GITHUB_URL}portfolio`,
        external: true,
        desc: "Dark-themed portfolio with canvas animations & fluid motion design",
        highlights: [
            "Next.js App Router for SSR and optimized asset delivery",
            "Framer Motion page transitions + scroll-triggered reveals + micro-interactions",
            "Canvas API drives generative background animations without impacting layout",
            "Custom Tailwind dark design system across all sections",
        ],
        stack: ["Next.js", "Framer Motion", "Tailwind CSS", "Canvas"],
    },
];

export const PROJECT_CARDS: ProjectCardData[] = [
    ...PROJECTS.map((project) => ({
        id: project.slug,
        title: project.title,
        badge: project.badge,
        accent: project.accent,
        href: `/projects/${project.slug}`,
        external: false,
        liveUrl: project.liveUrl,
        desc: project.card.description,
        highlights: project.card.highlights,
        stack: project.tech,
    })),
    ...HOMEPAGE_EXTRAS,
];

/** Number of projects with a live site. Used for the "Live Projects" stat. */
export const LIVE_PROJECT_COUNT = PROJECTS.filter((project) => Boolean(project.liveUrl)).length;

export function getProject(slug: string) {
    return PROJECTS.find((p) => p.slug === slug);
}

/** Projects that still use the original plain-text case-study layout. */
export function hasStorySections(project: ProjectCase) {
    return Boolean(project.problem && project.solution);
}
