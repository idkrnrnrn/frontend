import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RegisterView({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto flex flex-col"
    >
      <div className="bg-surface border border-border p-8 rounded-lg shadow-sm flex flex-col text-left relative overflow-hidden">
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                С возвращением
              </h2>
              <p className="text-sm text-muted-foreground">
                Войдите в рабочее пространство Screenr.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="login-email">Рабочий email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <Button onClick={onContinue} className="mt-2 w-full">
              Войти
            </Button>
          </TabsContent>

          <TabsContent value="register" className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Начать работу
              </h2>
              <p className="text-sm text-muted-foreground">
                Создайте рабочее пространство Screenr для вашей команды.
              </p>
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

            <Button onClick={onContinue} className="mt-2 w-full">
              Продолжить
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
