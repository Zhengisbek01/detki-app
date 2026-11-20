import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import * as db from '../api/mockData';
import type {
  Attendance, Badge, Booking, ClassItem, Dispute, Kid, Lang, ModerationItem, Prize, Quest, Role, Sticker,
} from '../types';
import { uid } from '../utils/format';

// ID ребёнка, под которым заходит «детский» режим и который учится у тренера (студент s1)
export const CHILD_KID_ID = 'k1';
export const CHILD_STUDENT_ID = 's1';
export const STARS_PER_LESSON = 10;
export const STARS_PER_LEVEL = 150;

export interface AppState {
  onboarded: boolean;
  role: Role;
  lang: Lang;
  phone: string;
  kids: Kid[];
  bookings: Booking[];
  // геймификация ребёнка
  stars: number; // баланс
  totalStars: number; // за всё время — от него считается уровень
  streakWeeks: number;
  freezeLeft: number;
  quests: Quest[];
  prizes: Prize[];
  badges: Badge[];
  stickers: Sticker[];
  teamGoal: { current: number; target: number };
  // преподаватель
  myClasses: ClassItem[];
  attendance: Record<string, Record<string, Attendance>>; // lessonId → studentId → отметка
  praise: Record<string, Record<string, string>>; // lessonId → studentId → эмодзи
  // админ
  moderation: ModerationItem[];
  disputes: Dispute[];
}

const initialState: AppState = {
  onboarded: false,
  role: 'parent',
  lang: 'ru',
  phone: '',
  kids: db.kids,
  bookings: [],
  stars: 240,
  totalStars: 520,
  streakWeeks: 4,
  freezeLeft: 1,
  quests: db.quests,
  prizes: db.prizes,
  badges: db.badges,
  stickers: [{ id: 'st0', emoji: '💪', from: 'Ерлан Сапаров', date: '20 ноября' }],
  teamGoal: { current: 34, target: 50 },
  myClasses: db.classes.filter((c) => c.teacherId === 't1'),
  attendance: {},
  praise: {},
  moderation: db.moderationQueue,
  disputes: db.disputes,
};

type Action =
  | { type: 'hydrate'; state: AppState }
  | { type: 'patch'; patch: Partial<AppState> }
  | { type: 'reset' };

function reducer(s: AppState, a: Action): AppState {
  switch (a.type) {
    case 'hydrate':
      return { ...initialState, ...a.state };
    case 'patch':
      return { ...s, ...a.patch };
    case 'reset':
      return initialState;
  }
}

const STORAGE_KEY = 'detki-state-v1';

/** Изменение звёзд и квеста «все занятия недели» при отметке посещения ребёнка */
function childAttendanceDelta(s: AppState, dir: 1 | -1): Partial<AppState> {
  let stars = STARS_PER_LESSON * dir;
  const quests = s.quests.map((q) => {
    if (q.id !== 'q1' || q.state === 'done') return q;
    const progress = Math.min(100, Math.max(0, q.progress + 34 * dir));
    if (progress >= 100) {
      stars += q.stars; // квест выполнен автоматически
      return { ...q, progress: 100, state: 'done' as const, hint: '3 из 3 занятий' };
    }
    return { ...q, progress };
  });
  return { quests, stars: s.stars + stars, totalStars: s.totalStars + stars };
}

