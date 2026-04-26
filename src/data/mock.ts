export type Vacancy = {
  id: string;
  title: string;
  description: string;
  responsibilities?: string;
  mustHaves?: string;
  niceToHaves?: string;
  stopFactors?: string;
  conditions?: string;
  weights?: {
    experience: number;
    skills: number;
    schedule: number;
    location: number;
    motivation: number;
    readiness: number;
    communication: number;
  };
  status: "Active" | "Closed";
  updatedAt: string;
};

export type Stage = "New" | "Screened" | "Interview" | "Offer" | "Archived";

export type Candidate = {
  id: string;
  vacancyId: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  experience: string;
  matchScore: number;
  stage: Stage;
  addedAt: string;
};

export const initialVacancies: Vacancy[] = [
  {
    id: "1",
    title: "Senior React Developer",
    description:
      "Deep knowledge of React, TypeScript, and high-load architectures.",
    responsibilities:
      "- Build and maintain complex product surfaces\n- Partner with design and backend on release delivery\n- Improve performance and reliability across the app",
    mustHaves:
      "- 4+ years with React in production\n- Strong TypeScript fundamentals\n- Experience owning UI architecture decisions",
    niceToHaves:
      "- Experience with design systems\n- Familiarity with experimentation tooling\n- Mentoring junior engineers",
    stopFactors:
      "- No recent hands-on frontend ownership\n- Unclear communication about shipped work\n- Not available for overlap with the product team",
    conditions:
      "- Remote across Europe\n- Core collaboration hours: 10:00-16:00 CET\n- Full-time only",
    weights: {
      experience: 30,
      skills: 25,
      schedule: 10,
      location: 10,
      motivation: 10,
      readiness: 10,
      communication: 5,
    },
    status: "Active",
    updatedAt: "Yesterday",
  },
  {
    id: "2",
    title: "Backend Engineer (Go)",
    description:
      "Experience with microservices in Go, PostgreSQL, and Kubernetes.",
    responsibilities:
      "- Build internal services for hiring workflows\n- Improve API latency and failure recovery\n- Own observability for core screening pipelines",
    mustHaves:
      "- Strong Go experience in production\n- PostgreSQL query tuning\n- Experience with service ownership in Kubernetes",
    niceToHaves:
      "- Event-driven systems\n- Messaging queues\n- Experience in B2B SaaS",
    stopFactors:
      "- Limited backend ownership depth\n- No production debugging examples\n- Cannot support on-call rotation",
    conditions:
      "- Hybrid in Warsaw or remote in Poland\n- On-call rotation once every 6 weeks\n- Full-time only",
    weights: {
      experience: 25,
      skills: 30,
      schedule: 10,
      location: 10,
      motivation: 10,
      readiness: 10,
      communication: 5,
    },
    status: "Active",
    updatedAt: "2 days ago",
  },
  {
    id: "3",
    title: "Product Designer",
    description: "Figma expert with a strong portfolio in B2B SaaS.",
    responsibilities:
      "- Lead end-to-end flows for screening and recruiter tooling\n- Turn user research into shippable interaction patterns\n- Collaborate closely with product and engineering",
    mustHaves:
      "- Strong portfolio in B2B workflows\n- High proficiency in Figma\n- Experience shipping product changes with engineers",
    niceToHaves:
      "- Design systems experience\n- Qualitative user research\n- Marketplace or hiring product background",
    stopFactors:
      "- Portfolio lacks workflow depth\n- No systems thinking examples\n- Unable to explain tradeoffs in decision making",
    conditions:
      "- Remote-friendly\n- Portfolio review required\n- Contract-to-hire possible",
    weights: {
      experience: 20,
      skills: 25,
      schedule: 10,
      location: 5,
      motivation: 10,
      readiness: 10,
      communication: 20,
    },
    status: "Active",
    updatedAt: "1 week ago",
  },
];

export const initialCandidates: Candidate[] = [
  {
    id: "c1",
    vacancyId: "1",
    name: "Anna Petrova",
    initials: "AP",
    role: "Senior Platform Engineer",
    company: "Stripe",
    experience: "6 yrs",
    matchScore: 92,
    stage: "New",
    addedAt: "2m ago",
  },
  {
    id: "c2",
    vacancyId: "2",
    name: "Dmitry Kuznetsov",
    initials: "DK",
    role: "Backend Engineer",
    company: "Revolut",
    experience: "5 yrs",
    matchScore: 88,
    stage: "Interview",
    addedAt: "1h ago",
  },
  {
    id: "c3",
    vacancyId: "1",
    name: "Maria Collins",
    initials: "MC",
    role: "Staff Software Engineer",
    company: "Shopify",
    experience: "7 yrs",
    matchScore: 85,
    stage: "Screened",
    addedAt: "2h ago",
  },
  {
    id: "c4",
    vacancyId: "2",
    name: "Ivan Lebedev",
    initials: "IL",
    role: "Tech Lead",
    company: "Tinkoff",
    experience: "6 yrs",
    matchScore: 82,
    stage: "Offer",
    addedAt: "4h ago",
  },
  {
    id: "c5",
    vacancyId: "2",
    name: "Ethan Wong",
    initials: "EW",
    role: "Senior Backend Engineer",
    company: "Plaid",
    experience: "5 yrs",
    matchScore: 81,
    stage: "Screened",
    addedAt: "5h ago",
  },
  {
    id: "c6",
    vacancyId: "1",
    name: "Rohan Singh",
    initials: "RS",
    role: "Software Engineer",
    company: "AWS",
    experience: "4 yrs",
    matchScore: 78,
    stage: "New",
    addedAt: "6h ago",
  },
  {
    id: "c7",
    vacancyId: "3",
    name: "Nina Brown",
    initials: "NB",
    role: "Product Designer",
    company: "Databricks",
    experience: "4 yrs",
    matchScore: 75,
    stage: "New",
    addedAt: "7h ago",
  },
  {
    id: "c8",
    vacancyId: "3",
    name: "Alex Johnson",
    initials: "AJ",
    role: "UI/UX Designer",
    company: "Figma",
    experience: "3 yrs",
    matchScore: 95,
    stage: "Interview",
    addedAt: "1d ago",
  },
];
