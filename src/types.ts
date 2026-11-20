export type Role = 'parent' | 'teacher' | 'child' | 'admin';
export type Lang = 'ru' | 'kk' | 'en';
export type Status = 'ok' | 'warn' | 'bad';
export type LegalForm = 'ИП' | 'ТОО' | 'самозанятый';

export interface ClassItem {
  id: string;
  emoji: string;
  color: import('./theme').SoftColor;
  name: string;
  teacherId: string;
  teacherName: string;
  legalForm: LegalForm;
  age: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  price: number;
  days: string;
  category: string;
  seats: string;
  seatsStatus: Status;
  lang: string;
  description: string;
  moderation: 'published' | 'pending' | 'rework';
  moderationNote?: string;
}

export interface Tariff {
  id: string;
  name: string;
  details: string;
  price: number;
  lessons: number;
  best?: boolean;
}

export interface Kid {
  id: string;
  name: string;
  age: number;
  emoji: string;
}

export interface Booking {
  id: string;
  kidId: string;
  classId: string;
  tariffId: string;
  amount: number;
  paymentId: string;
  status: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  firstLesson: string;
}

export interface Lesson {
  id: string;
  classId: string;
  weekday: number; // 0 = Пн
  time: string;
  groupName: string;
  studentIds: string[];
}

export interface Student {
  id: string;
  name: string;
  kidId?: string; // связь с ребёнком в аккаунте родителя
}

export type Attendance = 'present' | 'absent' | 'sick';

export interface Quest {
  id: string;
  emoji: string;
  color: import('./theme').SoftColor;
  title: string;
  hint: string;
  progress: number; // 0..100
  stars: number;
  confirmBy: 'teacher' | 'parent' | 'auto';
  state: 'active' | 'waiting' | 'done';
  family?: boolean;
}

export interface Prize {
  id: string;
  emoji: string;
  color: import('./theme').SoftColor;
  title: string;
  cost: number;
  state: 'available' | 'requested' | 'given';
}

export interface Badge {
  id: string;
  emoji: string;
  color: import('./theme').SoftColor;
  title: string;
  earned: boolean;
}

export interface Sticker {
  id: string;
  emoji: string;
  from: string;
  date: string;
}

export interface ModerationItem {
  id: string;
  title: string;
  subtitle: string;
  docs: { name: string; ok: boolean }[];
  decision?: 'approved' | 'rejected';
}

export interface Dispute {
  id: string;
  title: string;
  meta: string;
  tag: string;
  tagStatus: Status | 'new';
  amount?: number;
  decision?: 'refund' | 'decline';
}
