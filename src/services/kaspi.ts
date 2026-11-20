/**
 * Kaspi-оплата — ЗАГЛУШКА.
 *
 * Как подключить реальную интеграцию:
 *  1. Заключить договор с Kaspi (Kaspi Pay для бизнеса / Kaspi QR) и получить доступы.
 *  2. Создание счёта делать ТОЛЬКО на своём бэкенде (ключи не хранить в приложении):
 *       POST {API_URL}/payments  → бэкенд создаёт счёт в Kaspi, возвращает paymentId + deeplink/QR.
 *  3. Приложение открывает deeplink (Linking.openURL) — родитель платит в Kaspi.kz.
 *  4. Kaspi присылает вебхук на бэкенд → бэкенд меняет статус брони на «paid».
 *  5. Приложение опрашивает GET {API_URL}/payments/:id или получает push.
 *
 * Ниже — тот же интерфейс, но с имитацией. Замените тело функций на fetch к своему API.
 */
import { Linking } from 'react-native';
import { uid } from '../utils/format';

export type KaspiStatus = 'created' | 'paid' | 'failed' | 'expired';

export interface KaspiInvoice {
  paymentId: string;
  amount: number;
  description: string;
  deeplink: string; // ссылка на оплату в приложении Kaspi.kz
  qrPayload: string; // строка для QR-кода (оплата с другого телефона)
  expiresAt: string;
}

const USE_MOCK = true; // ← переключить на false после подключения бэкенда
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.kz';

const invoices = new Map<string, { inv: KaspiInvoice; status: KaspiStatus; createdAt: number }>();

export async function createInvoice(amount: number, description: string): Promise<KaspiInvoice> {
  if (!USE_MOCK) {
    const res = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, description, provider: 'kaspi' }),
    });
    if (!res.ok) throw new Error('Не удалось создать счёт Kaspi');
    return res.json();
  }
  await delay(500);
  const paymentId = uid('kaspi');
  const inv: KaspiInvoice = {
    paymentId,
    amount,
    description,
    deeplink: `https://kaspi.kz/pay/mock?invoice=${paymentId}`,
    qrPayload: `KASPI-MOCK:${paymentId}:${amount}`,
    expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
  };
  invoices.set(paymentId, { inv, status: 'created', createdAt: Date.now() });
  return inv;
}

/** Открыть оплату в Kaspi.kz. В моке ничего не открываем, просто «оплачиваем». */
export async function openKaspi(inv: KaspiInvoice) {
  if (!USE_MOCK) {
    await Linking.openURL(inv.deeplink);
    return;
  }
  const rec = invoices.get(inv.paymentId);
  if (rec) rec.status = 'paid';
}

export async function getStatus(paymentId: string): Promise<KaspiStatus> {
  if (!USE_MOCK) {
    const res = await fetch(`${API_URL}/payments/${paymentId}`);
    const data = await res.json();
    return data.status as KaspiStatus;
  }
  await delay(700);
  return invoices.get(paymentId)?.status ?? 'expired';
}

/** Возврат средств (используется админом в спорах) */
export async function refund(paymentId: string, amount: number): Promise<boolean> {
  if (!USE_MOCK) {
    const res = await fetch(`${API_URL}/payments/${paymentId}/refund`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    return res.ok;
  }
  await delay(400);
  return true;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
