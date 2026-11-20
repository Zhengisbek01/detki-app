import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Emoji, Header, Progress, Screen, Section, T, Tag, Toast, useToast } from '../../../components/ui';
import { useApp } from '../../../store/AppStore';
import { colors } from '../../../theme';
import type { Quest } from '../../../types';

export default function Quests() {
  const { state, markQuestDone } = useApp();
  const [toast, show] = useToast();
  const weekly = state.quests.filter((q) => !q.family);
  const family = state.quests.filter((q) => q.family);

  const item = (q: Quest) => (
    <Card key={q.id}>
      <View style={T.row}>
        <Emoji e={q.emoji} color={q.color} />
        <View style={{ flex: 1 }}>
          <Text style={T.h3}>{q.title}</Text>
          <Text style={T.meta}>{q.hint}</Text>
        </View>
        <Text style={{ fontWeight: '900', color: colors.violet }}>+{q.stars}⭐</Text>
      </View>
      <View style={{ marginTop: 10 }}><Progress pct={q.progress} color={q.state === 'done' ? colors.mint : colors.violet} /></View>
      {q.state === 'done' && <View style={{ marginTop: 8 }}><Tag label="Готово!" status="ok" /></View>}
      {q.state === 'waiting' && <View style={{ marginTop: 8 }}><Tag label={q.confirmBy === 'parent' ? 'Ждём маму или папу' : 'Ждём тренера'} status="warn" /></View>}
      {q.state === 'active' && q.confirmBy !== 'auto' && (
        <Button title="Я сделал!" kind="ghost" onPress={() => { markQuestDone(q.id); show('Отправили на проверку 👍'); }} />
      )}
    </Card>
  );

  return (
    <Screen>
      <Header title="Квесты недели" subtitle="Обновятся в понедельник" />
      {weekly.map(item)}
      <Section title="Семейный квест" />
      {family.map(item)}
      <Text style={[T.meta, { textAlign: 'center' }]}>Звёзды даются только за реальные дела. Никаких покупок и штрафов.</Text>
      <Toast text={toast} />
    </Screen>
  );
}
