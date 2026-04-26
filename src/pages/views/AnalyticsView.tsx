import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  UserPlus,
  Clock,
  Sparkles,
  Calendar,
} from "lucide-react";

const pipelineData = [
  { name: "21 апр", value: 6 },
  { name: "23 апр", value: 16 },
  { name: "26 апр", value: 15 },
  { name: "28 апр", value: 20 },
  { name: "1 мая", value: 22 },
  { name: "3 мая", value: 15 },
  { name: "5 мая", value: 24 },
  { name: "8 мая", value: 30 },
  { name: "12 мая", value: 35 },
  { name: "14 мая", value: 26 },
  { name: "16 мая", value: 18 },
  { name: "19 мая", value: 22 },
  { name: "21 мая", value: 25 },
  { name: "23 мая", value: 36 },
];

const pieData = [
  { name: "Бэкенд-инженер", value: 28 },
  { name: "Платформенный инженер", value: 18 },
  { name: "Фронтенд-инженер", value: 10 },
  { name: "DevOps-инженер", value: 8 },
  { name: "Другие", value: 8 },
];

export default function AnalyticsView() {
  return (
    <div className="flex flex-col gap-6 w-full text-foreground max-w-[1200px] mx-auto pb-10">
      <div className="flex flex-col mb-4">
        <h1 className="text-2xl font-semibold mb-1">Обзор аналитики</h1>
        <p className="text-muted-foreground text-sm">
          Что происходит с наймом прямо сейчас.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Candidates Analyzed */}
        <div className="bg-surface border border-border rounded-lg p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-border/50 flex items-center justify-center text-muted-foreground">
              <UserPlus size={16} />
            </div>
            <span className="text-2xl font-mono font-medium">127</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Кандидатов проанализировано
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <ArrowUp size={12} />
              <span className="text-foreground font-medium">12%</span>
              <span className="text-muted-foreground ml-1 font-sans">
                к прошлым 7 дням
              </span>
            </div>
          </div>
        </div>

        {/* Strong Matches */}
        <div className="bg-surface border border-border rounded-lg p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-surface border border-border flex items-center justify-center text-foreground">
              <Sparkles size={16} />
            </div>
            <span className="text-2xl font-mono font-medium">12</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Сильных совпадений
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <ArrowUp size={12} />
              <span className="text-foreground font-medium">8%</span>
              <span className="text-muted-foreground ml-1 font-sans">
                к прошлым 7 дням
              </span>
            </div>
          </div>
        </div>

        {/* To Review */}
        <div className="bg-surface border border-border rounded-lg p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-border/50 flex items-center justify-center text-muted-foreground">
              <Clock size={16} />
            </div>
            <span className="text-2xl font-mono font-medium">23</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">На проверке</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <ArrowDown size={12} />
              <span className="text-foreground font-medium">4%</span>
              <span className="text-muted-foreground ml-1 font-sans">
                к прошлым 7 дням
              </span>
            </div>
          </div>
        </div>

        {/* Interviews */}
        <div className="bg-surface border border-border rounded-lg p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-border/50 flex items-center justify-center text-muted-foreground">
              <Calendar size={16} />
            </div>
            <span className="text-2xl font-mono font-medium">4</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Интервью</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <ArrowUp size={12} />
              <span className="text-foreground font-medium">2</span>
              <span className="text-muted-foreground ml-1 font-sans">
                к прошлым 7 дням
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pipeline Overview */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Обзор воронки</h3>
            <select className="bg-transparent text-sm text-muted-foreground border border-border rounded-md px-2 py-1 outline-none">
              <option>Этот месяц</option>
            </select>
          </div>

          <div className="flex justify-between items-end px-4 relative flex-1 min-h-[160px] pb-8 pt-4">
            {/* connecting line behind the dots */}
            <div className="absolute top-[40%] left-0 right-0 h-px bg-border -z-10" />

            <div className="flex flex-col items-center gap-2 relative z-10">
              <span className="text-sm text-muted-foreground">Найдено</span>
              <span className="text-xl font-mono font-medium mb-4">412</span>
              <div className="w-2 h-2 rounded-full bg-foreground" />
            </div>

            <div className="flex flex-col items-center gap-2 relative z-10">
              <span className="text-sm text-muted-foreground">Отскринено</span>
              <span className="text-xl font-mono font-medium mb-4">127</span>
              <div className="w-2 h-2 rounded-full bg-foreground" />
            </div>

            <div className="flex flex-col items-center gap-2 relative z-10">
              <span className="text-sm text-muted-foreground">В шорт-листе</span>
              <span className="text-xl font-mono font-medium mb-4">23</span>
              <div className="w-2 h-2 rounded-full bg-foreground" />
            </div>

            <div className="flex flex-col items-center gap-2 relative z-10">
              <span className="text-sm text-muted-foreground">Интервью</span>
              <span className="text-xl font-mono font-medium mb-4">4</span>
              <div className="w-2 h-2 rounded-full bg-foreground" />
            </div>

            <div className="flex flex-col items-center gap-2 relative z-10">
              <span className="text-sm text-muted-foreground">Оффер</span>
              <span className="text-xl font-mono font-medium mb-4">3</span>
              <div className="w-2 h-2 rounded-full bg-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-border mt-auto">
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background/50 border border-border">
              <span className="text-sm font-mono font-medium">30.8%</span>
              <span className="text-[10px] text-muted-foreground">
                конверсия
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background/50 border border-border">
              <span className="text-sm font-mono font-medium">18.1%</span>
              <span className="text-[10px] text-muted-foreground">
                конверсия
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background/50 border border-border">
              <span className="text-sm font-mono font-medium">17.4%</span>
              <span className="text-[10px] text-muted-foreground">
                конверсия
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background/50 border border-border">
              <span className="text-sm font-mono font-medium">75%</span>
              <span className="text-[10px] text-muted-foreground">
                конверсия
              </span>
            </div>
          </div>
        </div>

        {/* Matches over time */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Совпадения по времени</h3>
            <select className="bg-transparent text-sm text-muted-foreground border border-border rounded-md px-2 py-1 outline-none">
              <option>Последние 30 дней</option>
            </select>
          </div>

          <div className="flex-1 w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={pipelineData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    borderRadius: "6px",
                  }}
                  itemStyle={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-mono)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--foreground)"
                  strokeWidth={2}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-border">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-medium">72</span>
              <span className="text-sm text-muted-foreground">
                Всего совпадений
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
              <ArrowUp size={14} />
              <span className="text-foreground font-medium">16%</span>
              <span className="text-muted-foreground ml-1 font-sans">
                к предыдущим 30 дням
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top roles */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-sm flex flex-col gap-6">
          <h3 className="font-semibold text-lg">Топ ролей по совпадениям</h3>
          <div className="flex flex-col gap-4 w-full mt-2">
            {pieData.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground w-40">{item.name}</span>
                <div className="flex-1 flex items-center gap-3 mx-4">
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full opacity-80"
                      style={{ width: `${(item.value / 72) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end w-16 gap-2 font-mono">
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Signals */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-6">Ключевые сигналы</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "Системный дизайн", val: 80 },
                { name: "Бэкенд-разработка", val: 75 },
                { name: "Лидерство", val: 85 },
                { name: "Скорость исполнения", val: 65 },
                { name: "Продуктовое мышление", val: 60 },
              ].map((sig, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground w-40">{sig.name}</span>
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full"
                      style={{ width: `${sig.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[220px] bg-muted/50 border border-border rounded-lg p-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-foreground mb-3 font-semibold">
              <Sparkles size={16} />
              <span className="text-sm">Инсайты</span>
            </div>
            <p className="text-sm text-foreground mb-2">
              Воронка выглядит здоровой.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Конверсия в этап интервью выросла на 8% по сравнению с прошлым месяцем.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
