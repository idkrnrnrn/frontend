import { motion } from "motion/react";

export default function DashboardView() {
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, scale: 1.05, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="w-full max-w-5xl mx-auto flex flex-col text-left"
    >
      <header className="flex items-center justify-between mb-8 border-b border-border pb-6">
        <h2 className="text-4xl font-serif">Кандидаты</h2>
        <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center font-bold border border-accent/30 shadow-inner">HR</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface/60 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <span className="text-muted-foreground text-xs uppercase tracking-widest font-semibold">Новые отклики</span>
          <span className="text-5xl font-serif">142</span>
        </div>
        <div className="bg-surface/60 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <span className="text-muted-foreground text-xs uppercase tracking-widest font-semibold">Прошли скрининг</span>
          <span className="text-5xl font-serif text-accent">38</span>
        </div>
        <div className="bg-surface/60 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <span className="text-muted-foreground text-xs uppercase tracking-widest font-semibold">Отказ AI</span>
          <span className="text-5xl font-serif">104</span>
        </div>
      </div>

      <div className="mt-8 border border-border rounded-2xl bg-surface/60 backdrop-blur-md overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-muted/20">
          <span className="text-sm font-medium text-foreground">Последние разобранные профили</span>
        </div>
        <div className="p-12 flex items-center justify-center text-muted-foreground h-64 italic font-serif text-xl opacity-60">
          Здесь будет граф компетенций...
        </div>
      </div>
    </motion.div>
  );
}
