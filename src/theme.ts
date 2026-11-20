// Цвета и размеры из прототипа (яркий фиолетовый, дружелюбный)
export const colors = {
  violet: '#6A4DFF',
  violetSoft: '#EEEAFF',
  violetDark: '#4B32D9',
  coral: '#FF6B6B',
  coralSoft: '#FFE9E7',
  sun: '#FFC24B',
  sunSoft: '#FFF4DA',
  mint: '#22C38E',
  mintSoft: '#E2F8EF',
  sky: '#38A8FF',
  skySoft: '#E3F2FF',
  pink: '#FF7EB6',
  pinkSoft: '#FFE8F2',
  kaspi: '#F14635',
  ink: '#1E1940',
  muted: '#8C88A8',
  line: '#ECEAF5',
  bg: '#F7F6FC',
  card: '#FFFFFF',
} as const;

export type SoftColor = 'violet' | 'coral' | 'sun' | 'mint' | 'sky' | 'pink';
export const soft: Record<SoftColor, string> = {
  violet: colors.violetSoft,
  coral: colors.coralSoft,
  sun: colors.sunSoft,
  mint: colors.mintSoft,
  sky: colors.skySoft,
  pink: colors.pinkSoft,
};

export const radius = { s: 12, m: 18, l: 24, xl: 32 };
export const shadow = {
  shadowColor: '#2A1F7A',
  shadowOpacity: 0.08,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
};
