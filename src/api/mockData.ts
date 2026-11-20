import type {
  Badge, ClassItem, Dispute, Kid, Lesson, ModerationItem, Prize, Quest, Student, Tariff,
} from '../types';
import type { SoftColor } from '../theme';

export const categories: { name: string; emoji: string; color: SoftColor }[] = [
  { name: 'Все', emoji: '✨', color: 'violet' },
  { name: 'Спорт', emoji: '⚽', color: 'coral' },
  { name: 'Творчество', emoji: '🎨', color: 'sun' },
  { name: 'Языки', emoji: '💬', color: 'sky' },
  { name: 'IT', emoji: '🤖', color: 'violet' },
  { name: 'Музыка', emoji: '🎹', color: 'pink' },
  { name: 'Танцы', emoji: '💃', color: 'coral' },
  { name: 'Школа', emoji: '📐', color: 'mint' },
];

export const classes: ClassItem[] = [
  { id: 'c1', emoji: '🥋', color: 'coral', name: 'Каратэ для начинающих', teacherId: 't1', teacherName: 'Ерлан Сапаров', legalForm: 'ИП', age: '6–10 лет', address: 'Есиль, Сыганак 18', distance: '1,2 км', rating: 4.9, reviews: 38, price: 3000, days: 'Пн, Ср, Пт · 17:00', category: 'Спорт', seats: 'Осталось 3 места', seatsStatus: 'bad', lang: 'рус/қаз', description: 'Основы каратэ, дисциплина и уверенность в себе. Экзамен на пояс каждые 3 месяца.', moderation: 'published' },
  { id: 'c2', emoji: '🎨', color: 'sun', name: 'Рисование и скетчинг', teacherId: 't2', teacherName: 'Студия «Түрлі түс»', legalForm: 'ТОО', age: '5–9 лет', address: 'пр. Республики 24', distance: '2,4 км', rating: 4.8, reviews: 21, price: 2500, days: 'Вт, Чт · 16:00', category: 'Творчество', seats: '8 мест', seatsStatus: 'ok', lang: 'қаз', description: 'Акварель, гуашь, скетчинг. Все материалы включены.', moderation: 'published' },
  { id: 'c3', emoji: '🇬🇧', color: 'sky', name: 'Speaking Club', teacherId: 't3', teacherName: 'Айгерим Нурланова', legalForm: 'ИП', age: '8–12 лет', address: 'Онлайн', distance: 'онлайн', rating: 5.0, reviews: 14, price: 4000, days: 'Сб · 11:00', category: 'Языки', seats: '2 места', seatsStatus: 'bad', lang: 'eng/рус', description: 'Разговорный английский в мини-группах до 6 человек.', moderation: 'published' },
  { id: 'c4', emoji: '🤖', color: 'violet', name: 'Робототехника LEGO', teacherId: 't4', teacherName: 'RoboKids', legalForm: 'ТОО', age: '7–11 лет', address: 'Есиль, Достык 5', distance: '0,8 км', rating: 4.7, reviews: 52, price: 5000, days: 'Вт, Чт · 18:00', category: 'IT', seats: 'Лист ожидания', seatsStatus: 'warn', lang: 'рус', description: 'Конструирование и программирование роботов LEGO Spike.', moderation: 'published' },
  { id: 'c5', emoji: '♟️', color: 'mint', name: 'Шахматы', teacherId: 't5', teacherName: 'Даурен Бекмуханов', legalForm: 'самозанятый', age: '6–14 лет', address: 'Кенесары 40', distance: '3,1 км', rating: 4.9, reviews: 17, price: 2000, days: 'Пн, Ср · 15:00', category: 'Спорт', seats: '5 мест', seatsStatus: 'ok', lang: 'қаз/рус', description: 'Шахматы с нуля до турнирного уровня.', moderation: 'published' },
  // занятия текущего преподавателя (Ерлан Сапаров, t1), не опубликованные
  { id: 'c6', emoji: '🏕️', color: 'mint', name: 'Летний лагерь каратэ', teacherId: 't1', teacherName: 'Ерлан Сапаров', legalForm: 'ИП', age: '7–12 лет', address: 'Бурабай', distance: '—', rating: 0, reviews: 0, price: 120000, days: 'Июль, 10 дней', category: 'Спорт', seats: '20 мест', seatsStatus: 'ok', lang: 'рус/қаз', description: 'Выездной лагерь.', moderation: 'pending', moderationNote: 'отправлено 19 ноября' },
  { id: 'c7', emoji: '🛡️', color: 'violet', name: 'Самооборона для подростков', teacherId: 't1', teacherName: 'Ерлан Сапаров', legalForm: 'ИП', age: '12–16 лет', address: 'Есиль, Сыганак 18', distance: '1,2 км', rating: 0, reviews: 0, price: 3500, days: 'Вт, Чт · 19:00', category: 'Спорт', seats: '12 мест', seatsStatus: 'ok', lang: 'рус', description: '', moderation: 'rework', moderationNote: 'Добавьте фото зала и правила отмены' },
];

