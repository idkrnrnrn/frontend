import { motion } from "motion/react";
import ScrollIndicator from "../ScrollIndicator";

export default function LandingView() {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto flex flex-col items-center"
    >
      <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-tight text-foreground mb-8">
        Вопрос найма,<br />
        <span className="text-accent italic">закрыт.</span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light mb-14">
        Screenr превращает хаотичные потоки резюме в структурированный граф компетенций. Мы находим скрытые сигналы и сопоставляем реальный опыт кандидатов с вашими техническими требованиями, исключая человеческий фактор.
      </p>

      <ScrollIndicator />
    </motion.div>
  );
}
