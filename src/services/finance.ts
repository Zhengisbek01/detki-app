/**
 * Финансовая модель платформы.
 * Допущения (вынесены в константы, легко поменять):
 *  - комиссия платформы 12% от оплаты родителя;
 *  - НДС РК с 2026 года 16%, платформа плательщик НДС, НДС входит в сумму комиссии;
 *  - эквайринг Kaspi ~2% (оценка, уточнить по договору).
 */
export const PLATFORM_COMMISSION = 0.12;
export const VAT_RATE = 0.16;
export const ACQUIRING_RATE = 0.02;

const round = (n: number) => Math.round(n);

/** НДС, входящий в сумму (сумма × 16/116) */
export const vatIncluded = (amountWithVat: number) => round((amountWithVat * VAT_RATE) / (1 + VAT_RATE));

/** Разбивка одной оплаты родителя */
export function splitPayment(amount: number) {
  const commission = round(amount * PLATFORM_COMMISSION);
  const vat = vatIncluded(commission);
  const teacherPayout = amount - commission;
  return { amount, commission, commissionNet: commission - vat, vat, teacherPayout };
}

/** Сводка для преподавателя за период */
export function teacherSummary(payments: number, refunds: number) {
  const commission = round(payments * PLATFORM_COMMISSION);
  return { payments, commission, refunds, income: payments - commission - refunds };
}

/** Сводка для админа за период */
export function platformSummary(gmv: number) {
  const commission = round(gmv * PLATFORM_COMMISSION);
  const vat = vatIncluded(commission);
  const acquiring = round(gmv * ACQUIRING_RATE);
  return { gmv, commission, vat, acquiring, netRevenue: commission - vat - acquiring };
}
