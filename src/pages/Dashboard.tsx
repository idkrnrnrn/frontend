import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Moon,
  Sun,
  Briefcase,
  Users,
  BarChart,
  Settings,
  Bell,
  Search,
  LayoutGrid,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../hooks/useTheme";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import AnalyticsView from "./views/AnalyticsView";
import CandidatesView from "./views/CandidatesView";

function VacanciesView() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Вакансии</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Управление активными позициями и требованиями.
          </p>
        </div>
        <button className="bg-foreground text-background hover:bg-foreground/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
          Создать вакансию
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { id: 1, title: "Senior React Developer", cands: 12 },
          { id: 2, title: "Backend Engineer (Go)", cands: 8 },
          { id: 3, title: "Product Designer", cands: 24 },
        ].map((vac) => (
          <div
            key={vac.id}
            onClick={() => navigate(`/dashboard/vacancies/${vac.id}`)}
            className="p-5 border border-border bg-surface/50 rounded-xl hover:bg-surface transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Briefcase size={18} />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                Активна
              </span>
            </div>
            <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
              {vac.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              Требуется глубокое понимание стека и архитектуры высоконагруженных
              приложений.
            </p>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
              <span>{vac.cands} кандидатов</span>
              <span>Обновлено вчера</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CandidatesWrapper() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <CandidatesView />
    </motion.div>
  );
}

function VacancyCandidatesWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock finding vacancy title by id
  const titles: Record<string, string> = {
    "1": "Senior React Developer",
    "2": "Backend Engineer (Go)",
    "3": "Product Designer",
  };

  const title = id ? titles[id] || "Vacancy" : "Vacancy";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 w-fit"
      >
        <ArrowLeft size={16} />
        Back to Vacancies
      </button>
      <CandidatesView title={title} />
    </motion.div>
  );
}

function AnalyticsWrapper() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <AnalyticsView />
    </motion.div>
  );
}

export default function Dashboard() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: "Вакансии", path: "/dashboard", icon: Briefcase },
    { name: "Candidates", path: "/dashboard/resumes", icon: Users },
    { name: "Analytics", path: "/dashboard/analytics", icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-surface/50 flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
            <div className="w-3 h-3 rounded-full bg-accent" />
          </div>
          <span className="font-serif text-xl font-medium tracking-tight">
            Screenr
          </span>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/dashboard" &&
                location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <item.icon
                  size={18}
                  className={isActive ? "text-accent" : "text-muted-foreground"}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all w-full text-left">
            <Settings size={18} />
            Настройки
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex-1 max-w-md hidden md:flex items-center relative">
            <Search
              size={16}
              className="absolute left-3 text-muted-foreground"
            />
            <Input
              placeholder="Поиск кандидатов, вакансий..."
              className="pl-9 bg-muted/30 border-transparent focus-visible:border-border h-9"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Bell size={18} />
            </button>
            <div className="h-5 w-px bg-border mx-1" />
            <Avatar className="h-8 w-8 cursor-pointer border border-border">
              <AvatarImage src="" />
              <AvatarFallback className="bg-accent/20 text-accent text-xs">
                HR
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-background/50">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<VacanciesView />} />
                <Route
                  path="/vacancies/:id"
                  element={<VacancyCandidatesWrapper />}
                />
                <Route path="/resumes" element={<CandidatesWrapper />} />
                <Route path="/analytics" element={<AnalyticsWrapper />} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