function useActions(s: AppState, patch: (p: Partial<AppState>) => void) {
  const addStars = (n: number, extra: Partial<AppState> = {}) =>
    patch({ stars: s.stars + n, totalStars: s.totalStars + n, ...extra });

  return {
    // --- общее
    login: (phone: string, role: Role) => patch({ phone, role, onboarded: true }),
    setRole: (role: Role) => patch({ role }),
    setLang: (lang: Lang) => patch({ lang }),
    logout: () => patch({ onboarded: false }),

    // --- родитель
    addKid: (name: string, age: number) =>
      patch({ kids: [...s.kids, { id: uid('kid'), name, age, emoji: age < 7 ? '🧒' : '🧑' }] }),
    addBooking: (b: Omit<Booking, 'id' | 'createdAt'>) => {
      const booking: Booking = { ...b, id: uid('bk'), createdAt: new Date().toISOString() };
      patch({ bookings: [booking, ...s.bookings] });
      return booking;
    },
    confirmQuest: (questId: string) => {
      const q = s.quests.find((x) => x.id === questId);
      if (!q || q.state === 'done') return;
      addStars(q.stars, { quests: s.quests.map((x) => (x.id === questId ? { ...x, state: 'done', progress: 100 } : x)) });
    },
    addPrize: (title: string, cost: number, emoji = '🎁') =>
      patch({ prizes: [...s.prizes, { id: uid('pr'), title, cost, emoji, color: 'pink', state: 'available' }] }),
    givePrize: (prizeId: string) => {
      const p = s.prizes.find((x) => x.id === prizeId);
      if (!p || p.state !== 'requested' || s.stars < p.cost) return;
      patch({ stars: s.stars - p.cost, prizes: s.prizes.map((x) => (x.id === prizeId ? { ...x, state: 'given' } : x)) });
    },
    useFreeze: () => s.freezeLeft > 0 && patch({ freezeLeft: s.freezeLeft - 1 }),

    // --- ребёнок
    markQuestDone: (questId: string) =>
      patch({ quests: s.quests.map((x) => (x.id === questId && x.state === 'active' ? { ...x, state: 'waiting', progress: 100 } : x)) }),
    requestPrize: (prizeId: string) => {
      const p = s.prizes.find((x) => x.id === prizeId);
      if (!p || p.state !== 'available' || s.stars < p.cost) return false;
      patch({ prizes: s.prizes.map((x) => (x.id === prizeId ? { ...x, state: 'requested' } : x)) });
      return true;
    },

    // --- преподаватель
    markAttendance: (lessonId: string, studentId: string, value: Attendance) => {
      const prev = s.attendance[lessonId]?.[studentId];
      const attendance = { ...s.attendance, [lessonId]: { ...s.attendance[lessonId], [studentId]: value } };
      const becamePresent = value === 'present' && prev !== 'present';
      const wasPresent = prev === 'present' && value !== 'present';
      const teamDelta = becamePresent ? 1 : wasPresent ? -1 : 0;
      const teamGoal = { ...s.teamGoal, current: Math.max(0, s.teamGoal.current + teamDelta) };
      // Звёзды ребёнку только за реальное посещение (правило геймификации)
      if (studentId === CHILD_STUDENT_ID && (becamePresent || wasPresent)) {
        patch({ attendance, teamGoal, ...childAttendanceDelta(s, becamePresent ? 1 : -1) });
      } else {
        patch({ attendance, teamGoal });
      }
    },
    markAllPresent: (lessonId: string, studentIds: string[]) => {
      const cur = s.attendance[lessonId] ?? {};
      const newly = studentIds.filter((id) => cur[id] !== 'present');
      const lessonAtt = Object.fromEntries(studentIds.map((id) => [id, 'present' as Attendance]));
      patch({
        attendance: { ...s.attendance, [lessonId]: lessonAtt },
        teamGoal: { ...s.teamGoal, current: s.teamGoal.current + newly.length },
        ...(newly.includes(CHILD_STUDENT_ID) ? childAttendanceDelta(s, 1) : {}),
      });
    },
    setPraise: (lessonId: string, studentId: string, emoji: string | null) => {
      const cur = { ...s.praise[lessonId] };
      if (emoji) cur[studentId] = emoji;
      else delete cur[studentId];
      patch({ praise: { ...s.praise, [lessonId]: cur } });
    },
    sendPraise: (lessonId: string, teacherName: string) => {
      const sticker = s.praise[lessonId]?.[CHILD_STUDENT_ID];
      if (sticker) {
        patch({ stickers: [{ id: uid('st'), emoji: sticker, from: teacherName, date: 'сегодня' }, ...s.stickers] });
      }
    },
    // тренер принимает квест (например, домашку)
    teacherConfirmQuest: (questId: string) => {
      const q = s.quests.find((x) => x.id === questId);
      if (!q || q.state !== 'waiting' || q.confirmBy !== 'teacher') return;
      addStars(q.stars, { quests: s.quests.map((x) => (x.id === questId ? { ...x, state: 'done' } : x)) });
    },
    addClass: (c: Omit<ClassItem, 'id' | 'moderation' | 'rating' | 'reviews'>) =>
      patch({
        myClasses: [...s.myClasses, { ...c, id: uid('cls'), moderation: 'pending', rating: 0, reviews: 0, moderationNote: 'отправлено сегодня' }],
      }),

    // --- админ
    moderate: (id: string, decision: 'approved' | 'rejected') =>
      patch({ moderation: s.moderation.map((m) => (m.id === id ? { ...m, decision } : m)) }),
    resolveDispute: (id: string, decision: 'refund' | 'decline') =>
      patch({ disputes: s.disputes.map((d) => (d.id === id ? { ...d, decision } : d)) }),

    resetDemo: () => patch({ ...initialState, onboarded: true, role: s.role, phone: s.phone }),
  };
}

type Ctx = { state: AppState; ready: boolean } & ReturnType<typeof useActions>;
const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ready, setReady] = React.useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => raw && dispatch({ type: 'hydrate', state: JSON.parse(raw) }))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  const patch = useCallback((p: Partial<AppState>) => dispatch({ type: 'patch', patch: p }), []);
  const actions = useActions(state, patch);
  const value = useMemo(() => ({ state, ready, ...actions }), [state, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp вне AppProvider');
  return ctx;
}

/** Уровень ребёнка: каждые 150 звёзд за всё время = +1 уровень */
export function levelInfo(totalStars: number) {
  const level = Math.floor(totalStars / STARS_PER_LEVEL) + 1;
  const into = totalStars % STARS_PER_LEVEL;
  return { level, into, need: STARS_PER_LEVEL, pct: Math.round((into / STARS_PER_LEVEL) * 100) };
}
