import { useState } from "react";
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
  Copy,
  MessageSquareText,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import AnalyticsView from "./views/AnalyticsView";
import CandidatesView from "./views/CandidatesView";
import VacancyChatView from "./views/VacancyChatView";
import {
  initialVacancies,
  initialCandidates,
  Vacancy,
  Candidate,
} from "../data/mock";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function VacanciesView({
  vacancies,
  onCreate,
}: {
  vacancies: Vacancy[];
  onCreate: (v: Partial<Vacancy>) => void;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [copiedVacancyId, setCopiedVacancyId] = useState<string | null>(null);

  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [duties, setDuties] = useState("");
  const [mustHaves, setMustHaves] = useState("");
  const [niceToHaves, setNiceToHaves] = useState("");
  const [stopFactors, setStopFactors] = useState("");
  const [conditions, setConditions] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onCreate({
      title: newTitle,
      description: newDesc,
      responsibilities: duties,
      mustHaves: mustHaves,
      niceToHaves: niceToHaves,
      stopFactors: stopFactors,
      conditions: conditions,
    });

    setNewTitle("");
    setNewDesc("");
    setDuties("");
    setMustHaves("");
    setNiceToHaves("");
    setStopFactors("");
    setConditions("");
    setOpen(false);
  };

  const handleCopyChatLink = async (vacancyId: string) => {
    const url =
      typeof window === "undefined"
        ? `/dashboard/vacancies/${vacancyId}/chat`
        : `${window.location.origin}/dashboard/vacancies/${vacancyId}/chat`;

    try {
      await navigator.clipboard.writeText(url);
      setCopiedVacancyId(vacancyId);
      window.setTimeout(() => setCopiedVacancyId(null), 1600);
    } catch {
      setCopiedVacancyId(null);
    }
  };

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
          <h2 className="text-2xl font-semibold text-foreground">Вакансии</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Управление активными позициями и требованиями.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-accent text-white hover:bg-accent/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Создать вакансию
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-background border-border rounded-xl p-0">
            <div className="px-6 py-4 border-b border-border sticky top-0 bg-background z-10">
              <DialogTitle className="text-foreground text-xl">
                Набор критериев для скрининга
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Для AI вакансия — это не текст, а параметры фильтрации.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="title"
                    className="text-foreground font-semibold"
                  >
                    Название вакансии
                  </Label>
                  <Input
                    id="title"
                    placeholder="Например: Frontend Разработчик"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="desc"
                    className="text-foreground font-semibold"
                  >
                    Краткое описание роли
                  </Label>
                  <Input
                    id="desc"
                    placeholder="В чем суть позиции..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="duties"
                  className="text-foreground font-semibold"
                >
                  Обязанности
                </Label>
                <p className="text-xs text-muted-foreground">
                  Что кандидат будет делать (по пунктам).
                </p>
                <Textarea
                  id="duties"
                  placeholder="- Разрабатывать UI компоненты&#10;- Работать с API..."
                  value={duties}
                  onChange={(e) => setDuties(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="musthaves"
                    className="text-foreground font-semibold"
                  >
                    Обязательные требования
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Must-have. Если нет — AI отклонит.
                  </p>
                  <Textarea
                    id="musthaves"
                    placeholder="- Опыт React от 3 лет&#10;- Знание TypeScript..."
                    value={mustHaves}
                    onChange={(e) => setMustHaves(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="nicetohaves"
                    className="text-foreground font-semibold"
                  >
                    Желательные требования
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Повышает score, но не блокирует.
                  </p>
                  <Textarea
                    id="nicetohaves"
                    placeholder="- Опыт с WebGL&#10;- Навыки дизайна..."
                    value={niceToHaves}
                    onChange={(e) => setNiceToHaves(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="stopfactors"
                    className="text-foreground font-semibold text-red-500"
                  >
                    Стоп-факторы
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    То, что почти точно не подходит.
                  </p>
                  <Textarea
                    id="stopfactors"
                    placeholder="- Частая смена работы (прыгун)&#10;- Нет опыта в команде..."
                    value={stopFactors}
                    onChange={(e) => setStopFactors(e.target.value)}
                    className="focus-visible:ring-red-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="conditions"
                    className="text-foreground font-semibold"
                  >
                    Условия
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    График, локация, зарплата, гибрид.
                  </p>
                  <Textarea
                    id="conditions"
                    placeholder="- Удаленка / Офис Мск&#10;- Гибкое начало дня..."
                    value={conditions}
                    onChange={(e) => setConditions(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Label className="text-foreground font-semibold">
                  Веса критериев (AI Scoring)
                </Label>
                <p className="text-xs text-muted-foreground mb-2">
                  HR задает, что важнее именно для этой вакансии.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Опыт", "Навыки", "График", "Мотивация"].map(
                    (criterion) => (
                      <div
                    key={criterion}
                    className="flex flex-col gap-1.5"
                  >
                        <span className="text-xs text-foreground">
                          {criterion}
                        </span>
                        <select className="bg-surface border border-border text-xs rounded-md px-2 py-1 outline-none focus:border-foreground">
                          <option value="high">Высокий</option>
                          <option value="medium">Средний</option>
                          <option value="low">Низкий</option>
                        </select>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <DialogFooter className="mt-4 pt-4 border-t border-border sticky bottom-0 bg-background">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Отмена
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
                >
                  Создать вакансию
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vacancies.map((vac) => (
          <div
            key={vac.id}
            onClick={() => navigate(`/dashboard/vacancies/${vac.id}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate(`/dashboard/vacancies/${vac.id}`);
              }
            }}
            role="button"
            tabIndex={0}
            className="p-5 border border-border bg-surface/50 rounded-lg hover:bg-surface transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-md border border-border bg-surface flex items-center justify-center text-muted-foreground">
                <Briefcase size={18} />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 border border-border bg-surface text-foreground rounded-md shadow-sm">
                {vac.status}
              </span>
            </div>
            <h3 className="font-semibold text-lg text-foreground transition-colors">
              {vac.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {vac.description}
            </p>
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{vac.id}</span>
                <span>Обновлено {vac.updatedAt}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/dashboard/vacancies/${vac.id}/chat`);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent/90"
                >
                  <MessageSquareText size={14} />
                  Открыть чат
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    void handleCopyChatLink(vac.id);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Copy size={14} />
                  {copiedVacancyId === vac.id ? "Ссылка скопирована" : "Копировать ссылку"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CandidatesWrapper({
  candidates,
  vacancies,
}: {
  candidates: Candidate[];
  vacancies: Vacancy[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <CandidatesView candidates={candidates} vacancies={vacancies} />
    </motion.div>
  );
}

function VacancyCandidatesWrapper({
  candidates,
  vacancies,
}: {
  candidates: Candidate[];
  vacancies: Vacancy[];
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const vacancy = vacancies.find((v) => v.id === id);
  const title = vacancy ? vacancy.title : "Вакансия";

  const handleCopyChatLink = async () => {
    if (!id) return;

    const url =
      typeof window === "undefined"
        ? `/dashboard/vacancies/${id}/chat`
        : `${window.location.origin}/dashboard/vacancies/${id}/chat`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

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
        Назад к вакансиям
      </button>
      <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-border bg-surface/40 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <div className="min-w-0">
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Дополнительный сценарий
          </div>
          <h2 className="mt-2 text-xl font-semibold text-foreground">
            Воронка кандидатов и управляемый чат-скрининг
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            Оставьте здесь структурированный обзор вакансии или откройте мобильный чат, если нужен сценарий скрининга для кандидата.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate(`/dashboard/vacancies/${id}/chat`)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            <MessageSquareText size={15} />
            Открыть чат-скрининг
          </button>
          <button
            type="button"
            onClick={() => void handleCopyChatLink()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Copy size={15} />
            {copied ? "Ссылка скопирована" : "Копировать ссылку на чат"}
          </button>
        </div>
      </div>
      <CandidatesView
        title={title}
        candidates={candidates}
        vacancies={vacancies}
        selectedVacancyId={id}
      />
    </motion.div>
  );
}

function VacancyChatWrapper({
  candidates,
  vacancies,
}: {
  candidates: Candidate[];
  vacancies: Vacancy[];
}) {
  const { id } = useParams();
  const vacancy = vacancies.find((item) => item.id === id);

  if (!vacancy) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-border bg-surface/50 p-8"
      >
        <h2 className="text-xl font-semibold text-foreground">
          Вакансия не найдена
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Для запуска этого сценария чата нужна существующая вакансия.
        </p>
      </motion.div>
    );
  }

  return (
    <VacancyChatView
      vacancy={vacancy}
      candidates={candidates.filter((candidate) => candidate.vacancyId === id)}
    />
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
  const location = useLocation();

  const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  const handleCreateVacancy = (data: Partial<Vacancy>) => {
    const id = Date.now().toString();
    setVacancies([
      ...vacancies,
      {
        id,
        title: data.title || "Новая вакансия",
        description:
          data.description || "Автоматически созданное описание вакансии для MVP.",
        status: "Активна",
        updatedAt: "только что",
      },
    ]);
  };

  const navItems = [
    { name: "Вакансии", path: "/dashboard", icon: Briefcase },
    { name: "Кандидаты", path: "/dashboard/resumes", icon: Users },
    { name: "Аналитика", path: "/dashboard/analytics", icon: BarChart },
  ];

  const routes = (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <VacanciesView
              vacancies={vacancies}
              onCreate={handleCreateVacancy}
            />
          }
        />
        <Route
          path="/vacancies/:id"
          element={
            <VacancyCandidatesWrapper
              candidates={candidates}
              vacancies={vacancies}
            />
          }
        />
        <Route
          path="/vacancies/:id/chat"
          element={
            <VacancyChatWrapper
              candidates={candidates}
              vacancies={vacancies}
            />
          }
        />
        <Route
          path="/resumes"
          element={
            <CandidatesWrapper
              candidates={candidates}
              vacancies={vacancies}
            />
          }
        />
        <Route path="/analytics" element={<AnalyticsWrapper />} />
      </Routes>
    </AnimatePresence>
  );

  const isChatRoute = /^\/dashboard\/vacancies\/[^/]+\/chat\/?$/.test(
    location.pathname,
  );

  if (isChatRoute) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        {routes}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-surface/50 flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-white">
            <div className="w-3 h-3 rounded-sm bg-white" />
          </div>
          <span className="font-semibold text-xl tracking-tight">HRush</span>
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
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <item.icon
                  size={18}
                  className={
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }
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
            <button className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Bell size={18} />
            </button>
            <div className="h-5 w-px bg-border mx-1" />
            <Avatar className="h-8 w-8 rounded-md cursor-pointer border border-border">
              <AvatarImage src="" />
              <AvatarFallback className="bg-muted text-foreground rounded-md text-xs">
                HR
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-background/50">
          <div className="max-w-6xl mx-auto">
            {routes}
          </div>
        </main>
      </div>
    </div>
  );
}
