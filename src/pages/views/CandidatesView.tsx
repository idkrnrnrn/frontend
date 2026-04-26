import {
  Search,
  Filter,
  ChevronDown,
  Bookmark,
  MoreHorizontal,
  UserPlus,
  Clock,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Calendar,
  Award,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const stats = [
  {
    label: "Total candidates",
    value: "127",
    icon: UserPlus,
    trend: "up",
    percent: "12%",
    color: "text-muted-foreground",
  },
  {
    label: "Strong matches",
    value: "12",
    icon: Sparkles,
    trend: "up",
    percent: "8%",
    color: "text-accent",
  },
  {
    label: "To review",
    value: "23",
    icon: Clock,
    trend: "down",
    percent: "4%",
    color: "text-muted-foreground",
  },
  {
    label: "Interviews",
    value: "4",
    icon: Calendar,
    trend: "up",
    percent: "2",
    color: "text-muted-foreground",
  },
  {
    label: "Offers",
    value: "3",
    icon: Award,
    trend: "up",
    percent: "1",
    color: "text-muted-foreground",
  },
];

const candidates = [
  {
    initials: "AP",
    name: "Anna Petrova",
    isStrongMatch: true,
    title: "Senior Platform Engineer at Stripe",
    match: 92,
    role: "Senior Platform Engineer",
    exp: "6 yrs",
    company: "Stripe",
    added: "2m ago",
  },
  {
    initials: "DK",
    name: "Dmitry Kuznetsov",
    isStrongMatch: false,
    title: "Backend Engineer at Revolut",
    match: 88,
    role: "Backend Engineer",
    exp: "5 yrs",
    company: "Revolut",
    added: "1h ago",
  },
  {
    initials: "MC",
    name: "Maria Collins",
    isStrongMatch: false,
    title: "Staff Software Engineer at Shopify",
    match: 85,
    role: "Staff Software Engineer",
    exp: "7 yrs",
    company: "Shopify",
    added: "2h ago",
  },
  {
    initials: "IL",
    name: "Ivan Lebedev",
    isStrongMatch: false,
    title: "Tech Lead at Tinkoff",
    match: 82,
    role: "Tech Lead",
    exp: "6 yrs",
    company: "Tinkoff",
    added: "4h ago",
  },
  {
    initials: "EW",
    name: "Ethan Wong",
    isStrongMatch: false,
    title: "Senior Backend Engineer at Plaid",
    match: 81,
    role: "Senior Backend Engineer",
    exp: "5 yrs",
    company: "Plaid",
    added: "5h ago",
  },
  {
    initials: "RS",
    name: "Rohan Singh",
    isStrongMatch: false,
    title: "Software Engineer at AWS",
    match: 78,
    role: "Software Engineer",
    exp: "4 yrs",
    company: "AWS",
    added: "6h ago",
  },
  {
    initials: "NB",
    name: "Nina Brown",
    isStrongMatch: false,
    title: "Platform Engineer at Databricks",
    match: 75,
    role: "Platform Engineer",
    exp: "4 yrs",
    company: "Databricks",
    added: "7h ago",
  },
];

export default function CandidatesView({ title }: { title?: string }) {
  return (
    <div className="flex flex-col gap-6 w-full text-foreground max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col mb-2">
        <h1 className="text-3xl font-serif">
          {title ? (
            <>
              Candidates for <span className="text-accent italic">{title}</span>
            </>
          ) : (
            "Candidates"
          )}
        </h1>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-5 shadow-sm flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full bg-border/50 flex items-center justify-center ${stat.color}`}
              >
                <stat.icon size={16} />
              </div>
              <span className="text-2xl font-serif">{stat.value}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <div
                className={`flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {stat.trend === "up" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
                <span>{stat.percent}</span>
                <span className="text-muted-foreground ml-1">
                  vs last 7 days
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout: Left Content & Right Filters */}
      <div className="flex flex-col lg:flex-row gap-6 items-start mt-2">
        {/* Left Content Area */}
        <div className="flex-1 w-full flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-border mb-6 overflow-x-auto pb-1 hide-scrollbar text-sm">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-accent text-foreground whitespace-nowrap cursor-pointer">
              <span>Strong matches</span>
              <span className="bg-muted px-1.5 py-0.5 rounded text-xs">12</span>
            </div>
            <div className="flex items-center gap-2 pb-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap cursor-pointer">
              <span>All candidates</span>
              <span className="bg-muted/50 px-1.5 py-0.5 rounded text-xs">
                127
              </span>
            </div>
            <div className="flex items-center gap-2 pb-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap cursor-pointer">
              <span>To review</span>
              <span className="bg-muted/50 px-1.5 py-0.5 rounded text-xs">
                23
              </span>
            </div>
            <div className="flex items-center gap-2 pb-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap cursor-pointer">
              <span>Interview</span>
              <span className="bg-muted/50 px-1.5 py-0.5 rounded text-xs">
                4
              </span>
            </div>
            <div className="flex items-center gap-2 pb-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap cursor-pointer">
              <span>Offer</span>
              <span className="bg-muted/50 px-1.5 py-0.5 rounded text-xs">
                3
              </span>
            </div>
            <div className="flex items-center gap-2 pb-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap cursor-pointer">
              <span>Archived</span>
              <span className="bg-muted/50 px-1.5 py-0.5 rounded text-xs">
                18
              </span>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="flex-1 relative w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search candidates by name, skills, company..."
                className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm hover:bg-muted/50 transition-colors">
                <Filter size={16} />
                <span>Filters</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm hover:bg-muted/50 transition-colors">
                <ArrowDown size={14} className="rotate-180" />
                <span>Sort: Relevance</span>
                <ChevronDown size={14} className="ml-1 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="w-full bg-surface border border-border rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-border text-muted-foreground bg-muted/20">
                  <th className="px-6 py-4 font-medium">Candidate</th>
                  <th className="px-6 py-4 font-medium">Match</th>
                  <th className="px-6 py-4 font-medium">Current role</th>
                  <th className="px-6 py-4 font-medium">Experience</th>
                  <th className="px-6 py-4 font-medium">Current company</th>
                  <th className="px-6 py-4 font-medium flex items-center gap-1">
                    Added <ArrowDown size={12} />
                  </th>
                  <th className="px-6 py-4 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {candidates.map((c, i) => (
                  <tr
                    key={i}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-border bg-muted">
                          <AvatarFallback className="text-muted-foreground font-medium">
                            {c.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              {c.name}
                            </span>
                            {c.isStrongMatch && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded border border-accent/30 text-accent bg-accent/5">
                                Strong match
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground mt-0.5">
                            {c.title}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2 w-24">
                        <span className="font-medium">{c.match}%</span>
                        <div className="h-1 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${c.match}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {c.role}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{c.exp}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {c.company}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {c.added}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
                          <Bookmark size={16} />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/10">
              <span className="text-sm text-muted-foreground">
                Showing 1 to 7 of 127 candidates
              </span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted/50 disabled:opacity-50">
                  <ChevronDown size={14} className="rotate-90" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-border bg-surface text-foreground font-medium">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-muted-foreground hover:bg-muted/50">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-muted-foreground hover:bg-muted/50">
                  3
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-muted-foreground">
                  ...
                </span>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-muted-foreground hover:bg-muted/50">
                  18
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted/50">
                  <ChevronDown size={14} className="-rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Filters Sidebar */}
        <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-6 lg:pl-2">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-serif text-lg">Filters</h3>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Clear all
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {/* Filter Search */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">Search</label>
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search by name, skills..."
                  className="w-full pl-8 pr-3 py-1.5 bg-surface border border-border rounded-md text-xs focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            {/* Dropdowns */}
            {[
              { label: "Job", placeholder: "All jobs" },
              { label: "Stage", placeholder: "All stages" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col gap-2">
                <label className="text-sm text-foreground">{f.label}</label>
                <button className="flex items-center justify-between w-full px-3 py-1.5 bg-surface border border-border rounded-md text-xs text-muted-foreground hover:border-accent/50 transition-colors text-left">
                  <span>{f.placeholder}</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            ))}

            {/* Match Score Slider */}
            <div className="flex flex-col gap-3 mt-2">
              <label className="text-sm text-foreground">Match score</label>
              <div className="relative h-1 bg-border rounded-full w-full">
                <div className="absolute left-0 right-0 h-full bg-accent rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full border-2 border-background shadow-sm" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full border-2 border-background shadow-sm" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* More Dropdowns */}
            {[
              { label: "Location", placeholder: "All locations" },
              { label: "Experience", placeholder: "All experience levels" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col gap-2">
                <label className="text-sm text-foreground">{f.label}</label>
                <button className="flex items-center justify-between w-full px-3 py-1.5 bg-surface border border-border rounded-md text-xs text-muted-foreground hover:border-accent/50 transition-colors text-left">
                  <span>{f.placeholder}</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            ))}

            {/* Skills */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">Skills</label>
              <input
                type="text"
                placeholder="Add skills..."
                className="w-full px-3 py-1.5 bg-surface border border-border rounded-md text-xs focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Tags & Added */}
            {[
              { label: "Tags", placeholder: "All tags" },
              { label: "Added", placeholder: "Any time" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col gap-2">
                <label className="text-sm text-foreground">{f.label}</label>
                <button className="flex items-center justify-between w-full px-3 py-1.5 bg-surface border border-border rounded-md text-xs text-muted-foreground hover:border-accent/50 transition-colors text-left">
                  <span>{f.placeholder}</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button className="w-full py-2 bg-accent text-background font-medium rounded-lg text-sm hover:bg-accent/90 transition-colors shadow-sm">
              Apply filters
            </button>
            <button className="w-full py-2 bg-transparent text-muted-foreground font-medium rounded-lg text-sm hover:text-foreground transition-colors flex items-center justify-center gap-2">
              <Bookmark size={14} />
              Save as view
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
