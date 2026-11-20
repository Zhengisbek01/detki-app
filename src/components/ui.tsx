import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle, StyleProp,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, shadow, soft, SoftColor } from '../theme';
import type { Status } from '../types';

export function Screen({ children, scroll = true, blob, style }: {
  children: React.ReactNode; scroll?: boolean; blob?: SoftColor | 'violetStrong'; style?: StyleProp<ViewStyle>;
}) {
  const blobColor = blob === 'violetStrong' ? colors.violet : blob ? soft[blob] : undefined;
  const content = <View style={[s.body, style]}>{children}</View>;
  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      {blobColor && <View style={[s.blob, { backgroundColor: blobColor }]} />}
      {scroll ? <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}

export function Header({ title, back, right, subtitle, light }: {
  title: string; back?: boolean; right?: React.ReactNode; subtitle?: string; light?: boolean;
}) {
  return (
    <View style={s.header}>
      {back && (
        <Pressable onPress={() => router.back()} style={s.iconBtn} hitSlop={10}>
          <Text style={{ fontSize: 18, color: colors.ink }}>‹</Text>
        </Pressable>
      )}
      <View style={{ flex: 1 }}>
        {subtitle && <Text style={[s.hello, light && { color: '#fff', opacity: 0.85 }]}>{subtitle}</Text>}
        <Text style={[s.h1, light && { color: '#fff' }]}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

export function Card({ children, onPress, style, color }: {
  children: React.ReactNode; onPress?: () => void; style?: StyleProp<ViewStyle>; color?: SoftColor;
}) {
  const st = [s.card, color && { backgroundColor: soft[color], shadowOpacity: 0 }, style];
  return onPress ? (
    <Pressable onPress={onPress} style={({ pressed }) => [st, pressed && { transform: [{ scale: 0.98 }] }]}>{children}</Pressable>
  ) : (
    <View style={st}>{children}</View>
  );
}

type BtnKind = 'primary' | 'ghost' | 'mint' | 'kaspi' | 'danger';
export function Button({ title, onPress, kind = 'primary', loading, disabled, style }: {
  title: string; onPress?: () => void; kind?: BtnKind; loading?: boolean; disabled?: boolean; style?: StyleProp<ViewStyle>;
}) {
  const bg = { primary: colors.violet, ghost: colors.violetSoft, mint: colors.mint, kaspi: colors.kaspi, danger: colors.coralSoft }[kind];
  const fg = kind === 'ghost' ? colors.violet : kind === 'danger' ? colors.coral : '#fff';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [s.btn, { backgroundColor: bg, opacity: disabled ? 0.45 : pressed ? 0.85 : 1 }, style]}
    >
      {loading ? <ActivityIndicator color={fg} /> : <Text style={[s.btnText, { color: fg }]}>{title}</Text>}
    </Pressable>
  );
}

export function Chip({ label, on, onPress, color = 'violet' }: { label: string; on?: boolean; onPress?: () => void; color?: SoftColor }) {
  return (
    <Pressable onPress={onPress} style={[s.chip, on ? { backgroundColor: colors.violet } : { backgroundColor: soft[color] }]}>
      <Text style={[s.chipText, on && { color: '#fff' }]}>{label}</Text>
    </Pressable>
  );
}

export function Tag({ label, status }: { label: string; status?: Status | 'new' }) {
  const map = {
    ok: [colors.mintSoft, colors.mint],
    warn: [colors.sunSoft, '#C88A00'],
    bad: [colors.coralSoft, colors.coral],
    new: [colors.violetSoft, colors.violet],
  } as const;
  const [bg, fg] = map[status ?? 'new'];
  return (
    <View style={[s.tag, { backgroundColor: bg }]}>
      <Text style={[s.tagText, { color: fg }]}>{label}</Text>
    </View>
  );
}

export function Progress({ pct, color = colors.violet, height = 10 }: { pct: number; color?: string; height?: number }) {
  return (
    <View style={[s.progress, { height }]}>
      <View style={{ width: `${Math.max(0, Math.min(100, pct))}%`, backgroundColor: color, height: '100%', borderRadius: 10 }} />
    </View>
  );
}

export function KV({ k, v, vColor }: { k: string; v: string; vColor?: string }) {
  return (
    <View style={s.kv}>
      <Text style={s.kvK}>{k}</Text>
      <Text style={[s.kvV, vColor && { color: vColor }]}>{v}</Text>
    </View>
  );
}

export function Panel({ children }: { children: React.ReactNode }) {
  return <View style={s.panel}>{children}</View>;
}

export function Section({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <View style={s.secRow}>
      <Text style={s.sec}>{title}</Text>
      {right}
    </View>
  );
}

export function Emoji({ e, color = 'violet', size = 52 }: { e: string; color?: SoftColor; size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 3, backgroundColor: soft[color], alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.5 }}>{e}</Text>
    </View>
  );
}

