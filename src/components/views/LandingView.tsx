import { motion } from "motion/react";
import ScrollIndicator from "../ScrollIndicator";

export default function LandingView() {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto flex flex-col items-center"
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-foreground mb-8">
        Вопрос найма,
        <br />
        <span className="text-accent">закрыт.</span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light mb-14">
        HRush превращает хаотичные потоки резюме в структурированный граф
        компетенций. Мы находим скрытые сигналы и сопоставляем реальный опыт
        кандидатов с вашими техническими требованиями, исключая человеческий
        фактор.
      </p>

      <ScrollIndicator />
    </motion.div>
  );
}
