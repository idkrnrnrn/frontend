import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Paperclip,
  SendHorizontal,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Candidate, Vacancy } from "@/data/mock";

type ScreeningQuestion = {
  id: string;
  label: string;
  prompt: string;
  helper: string;
  placeholder: string;
  kind: "choice" | "text";
  quickReplies: string[];
};

type ChatMessage = {
  id: string;
  role: "assistant" | "candidate";
  content: string;
};

type ResumeUpload = {
  name: string;
  size: number;
};

function splitBulletList(value?: string) {
  if (!value) return [];

  return value
    .split("\n")
    .map((item) => item.replace(/^[\-\u2022]\s*/, "").trim())
    .filter(Boolean);
}

function buildQuestions(vacancy: Vacancy): ScreeningQuestion[] {
  const mustHaves = splitBulletList(vacancy.mustHaves);
  const responsibilities = splitBulletList(vacancy.responsibilities);
  const conditions = splitBulletList(vacancy.conditions);

  return [
    {
      id: "availability",
      label: "Доступность",
      prompt:
        "Перед началом подтвердите, что формат работы по этой вакансии вам подходит.",
      helper: "Помогает сразу сверить график и локацию.",
      placeholder: "Укажите ограничения по графику или местоположению.",
      kind: "choice",
      quickReplies:
        conditions.slice(0, 3).length > 0
          ? conditions.slice(0, 3)
          : [
              "Полная занятость мне подходит",
              "Нужны детали по графику",
              "У меня есть ограничения по локации",
            ],
    },
    {
      id: "experience",
      label: "Релевантный опыт",
      prompt: `Сколько у вас практического опыта, напрямую релевантного роли ${vacancy.title}?`,
      helper: "Короткая оценка, чтобы рекрутер быстрее сориентировался.",
      placeholder: "Кратко опишите релевантные годы опыта и масштаб задач.",
      kind: "choice",
      quickReplies: ["0-1 год", "2-3 года", "4-5 лет", "6+ лет"],
    },
    {
      id: "strength",
      label: "Сильная сторона",
      prompt:
        "Какое требование лучше всего отражает область, в которой вы можете принести наибольшую пользу?",
      helper: "Сопоставляет самый сильный сигнал кандидата с ролью.",
      placeholder: "Если ничего не подходит, опишите свою самую сильную релевантную сторону.",
      kind: "choice",
      quickReplies:
        mustHaves.slice(0, 3).length > 0
          ? mustHaves.slice(0, 3)
          : [
              "Практическая реализация",
              "Командное взаимодействие",
              "Надёжность процессов",
            ],
    },
    {
      id: "recent-work",
      label: "Недавний опыт",
      prompt:
        responsibilities[0] !== undefined
          ? `Расскажите о самой релевантной недавней работе, особенно если она связана с "${responsibilities[0]}".`
          : "Расскажите о самой релевантной недавней работе.",
      helper: "Достаточно одного короткого и конкретного примера.",
      placeholder: "Опишите один недавний пример: задачи, инструменты и результат.",
      kind: "text",
      quickReplies: [],
    },
    {
      id: "motivation",
      label: "Мотивация",
      prompt:
        "Почему эта роль подходит вам именно сейчас и что сделает её сильным следующим шагом?",
      helper: "Сфокусируйтесь на соответствии роли, без длинного рассказа о себе.",
      placeholder: "Коротко и по делу, именно про эту роль.",
      kind: "text",
      quickReplies: [],
    },
    {
      id: "start-date",
      label: "Дата выхода",
      prompt: "Если процесс пойдёт дальше, когда вы реально сможете приступить к работе?",
      helper: "Позволяет понять готовность кандидата без лишних уточнений.",
      placeholder: "Укажите срок отработки или ближайшую возможную дату выхода.",
      kind: "choice",
      quickReplies: [
        "Сразу",
        "В течение 2 недель",
        "В течение 1 месяца",
        "Более чем через 1 месяц",
      ],
    },
  ];
}

function createTranscript(
  vacancy: Vacancy,
  questions: ScreeningQuestion[],
  resumeName: string,
): ChatMessage[] {
  const transcript: ChatMessage[] = [
    {
      id: "resume-received",
      role: "assistant",
      content: `Резюме получено: ${resumeName}. Мы будем использовать его как основу во время скрининга.`,
    },
    {
      id: "intro-1",
      role: "assistant",
      content: `Добро пожаловать. Это сценарий скрининга для вакансии ${vacancy.title}. Он занимает около трёх минут и проходит по одному вопросу за раз.`,
    },
    {
      id: "intro-2",
      role: "assistant",
      content:
        "Вы можете выбирать быстрые ответы или написать свой вариант. Постараемся пройти процесс коротко и по делу.",
    },
    {
      id: "question-0",
      role: "assistant",
      content: questions[0]?.prompt ?? "",
    },
  ];

  return transcript.filter((message) => message.content);
}

