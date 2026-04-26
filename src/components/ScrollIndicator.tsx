import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div 
      className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ArrowRight className="size-4 rotate-90" />
      </motion.div>
    </motion.div>
  );
}