export const tariffs: Tariff[] = [
  { id: 'trial', name: 'Пробное занятие', details: '1 занятие · 60 мин', price: 1500, lessons: 1 },
  { id: 'sub8', name: 'Абонемент 8 занятий', details: '30 дней · 2 500 ₸ за занятие', price: 20000, lessons: 8, best: true },
  { id: 'single', name: 'Разовое занятие', details: '1 занятие', price: 3000, lessons: 1 },
];

export const kids: Kid[] = [
  { id: 'k1', name: 'Алихан', age: 8, emoji: '👦' },
  { id: 'k2', name: 'Амина', age: 5, emoji: '👧' },
];

export const students: Student[] = [
  { id: 's1', name: 'Алихан К.', kidId: 'k1' },
  { id: 's2', name: 'Тимур Б.' },
  { id: 's3', name: 'Сабина А.' },
  { id: 's4', name: 'Айсултан М.' },
  { id: 's5', name: 'Мирас Е.' },
  { id: 's6', name: 'Дана Ж.' },
];

export const teacherLessons: Lesson[] = [
  { id: 'l1', classId: 'c1', weekday: 0, time: '17:00', groupName: 'Младшая группа', studentIds: ['s1', 's2', 's3', 's4', 's5', 's6'] },
  { id: 'l2', classId: 'c1', weekday: 0, time: '18:30', groupName: 'Старшая группа', studentIds: ['s2', 's4', 's6'] },
];

export const quests: Quest[] = [
  { id: 'q1', emoji: '🥋', color: 'coral', title: 'Сходи на все занятия недели', hint: '2 из 3 занятий', progress: 66, stars: 30, confirmBy: 'auto', state: 'active' },
  { id: 'q2', emoji: '📝', color: 'sky', title: 'Сделай домашку по английскому', hint: 'проверит Айгерим', progress: 0, stars: 15, confirmBy: 'teacher', state: 'active' },
  { id: 'q3', emoji: '🗣️', color: 'mint', title: 'Расскажи родителям, что нового узнал', hint: 'родитель подтвердит', progress: 0, stars: 10, confirmBy: 'parent', state: 'active', family: true },
];

export const prizes: Prize[] = [
  { id: 'p1', emoji: '🎬', color: 'violet', title: 'Поход в кино с папой', cost: 300, state: 'available' },
  { id: 'p2', emoji: '🍕', color: 'coral', title: 'Пицца в пятницу', cost: 200, state: 'available' },
  { id: 'p3', emoji: '🎮', color: 'sky', title: '+30 мин мультиков', cost: 100, state: 'available' },
  { id: 'p4', emoji: '⚽', color: 'mint', title: 'Новый мяч', cost: 600, state: 'available' },
];

export const badges: Badge[] = [
  { id: 'b1', emoji: '🥇', color: 'sun', title: 'Первое занятие', earned: true },
  { id: 'b2', emoji: '🔥', color: 'coral', title: '5 подряд', earned: true },
  { id: 'b3', emoji: '🥋', color: 'sun', title: 'Жёлтый пояс', earned: true },
  { id: 'b4', emoji: '📅', color: 'sky', title: 'Месяц без пропусков', earned: false },
  { id: 'b5', emoji: '🌟', color: 'violet', title: '3 секции', earned: false },
  { id: 'b6', emoji: '🏆', color: 'mint', title: 'Турнир', earned: false },
];

export const moderationQueue: ModerationItem[] = [
  { id: 'm1', title: 'Даурен Бекмуханов', subtitle: 'Шахматы · самозанятый', docs: [{ name: 'ИИН', ok: true }, { name: 'Справка о несудимости', ok: true }, { name: 'Диплом', ok: true }] },
  { id: 'm2', title: 'Студия «Арман»', subtitle: 'Танцы · ТОО', docs: [{ name: 'БИН', ok: true }, { name: 'Справка тренера', ok: false }] },
  { id: 'm3', title: 'Летний лагерь каратэ', subtitle: 'занятие · Ерлан Сапаров', docs: [{ name: 'Фото зала', ok: false }, { name: 'Тарифы', ok: true }] },
];

export const disputes: Dispute[] = [
  { id: 'd1', title: 'Возврат 15 000 ₸', meta: 'Мадина К. · Рисование · не посещено 6 из 8', tag: '2 дня', tagStatus: 'warn', amount: 15000 },
  { id: 'd2', title: 'Жалоба на отзыв', meta: 'Преподаватель оспаривает отзыв 1★', tag: 'Новая', tagStatus: 'new' },
  { id: 'd3', title: 'Занятие не состоялось', meta: '3 родителя · Робототехника, 19 ноября · возврат автоматически', tag: 'Авто', tagStatus: 'bad', amount: 15000 },
];

// Доход преподавателя по месяцам, ₸
export const teacherIncome = [
  { month: 'Июн', value: 52000 }, { month: 'Июл', value: 68000 }, { month: 'Авг', value: 60000 },
  { month: 'Сен', value: 84000 }, { month: 'Окт', value: 96000 }, { month: 'Ноя', value: 120000 },
];

export const teacherGross = { payments: 420000, refunds: 3000, hold: 40000, payoutDate: 'пятница, 27 ноября', card: 'Kaspi Gold •• 4512' };
export const platformMonth = { label: 'Ноябрь 2026', gmv: 12400000, kaspiShare: 0.81, teachersToPay: 146, payoutDate: '27 ноября' };
