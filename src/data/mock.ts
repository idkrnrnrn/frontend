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
    status: "Active",
    updatedAt: "Yesterday",
  },
  {
    id: "2",
    title: "Backend Engineer (Go)",
    description:
      "Experience with microservices in Go, PostgreSQL, and Kubernetes.",
    status: "Active",
    updatedAt: "2 days ago",
  },
  {
    id: "3",
    title: "Product Designer",
    description: "Figma expert with a strong portfolio in B2B SaaS.",
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
