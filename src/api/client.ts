/**
 * Моковый API. Все экраны берут данные через эти функции,
 * поэтому переход на реальный бэкенд = замена тела функций на fetch.
 */
import * as db from './mockData';
import type { ClassItem } from '../types';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const delay = <T,>(v: T, ms = 250) => new Promise<T>((r) => setTimeout(() => r(v), ms));

async function get<T>(path: string, fallback: T): Promise<T> {
  if (!API_URL) return delay(structuredCloneSafe(fallback));
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API ${path}: ${res.status}`);
  return res.json();
}

function structuredCloneSafe<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

export const api = {
  categories: () => get('/categories', db.categories),
  classes: (category?: string) =>
    get<ClassItem[]>('/classes', db.classes.filter((c) => c.moderation === 'published')).then((list) =>
      !category || category === 'Все' ? list : list.filter((c) => c.category === category),
    ),
  classById: (id: string) => get(`/classes/${id}`, db.classes.find((c) => c.id === id) ?? null),
  tariffs: (_classId: string) => get('/tariffs', db.tariffs),
  sendSmsCode: (phone: string) => delay({ ok: phone.replace(/\D/g, '').length >= 10 }, 400),
  verifySmsCode: (_phone: string, code: string) => delay({ ok: code.length === 4, token: 'mock-token' }, 400),
};
