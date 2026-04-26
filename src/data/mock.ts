export type Vacancy = {
  id: string;
  title: string;
  description: string;
  responsibilities?: string;
  mustHaves?: string;
  niceToHaves?: string;
  stopFactors?: string;
  conditions?: string;
  weights?: {
    experience: number;
    skills: number;
    schedule: number;
    location: number;
    motivation: number;
    readiness: number;
    communication: number;
  };
  status: "Активна" | "Закрыта";
  updatedAt: string;
};

export type Stage = "Новые" | "Отскриненные" | "Интервью" | "Оффер" | "Архив";

export type Candidate = {
  id: string;
  vacancyId: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  experience: string;
  matchScore: number;
  stage: Stage;
  addedAt: string;
};

export const initialVacancies: Vacancy[] = [
  {
    id: "1",
    title: "Старший React-разработчик",
    description:
      "Глубокое знание React, TypeScript и высоконагруженных архитектур.",
    responsibilities:
      "- Разрабатывать и поддерживать сложные продуктовые интерфейсы\n- Работать с дизайном и бэкендом над релизами\n- Улучшать производительность и надёжность приложения",
    mustHaves:
      "- 4+ года коммерческого опыта с React\n- Сильная база по TypeScript\n- Опыт принятия архитектурных решений по UI",
    niceToHaves:
      "- Опыт работы с дизайн-системами\n- Знакомство с инструментами экспериментов\n- Наставничество для младших инженеров",
    stopFactors:
      "- Нет недавнего практического владения фронтендом\n- Неясно рассказывает о выпущенных проектах\n- Не готов пересекаться по времени с продуктовой командой",
    conditions:
      "- Удалённо по Европе\n- Основные часы пересечения: 10:00-16:00 CET\n- Только full-time",
    weights: {
      experience: 30,
      skills: 25,
      schedule: 10,
      location: 10,
      motivation: 10,
      readiness: 10,
      communication: 5,
    },
    status: "Активна",
    updatedAt: "Вчера",
  },
  {
    id: "2",
    title: "Бэкенд-инженер (Go)",
    description:
      "Опыт с микросервисами на Go, PostgreSQL и Kubernetes.",
    responsibilities:
      "- Разрабатывать внутренние сервисы для процессов найма\n- Улучшать задержки API и восстановление после сбоев\n- Отвечать за наблюдаемость ключевых пайплайнов скрининга",
    mustHaves:
      "- Сильный продакшен-опыт с Go\n- Оптимизация запросов PostgreSQL\n- Опыт владения сервисами в Kubernetes",
    niceToHaves:
      "- Event-driven системы\n- Очереди сообщений\n- Опыт в B2B SaaS",
    stopFactors:
      "- Недостаточная глубина владения бэкендом\n- Нет примеров отладки в продакшене\n- Не готов к on-call дежурствам",
    conditions:
      "- Гибрид в Варшаве или удалённо из Польши\n- On-call дежурство раз в 6 недель\n- Только full-time",
    weights: {
      experience: 25,
      skills: 30,
      schedule: 10,
      location: 10,
      motivation: 10,
      readiness: 10,
      communication: 5,
    },
    status: "Активна",
    updatedAt: "2 дня назад",
  },
  {
    id: "3",
    title: "Продуктовый дизайнер",
    description: "Эксперт по Figma с сильным портфолио в B2B SaaS.",
    responsibilities:
      "- Вести end-to-end сценарии для скрининга и инструментов рекрутера\n- Превращать пользовательские исследования в готовые паттерны взаимодействия\n- Тесно сотрудничать с продуктом и разработкой",
    mustHaves:
      "- Сильное портфолио в B2B-сценариях\n- Высокий уровень владения Figma\n- Опыт запуска продуктовых изменений вместе с инженерами",
    niceToHaves:
      "- Опыт с дизайн-системами\n- Качественные пользовательские исследования\n- Опыт с маркетплейсами или hiring-продуктами",
    stopFactors:
      "- В портфолио не хватает глубины сценариев\n- Нет примеров системного мышления\n- Не может объяснить компромиссы в принятии решений",
    conditions:
      "- Возможна удалённая работа\n- Обязателен просмотр портфолио\n- Возможен переход с контракта в штат",
    weights: {
      experience: 20,
      skills: 25,
      schedule: 10,
      location: 5,
      motivation: 10,
      readiness: 10,
      communication: 20,
    },
    status: "Активна",
    updatedAt: "1 неделю назад",
  },
];

export const initialCandidates: Candidate[] = [
  {
    id: "c1",
    vacancyId: "1",
    name: "Anna Petrova",
    initials: "AP",
    role: "Старший платформенный инженер",
    company: "Stripe",
    experience: "6 лет",
    matchScore: 92,
    stage: "Новые",
    addedAt: "2 мин назад",
  },
  {
    id: "c2",
    vacancyId: "2",
    name: "Dmitry Kuznetsov",
    initials: "DK",
    role: "Бэкенд-инженер",
    company: "Revolut",
    experience: "5 лет",
    matchScore: 88,
    stage: "Интервью",
    addedAt: "1 ч назад",
  },
  {
    id: "c3",
    vacancyId: "1",
    name: "Maria Collins",
    initials: "MC",
    role: "Ведущий инженер-программист",
    company: "Shopify",
    experience: "7 лет",
    matchScore: 85,
    stage: "Отскриненные",
    addedAt: "2 ч назад",
  },
  {
    id: "c4",
    vacancyId: "2",
    name: "Ivan Lebedev",
    initials: "IL",
    role: "Техлид",
    company: "Tinkoff",
    experience: "6 лет",
    matchScore: 82,
    stage: "Оффер",
    addedAt: "4 ч назад",
  },
  {
    id: "c5",
    vacancyId: "2",
    name: "Ethan Wong",
    initials: "EW",
    role: "Старший бэкенд-инженер",
    company: "Plaid",
    experience: "5 лет",
    matchScore: 81,
    stage: "Отскриненные",
    addedAt: "5 ч назад",
  },
  {
    id: "c6",
    vacancyId: "1",
    name: "Rohan Singh",
    initials: "RS",
    role: "Инженер-программист",
    company: "AWS",
    experience: "4 года",
    matchScore: 78,
    stage: "Новые",
    addedAt: "6 ч назад",
  },
  {
    id: "c7",
    vacancyId: "3",
    name: "Nina Brown",
    initials: "NB",
    role: "Продуктовый дизайнер",
    company: "Databricks",
    experience: "4 года",
    matchScore: 75,
    stage: "Новые",
    addedAt: "7 ч назад",
  },
  {
    id: "c8",
    vacancyId: "3",
    name: "Alex Johnson",
    initials: "AJ",
    role: "UI/UX-дизайнер",
    company: "Figma",
    experience: "3 года",
    matchScore: 95,
    stage: "Интервью",
    addedAt: "1 д назад",
  },
];
