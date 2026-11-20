import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Emoji, Header, Screen, T, Tag } from '../../../components/ui';
import { useApp } from '../../../store/AppStore';

const st = {
  published: { label: 'Опубликовано', s: 'ok' },
  pending: { label: 'На модерации', s: 'warn' },
  rework: { label: 'На доработке', s: 'bad' },
} as const;

export default function MyClasses() {
  const { state } = useApp();
  return (
    <Screen>
      <Header title="Мои занятия" />
      {state.myClasses.map((c) => (
        <Card key={c.id}>
          <View style={T.row}>
            <Emoji e={c.emoji} color={c.color} />
            <View style={{ flex: 1 }}>
              <Text style={T.h3}>{c.name}</Text>
              <Text style={T.meta}>{c.moderation === 'published' ? `3 группы · 24 ученика · ★ ${c.rating}` : c.moderationNote}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}><Tag label={st[c.moderation].label} status={st[c.moderation].s} /></View>
        </Card>
      ))}
      <Button title="+ Новое занятие" onPress={() => router.push('/teacher/new-class')} />
    </Screen>
  );
}
