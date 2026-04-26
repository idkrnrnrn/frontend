import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterView({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, scale: 1.05, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto flex flex-col"
    >
      <div className="bg-surface/80 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-6 text-left relative overflow-hidden">
        <div className="flex flex-col">
          <h2 className="text-3xl font-serif text-foreground mb-2">Начать работу</h2>
          <p className="text-sm text-muted-foreground">Создайте рабочее пространство Screenr для вашей команды.</p>
        </div>
        
        <div className="flex flex-col gap-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="company">Название компании</Label>
            <Input id="company" placeholder="Acme Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Рабочий email</Label>
            <Input id="email" type="email" placeholder="name@company.com" />
          </div>
        </div>

        <Button 
          onClick={onContinue}
          className="mt-2 w-full"
        >
          Продолжить
        </Button>
      </div>
    </motion.div>
  );
}
