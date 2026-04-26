import { useState, useMemo } from "react";
import {
  Search,
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
import { Candidate, Vacancy, Stage } from "../../data/mock";

export default function CandidatesView({
  title,
  candidates,
  vacancies = [],
  selectedVacancyId,
}: {
  title?: string;
  candidates: Candidate[];
  vacancies?: Vacancy[];
  selectedVacancyId?: string;
}) {
  const [activeTab, setActiveTab] = useState<
    Stage | "All candidates" | "Strong matches"
  >("All candidates");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJob, setFilterJob] = useState<string>(
    selectedVacancyId || "All jobs",
  );

  // Minimal filter state
  const [minMatch, setMinMatch] = useState<number>(0);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // Job filter
      if (filterJob !== "All jobs" && c.vacancyId !== filterJob) return false;

      // Tab filter
      if (activeTab === "Strong matches" && c.matchScore < 90) return false;
      if (
        activeTab !== "All candidates" &&
        activeTab !== "Strong matches" &&
        c.stage !== activeTab
      )
        return false;

      // Match Score filter
      if (c.matchScore < minMatch) return false;

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !c.name.toLowerCase().includes(q) &&
          !c.role.toLowerCase().includes(q) &&
          !c.company.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [candidates, filterJob, activeTab, minMatch, searchQuery]);

  const tabs = [
    {
      name: "Strong matches",
      count: candidates.filter(
        (c) =>
          c.matchScore >= 90 &&
          (filterJob === "All jobs" || c.vacancyId === filterJob),
      ).length,
    },
    {
      name: "All candidates",
      count: candidates.filter(
        (c) => filterJob === "All jobs" || c.vacancyId === filterJob,
      ).length,
    },
    {
      name: "New",
      count: candidates.filter(
        (c) =>
          c.stage === "New" &&
          (filterJob === "All jobs" || c.vacancyId === filterJob),
      ).length,
    },
    {
      name: "Screened",
      count: candidates.filter(
        (c) =>
          c.stage === "Screened" &&
          (filterJob === "All jobs" || c.vacancyId === filterJob),
      ).length,
    },
    {
      name: "Interview",
      count: candidates.filter(
        (c) =>
          c.stage === "Interview" &&
          (filterJob === "All jobs" || c.vacancyId === filterJob),
      ).length,
    },
    {
      name: "Offer",
      count: candidates.filter(
        (c) =>
          c.stage === "Offer" &&
          (filterJob === "All jobs" || c.vacancyId === filterJob),
      ).length,
    },
  ];

  const stats = [
    {
      label: "Total candidates",
      value: candidates.length,
      icon: UserPlus,
      trend: "up",
      percent: "12%",
      color: "text-muted-foreground",
    },
    {
      label: "Strong matches",
      value: candidates.filter((c) => c.matchScore >= 90).length,
      icon: Sparkles,
      trend: "up",
      percent: "8%",
      color: "text-foreground",
    },
    {
      label: "To review",
      value: candidates.filter((c) => c.stage === "New").length,
      icon: Clock,
      trend: "down",
      percent: "4%",
      color: "text-muted-foreground",
    },
    {
      label: "Interviews",
      value: candidates.filter((c) => c.stage === "Interview").length,
      icon: Calendar,
      trend: "up",
      percent: "2",
      color: "text-muted-foreground",
    },
    {
      label: "Offers",
      value: candidates.filter((c) => c.stage === "Offer").length,
      icon: Award,
      trend: "up",
      percent: "1",
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full text-foreground max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col mb-2">
        <h1 className="text-2xl font-semibold">
          {title ? (
            <>
              Candidates for{" "}
              <span className="text-muted-foreground">{title}</span>
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
            className="bg-surface border border-border rounded-lg p-5 shadow-sm flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-md bg-border/50 flex items-center justify-center ${stat.color}`}
              >
                <stat.icon size={16} />
              </div>
              <span className="text-2xl font-mono font-medium">
                {stat.value}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                {stat.trend === "up" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )}
                <span className="text-foreground font-medium">
                  {stat.percent}
                </span>
                <span className="text-muted-foreground ml-1 font-sans">
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
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => setActiveTab(tab.name as any)}
                className={`flex items-center gap-2 pb-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === tab.name
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tab.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-xs font-mono ${activeTab === tab.name ? "bg-muted" : "bg-muted/50"}`}
                >
                  {tab.count}
                </span>
              </div>
            ))}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates by name, skills, company..."
                className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm hover:bg-muted/50 transition-colors">
                <ArrowDown size={14} className="rotate-180" />
                <span>Sort: Relevance</span>
                <ChevronDown size={14} className="ml-1 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="w-full bg-surface border border-border rounded-lg overflow-x-auto shadow-sm">
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
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-muted-foreground"
                    >
                      No candidates found.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((c, i) => (
                    <tr
                      key={c.id}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-8 w-8 rounded-md border border-border bg-muted">
                            <AvatarFallback className="text-muted-foreground font-medium rounded-md text-xs">
                              {c.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">
                                {c.name}
                              </span>
                              {c.matchScore >= 90 && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded border border-border text-foreground bg-muted/50">
                                  Strong match
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground mt-0.5">
                              {c.role} at {c.company}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2 w-24">
                          <span className="font-mono font-medium text-xs">
                            {c.matchScore}%
                          </span>
                          <div className="h-0.5 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-foreground rounded-full"
                              style={{ width: `${c.matchScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {c.role}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                        {c.experience}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {c.company}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                        {c.addedAt}
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
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/10">
              <span className="text-sm text-muted-foreground">
                Showing 1 to 7 of 127 candidates
              </span>
              <div className="flex items-center gap-1 font-mono text-xs">
                <span className="mr-2">Total: {filteredCandidates.length}</span>
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
            <h3 className="font-semibold text-lg">Filters</h3>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterJob("All jobs");
                setActiveTab("All candidates");
                setMinMatch(0);
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {/* Filter Search */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">
                Filter by name/role
              </label>
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-8 pr-3 py-1.5 bg-surface border border-border rounded-md text-xs focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>

            {/* Dropdowns */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">Job</label>
              <select
                value={filterJob}
                onChange={(e) => setFilterJob(e.target.value)}
                className="flex items-center justify-between w-full px-3 py-1.5 bg-surface border border-border rounded-md text-xs text-foreground focus:border-foreground transition-colors outline-none cursor-pointer appearance-none"
              >
                <option value="All jobs">All jobs</option>
                {vacancies.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Match Score Slider (Simplified) */}
            <div className="flex flex-col gap-3 mt-2">
              <label className="text-sm text-foreground">
                Min Match Score: {minMatch}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={minMatch}
                onChange={(e) => setMinMatch(Number(e.target.value))}
                className="w-full accent-foreground"
              />
              <div className="flex justify-between text-xs font-mono text-muted-foreground mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterJob("All jobs");
                setActiveTab("All candidates");
                setMinMatch(0);
              }}
              className="w-full py-2 bg-foreground text-background font-medium rounded-md text-sm hover:bg-foreground/90 transition-colors shadow-sm"
            >
              Reset filters
            </button>
            <button className="w-full py-2 bg-transparent text-muted-foreground font-medium rounded-md text-sm hover:text-foreground transition-colors flex items-center justify-center gap-2">
              <Bookmark size={14} />
              Save as view
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
