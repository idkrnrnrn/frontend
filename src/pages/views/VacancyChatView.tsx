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
      label: "Availability",
      prompt:
        "Before we begin, can you confirm the working setup for this role fits what you are looking for?",
      helper: "Keeps schedule and location aligned from the start.",
      placeholder: "Share any constraints around schedule or location.",
      kind: "choice",
      quickReplies:
        conditions.slice(0, 3).length > 0
          ? conditions.slice(0, 3)
          : [
              "Full-time works for me",
              "I need more detail on schedule",
              "I have location constraints",
            ],
    },
    {
      id: "experience",
      label: "Relevant experience",
      prompt: `How much hands-on experience do you have that is directly relevant to the ${vacancy.title} role?`,
      helper: "High-signal range so recruiters can triage quickly.",
      placeholder: "Summarize your most relevant years and scope.",
      kind: "choice",
      quickReplies: ["0-1 years", "2-3 years", "4-5 years", "6+ years"],
    },
    {
      id: "strength",
      label: "Strongest area",
      prompt:
        "Which requirement best represents the area where you can contribute with the most confidence?",
      helper: "Matches the candidate's strongest signal against the role.",
      placeholder: "If none of these fit, explain your strongest relevant area.",
      kind: "choice",
      quickReplies:
        mustHaves.slice(0, 3).length > 0
          ? mustHaves.slice(0, 3)
          : [
              "Hands-on execution",
              "Team collaboration",
              "Operational reliability",
            ],
    },
    {
      id: "recent-work",
      label: "Recent work",
      prompt:
        responsibilities[0] !== undefined
          ? `Tell us about the most relevant work you have done recently, especially anything connected to "${responsibilities[0]}".`
          : "Tell us about the most relevant work you have done recently.",
      helper: "A short concrete example is enough here.",
      placeholder: "Describe one recent example with scope, tools, and outcome.",
      kind: "text",
      quickReplies: [],
    },
    {
      id: "motivation",
      label: "Motivation",
      prompt:
        "Why does this role make sense for you right now, and what would make it a strong next step?",
      helper: "Focus on fit, not a long personal statement.",
      placeholder: "Keep it short and specific to the role.",
      kind: "text",
      quickReplies: [],
    },
    {
      id: "start-date",
      label: "Start date",
      prompt: "If the process moves forward, when could you realistically start?",
      helper: "Lets the recruiter understand readiness without another follow-up.",
      placeholder: "Share your notice period or earliest start date.",
      kind: "choice",
      quickReplies: [
        "Immediately",
        "Within 2 weeks",
        "Within 1 month",
        "More than 1 month",
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
      content: `Resume received: ${resumeName}. We will use it as reference during screening.`,
    },
    {
      id: "intro-1",
      role: "assistant",
      content: `Welcome. This is the screening flow for ${vacancy.title}. It takes about three minutes and moves one question at a time.`,
    },
    {
      id: "intro-2",
      role: "assistant",
      content:
        "You can answer with quick replies or write your own response. We will keep the process brief and focused.",
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
    (candidate) => candidate.stage !== "Archived",
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
      setResumeError("Please upload a PDF resume.");
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
            "Screening complete. Thank you. The team will review your resume together with these answers.",
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
              Exit chat
            </Link>
            <div className="truncate text-base font-semibold text-foreground sm:text-lg">
              {vacancy.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {activeCandidates} active candidates
            </div>
          </div>

          <div className="ml-4 w-24 shrink-0 sm:w-32">
            <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span>Progress</span>
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
                      Send your PDF resume first
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Upload one resume to begin the screening. Questions will appear immediately after the file is attached.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-border bg-white p-4">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="rounded-full bg-muted p-2 text-foreground">
                        <Paperclip size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          PDF only
                        </div>
                        <div className="text-sm leading-6 text-muted-foreground">
                          Keep the file concise and current.
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
                      {isUploadingResume ? "Uploading resume..." : "Upload PDF resume"}
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
                          Resume attached{resumeSizeLabel ? ` · ${resumeSizeLabel}` : ""}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveResume}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-white px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <X size={14} />
                      Replace
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
                      Preparing the next question
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
                          Screening complete
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          Thank you. The team will review your resume and responses, then contact you about the next step.
                        </p>
                        <button
                          type="button"
                          onClick={resetFlow}
                          className="mt-4 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          Restart screening
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
                {isUploadingResume ? "Uploading..." : "Upload PDF resume"}
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
                        ? "Conversation finished"
                        : currentQuestion?.label ?? "Answer"}
                    </div>
                    <div className="text-xs leading-5 text-muted-foreground">
                      {isComplete
                        ? "The screening is complete."
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
                          ? "Screening is complete."
                          : currentQuestion?.placeholder
                      }
                      className="min-h-[108px] resize-none rounded-[20px] border-border bg-white"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-muted-foreground">
                        Press Enter to send
                      </p>
                      <button
                        type="button"
                        onClick={() => advanceFlow(draft)}
                        disabled={isWaiting || isComplete || !draft.trim()}
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Send
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