export default function VacancyChatView({
  vacancy,
  candidates,
}: {
  vacancy: Vacancy;
  candidates: Candidate[];
}) {
  const questions = useMemo(() => buildQuestions(vacancy), [vacancy]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resume, setResume] = useState<ResumeUpload | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [draft, setDraft] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const waitingTimerRef = useRef<number | null>(null);
  const uploadTimerRef = useRef<number | null>(null);

  const currentQuestion = questions[stepIndex];
  const hasResume = Boolean(resume);
  const questionCount = questions.length;
  const totalSteps = questionCount + 1;
  const completedUnits = Object.keys(answers).length + (hasResume ? 1 : 0);
  const progress = Math.round((completedUnits / totalSteps) * 100);
  const isComplete = Object.keys(answers).length >= questionCount;
  const resumeSizeLabel = resume
    ? `${(resume.size / 1024 / 1024).toFixed(2)} MB`
    : null;
  const activeCandidates = candidates.filter(
    (candidate) => candidate.stage !== "Архив",
  ).length;

  useEffect(() => {
    setMessages([]);
    setAnswers({});
    setResume(null);
    setResumeError("");
    setDraft("");
    setStepIndex(0);
    setIsUploadingResume(false);
    setIsWaiting(false);
  }, [vacancy, questions]);

  useEffect(() => {
    if (!transcriptRef.current) return;

    transcriptRef.current.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isWaiting, hasResume]);

  useEffect(() => {
    if (!hasResume || isComplete || isWaiting) return;
    composerRef.current?.focus();
  }, [currentQuestion, hasResume, isComplete, isWaiting]);

  useEffect(() => {
    return () => {
      if (waitingTimerRef.current !== null) {
        window.clearTimeout(waitingTimerRef.current);
      }
      if (uploadTimerRef.current !== null) {
        window.clearTimeout(uploadTimerRef.current);
      }
    };
  }, []);

  const triggerResumePicker = () => {
    resumeInputRef.current?.click();
  };

  const handleResumeSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setResumeError("Пожалуйста, загрузите резюме в формате PDF.");
      return;
    }

    if (uploadTimerRef.current !== null) {
      window.clearTimeout(uploadTimerRef.current);
    }

    setResumeError("");
    setIsUploadingResume(true);

    uploadTimerRef.current = window.setTimeout(() => {
      setResume({ name: file.name, size: file.size });
      setAnswers({});
      setMessages(createTranscript(vacancy, questions, file.name));
      setDraft("");
      setStepIndex(0);
      setIsWaiting(false);
      setIsUploadingResume(false);
    }, 620);
  };

  const handleRemoveResume = () => {
    if (waitingTimerRef.current !== null) {
      window.clearTimeout(waitingTimerRef.current);
    }
    if (uploadTimerRef.current !== null) {
      window.clearTimeout(uploadTimerRef.current);
    }

    setResume(null);
    setResumeError("");
    setMessages([]);
    setAnswers({});
    setDraft("");
    setStepIndex(0);
    setIsUploadingResume(false);
    setIsWaiting(false);
  };

  const resetFlow = () => {
    if (!resume) return;
    if (waitingTimerRef.current !== null) {
      window.clearTimeout(waitingTimerRef.current);
    }

    setMessages(createTranscript(vacancy, questions, resume.name));
    setAnswers({});
    setDraft("");
    setStepIndex(0);
    setIsWaiting(false);
  };

  const advanceFlow = (answer: string) => {
    if (!hasResume || !currentQuestion || isWaiting) return;

    const trimmed = answer.trim();
    if (!trimmed) return;

    const nextStep = stepIndex + 1;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: trimmed,
    }));
    setMessages((previous) => [
      ...previous,
      {
        id: `candidate-${currentQuestion.id}`,
        role: "candidate",
        content: trimmed,
      },
    ]);
    setDraft("");
    setIsWaiting(true);

    waitingTimerRef.current = window.setTimeout(() => {
      setIsWaiting(false);

      if (nextStep < questions.length) {
        setStepIndex(nextStep);
        setMessages((previous) => [
          ...previous,
          {
            id: `question-${nextStep}`,
            role: "assistant",
            content: questions[nextStep].prompt,
          },
        ]);
        return;
      }

      setStepIndex(nextStep);
      setMessages((previous) => [
        ...previous,
        {
          id: "completion-1",
          role: "assistant",
          content:
            "Скрининг завершён. Спасибо. Команда рассмотрит ваше резюме вместе с этими ответами.",
        },
      ]);
    }, 520);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-[linear-gradient(180deg,#eef5e9_0%,#f8faf7_22%,#ffffff_100%)]"
    >
      <input
        ref={resumeInputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleResumeSelected}
        className="hidden"
      />

      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-3 py-3 sm:px-4 sm:py-4">
        <div className="mb-3 flex items-center justify-between rounded-[24px] border border-border/80 bg-white/88 px-4 py-3 shadow-[0_10px_30px_rgba(5,49,10,0.06)] backdrop-blur">
          <div className="min-w-0">
            <Link
              to={`/dashboard/vacancies/${vacancy.id}`}
              className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} />
              Выйти из чата
            </Link>
            <div className="truncate text-base font-semibold text-foreground sm:text-lg">
              {vacancy.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {activeCandidates} активных кандидатов
            </div>
          </div>

          <div className="ml-4 w-24 shrink-0 sm:w-32">
            <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span>Прогресс</span>
              <span>{completedUnits}/{totalSteps}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-border/80">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[30px] border border-border/80 bg-white shadow-[0_28px_80px_rgba(5,49,10,0.08)]">
          <div
            ref={transcriptRef}
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5"
          >
            {!hasResume ? (
              <div className="my-auto rounded-[28px] border border-dashed border-border bg-[#f7faf5] p-4 sm:p-5">
                <div className="mx-auto flex max-w-md flex-col gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold tracking-tight text-foreground">
                      Сначала отправьте резюме в PDF
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Загрузите одно резюме, чтобы начать скрининг. Вопросы появятся сразу после прикрепления файла.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-border bg-white p-4">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="rounded-full bg-muted p-2 text-foreground">
                        <Paperclip size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          Только PDF
                        </div>
                        <div className="text-sm leading-6 text-muted-foreground">
                          Используйте актуальный и короткий файл.
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={triggerResumePicker}
                      disabled={isUploadingResume}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Upload size={16} />
                      {isUploadingResume ? "Загрузка резюме..." : "Загрузить PDF-резюме"}
                    </button>

                    {resumeError && (
                      <p className="mt-3 text-sm text-[#a14a2b]">
                        {resumeError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="sticky top-0 z-10 -mx-3 border-b border-border/70 bg-white/92 px-3 pb-3 pt-1 backdrop-blur sm:-mx-5 sm:px-5">
                  <div className="flex items-center justify-between gap-3 rounded-[22px] bg-[#f6faf3] px-3 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="rounded-full bg-white p-2 text-foreground">
                        <FileText size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-foreground">
                          {resume?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Резюме прикреплено{resumeSizeLabel ? ` · ${resumeSizeLabel}` : ""}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveResume}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-white px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <X size={14} />
                      Заменить
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex",
                        message.role === "candidate"
                          ? "justify-end"
                          : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[92%] rounded-[24px] px-4 py-3 text-sm leading-6 sm:max-w-[80%]",
                          message.role === "candidate"
                            ? "rounded-br-md bg-accent text-white shadow-[0_18px_35px_rgba(15,90,5,0.22)]"
                            : "rounded-bl-md border border-border bg-[#f8faf7] text-foreground",
                        )}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isWaiting && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="inline-flex items-center gap-2 rounded-[24px] rounded-bl-md border border-border bg-[#f8faf7] px-4 py-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                      </span>
                      Готовим следующий вопрос
                    </div>
                  </motion.div>
                )}

                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[24px] border border-[#d7ead2] bg-[#f1f8ec] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-accent/12 p-2 text-accent">
                        <CheckCircle2 size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base font-semibold text-foreground">
                          Скрининг завершён
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          Спасибо. Команда рассмотрит ваше резюме и ответы, после чего свяжется с вами по следующему шагу.
                        </p>
                        <button
                          type="button"
                          onClick={resetFlow}
                          className="mt-4 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          Начать заново
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>

          <div className="border-t border-border/80 bg-white px-3 py-3 sm:px-5 sm:py-4">
            {!hasResume ? (
              <button
                type="button"
                onClick={triggerResumePicker}
                disabled={isUploadingResume}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Upload size={16} />
                {isUploadingResume ? "Загрузка..." : "Загрузить PDF-резюме"}
              </button>
            ) : (
              <>
                {!isComplete && currentQuestion && currentQuestion.quickReplies.length > 0 && (
                  <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                    {currentQuestion.quickReplies.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => advanceFlow(option)}
                        disabled={isWaiting}
                        className="shrink-0 rounded-full border border-border bg-[#f6faf3] px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                <div className="rounded-[24px] border border-border bg-[#fbfcfa] p-3 sm:p-4">
                  <div className="mb-3">
                    <div className="text-sm font-medium text-foreground">
                      {isComplete
                        ? "Диалог завершён"
                        : currentQuestion?.label ?? "Ответ"}
                    </div>
                    <div className="text-xs leading-5 text-muted-foreground">
                      {isComplete
                        ? "Скрининг завершён."
                        : currentQuestion?.helper}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Textarea
                      ref={composerRef}
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          advanceFlow(draft);
                        }
                      }}
                      disabled={isWaiting || isComplete}
                      placeholder={
                        isComplete
                          ? "Скрининг завершён."
                          : currentQuestion?.placeholder
                      }
                      className="min-h-[108px] resize-none rounded-[20px] border-border bg-white"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-muted-foreground">
                        Нажмите Enter для отправки
                      </p>
                      <button
                        type="button"
                        onClick={() => advanceFlow(draft)}
                        disabled={isWaiting || isComplete || !draft.trim()}
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Отправить
                        <SendHorizontal size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
