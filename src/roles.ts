import type { Role } from './types';

export const roleTitles: Record<Role, { t: string; e: string }> = {
  parent: { t: 'Родитель', e: '👨‍👩‍👧' },
  teacher: { t: 'Преподаватель', e: '🧑‍🏫' },
  child: { t: 'Ребёнок', e: '🧒' },
  admin: { t: 'Админ', e: '🛡️' },
};
