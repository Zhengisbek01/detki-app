import React from 'react';
import { Text, View } from 'react-native';
import { Card, Header, Screen, Section, T } from '../../../components/ui';
import { levelInfo, useApp } from '../../../store/AppStore';
import { soft } from '../../../theme';

const wardrobe = ['🧢', '🕶️', '🎽', '🥋', '👑'];

export default function Awards() {
  const { state } = useApp();
  const lvl = levelInfo(state.totalStars);
  return (
    <Screen>
      <Header title="Награды" subtitle={`Уровень ${lvl.level} · всего ⭐ ${state.totalStars}`} />
      <Section title="Бейджи" />
      <View style={[T.wrap, { gap: 10 }]}>
        {state.badges.map((b) => (
          <View key={b.id} style={{ width: '31%', aspectRatio: 0.9, borderRadius: 22, backgroundColor: soft[b.color], alignItems: 'center', justifyContent: 'center', padding: 6, opacity: b.earned ? 1 : 0.4 }}>
            <Text style={{ fontSize: 34 }}>{b.earned ? b.emoji : '🔒'}</Text>
            <Text style={[T.meta, { textAlign: 'center', fontWeight: '700' }]}>{b.title}</Text>
          </View>
        ))}
      </View>
      <Section title="Стикеры от тренеров" />
      {state.stickers.map((s) => (
        <Card key={s.id}>
          <View style={T.row}>
            <Text style={{ fontSize: 34 }}>{s.emoji}</Text>
            <View><Text style={T.h3}>{s.from}</Text><Text style={T.meta}>{s.date}</Text></View>
          </View>
        </Card>
      ))}
      <Section title="Гардероб аватара" />
      <View style={T.wrap}>
        {wardrobe.map((w, i) => {
          const open = i < lvl.level;
          return (
            <View key={w} style={{ width: 56, height: 56, borderRadius: 18, backgroundColor: soft.violet, alignItems: 'center', justifyContent: 'center', opacity: open ? 1 : 0.35 }}>
              <Text style={{ fontSize: 26 }}>{open ? w : '🔒'}</Text>
            </View>
          );
        })}
      </View>
      <Text style={[T.meta, { marginTop: 8 }]}>Новая вещь открывается с каждым уровнем</Text>
    </Screen>
  );
}