export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2.6, backgroundColor: colors.violetSoft, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontWeight: '800', color: colors.violet, fontSize: size * 0.42 }}>{name[0]}</Text>
    </View>
  );
}

export function Stat({ items }: { items: { value: string; label: string }[] }) {
  return (
    <View style={s.stat}>
      {items.map((it) => (
        <View key={it.label} style={s.statItem}>
          <Text style={s.statV}>{it.value}</Text>
          <Text style={s.statL}>{it.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function Input(props: TextInputProps & { label?: string }) {
  return (
    <View style={{ marginBottom: 12 }}>
      {props.label && <Text style={s.sec}>{props.label}</Text>}
      <TextInput placeholderTextColor={colors.muted} {...props} style={[s.input, props.style]} />
    </View>
  );
}

export function Toast({ text }: { text: string | null }) {
  if (!text) return null;
  return (
    <View pointerEvents="none" style={s.toast}>
      <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>{text}</Text>
    </View>
  );
}

/** Простой хук тоста: const [toast, show] = useToast() */
export function useToast(): [string | null, (t: string) => void] {
  const [t, setT] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = React.useCallback((text: string) => {
    setT(text);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setT(null), 2000);
  }, []);
  return [t, show];
}

export const T = StyleSheet.create({
  h2: { fontSize: 18, fontWeight: '800', color: colors.ink },
  h3: { fontSize: 16, fontWeight: '700', color: colors.ink },
  meta: { fontSize: 13, color: colors.muted, marginTop: 2 },
  text: { fontSize: 15, color: colors.ink, lineHeight: 21 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowb: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  blob: { position: 'absolute', top: -60, left: -40, right: -40, height: 280, borderBottomLeftRadius: 140, borderBottomRightRadius: 140 },
  body: { paddingHorizontal: 18, paddingTop: 8 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  hello: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  h1: { fontSize: 24, fontWeight: '800', color: colors.ink },
  iconBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', ...shadow },
  card: { backgroundColor: colors.card, borderRadius: radius.l, padding: 16, marginBottom: 12, ...shadow },
  btn: { height: 54, borderRadius: radius.m, alignItems: 'center', justifyContent: 'center', marginTop: 12, paddingHorizontal: 16 },
  btnText: { fontSize: 16, fontWeight: '700' },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999 },
  chipText: { fontSize: 14, fontWeight: '600', color: colors.ink },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, alignSelf: 'flex-start' },
  tagText: { fontSize: 12, fontWeight: '700' },
  progress: { backgroundColor: colors.line, borderRadius: 10, overflow: 'hidden' },
  kv: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.line, gap: 12 },
  kvK: { color: colors.muted, fontSize: 15, flexShrink: 1 },
  kvV: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  panel: { backgroundColor: colors.card, borderRadius: radius.l, paddingHorizontal: 16, marginBottom: 12, ...shadow },
  secRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, marginBottom: 8 },
  sec: { fontSize: 13, fontWeight: '700', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  stat: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statItem: { flex: 1, backgroundColor: colors.card, borderRadius: radius.m, padding: 14, ...shadow },
  statV: { fontSize: 18, fontWeight: '800', color: colors.ink },
  statL: { fontSize: 12, color: colors.muted, marginTop: 2 },
  input: { backgroundColor: colors.card, borderRadius: radius.m, paddingHorizontal: 16, height: 52, fontSize: 16, color: colors.ink, borderWidth: 1, borderColor: colors.line },
  toast: { position: 'absolute', bottom: 100, left: 24, right: 24, backgroundColor: colors.ink, padding: 14, borderRadius: 16 },
});
