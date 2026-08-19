export type ProjectCase = {
    slug: string;
    title: string;
    badge: string;
    accent: string;
    liveUrl?: string;
    githubUrl?: string;
    summary: string;
    problem: string;
    audience: string;
    solution: string;
    architecture: string;
    tech: string[];
    challenges: string[];
    outcomes: string[];
    learnings: string[];
    next: string;
};

export const PROJECTS: ProjectCase[] = [
    {
        slug: "sellermetric",
        title: "SellerMetric",
        badge: "LIVE",
        accent: "#3B82F6",
        liveUrl: "https://sellermetric.vercel.app/",
        summary:
            "A browser-based analytics tool that turns Flipkart Earn More Reports into profit, SKU, and return-rate dashboards — without uploading seller data to a backend.",
        problem:
            "Flipkart sellers receive dense Earn More Reports. Finding loss-making SKUs, return spikes, and ad waste usually means hours in Excel and easy-to-miss rows.",
        audience:
            "Flipkart marketplace sellers and operators who already export Earn More Reports and need faster, visual reads of catalog health.",
        solution:
            "SellerMetric lets a seller upload the report in the browser. SheetJS parses the file locally. Recharts then surfaces profit, SKU performance, and return-rate views so loss-making products are obvious.",
        architecture:
            "Client-only processing: the spreadsheet never leaves the device. React renders the UI, SheetJS reads the workbook, and Recharts draws the dashboards. There is no server-side storage of seller reports.",
        tech: ["React", "Tailwind CSS", "Recharts", "SheetJS"],
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
        slug: "star-work-warranty",
        title: "Star Work Warranty Portal",
        badge: "DEPLOYED",
        accent: "#10B981",
        summary:
            "A branded warranty registration flow that writes customer and product data to both Google Sheets and Supabase, replacing manual spreadsheet entry.",
        problem:
            "Warranty registrations were collected by hand into spreadsheets — slow, error-prone, and hard to audit.",
        audience: "Star Work customers registering a purchase, and the internal team that tracks those warranties.",
        solution:
            "A multi-step form captures customer, product, and purchase details, then syncs the submission to Google Sheets and Supabase so operations keep a familiar sheet while also having a structured database.",
        architecture:
            "React multi-step form on the client. On submit, the same payload is written to the Google Sheets API and to Supabase so neither system is the single point of failure for record-keeping.",
        tech: ["React", "Google Sheets API", "Supabase"],
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
        problem:
            "Meesho sellers shipping across multiple couriers were reading each label and stacking by provider — slow and easy to mis-sort at volume.",
        audience: "Meesho sellers handling 50+ daily shipments across more than one courier.",
        solution:
            "The tool parses Meesho label files and automatically groups orders by courier so packing can follow one stack per provider.",
        architecture:
            "A JavaScript parser reads the label export, extracts courier identity, and groups orders in the UI. No marketplace API credentials are required.",
        tech: ["JavaScript"],
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

export function getProject(slug: string) {
    return PROJECTS.find((p) => p.slug === slug);
}
