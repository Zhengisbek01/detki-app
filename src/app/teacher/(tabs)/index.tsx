import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { classes, teacherLessons } from '../../../api/mockData';
import { Button, Card, Emoji, Header, Progress, Screen, Section, T, Tag } from '../../../components/ui';
import { useApp } from '../../../store/AppStore';

export default function Today() {
  const { state, teacherConfirmQuest } = useApp();
  const toCheck = state.quests.filter((q) => q.state === 'waiting' && q.confirmBy === 'teacher');
  return (
    <Screen blob="mint">
      <Header subtitle="Пн, 23 ноября" title="Добрый день, Ерлан" />
      <Section title="Группы на сегодня" />
      {teacherLessons.map((l) => {
        const c = classes.find((x) => x.id === l.classId)!;
        const marked = Object.keys(state.attendance[l.id] ?? {}).length;
        const done = marked === l.studentIds.length;
        return (
          <Card key={l.id} onPress={() => router.push({ pathname: '/teacher/attendance', params: { lessonId: l.id } })}>
            <View style={T.row}>
              <Emoji e={c.emoji} color={c.color} />
              <View style={{ flex: 1 }}>
                <Text style={T.h3}>{l.time} · {l.groupName}</Text>
                <Text style={T.meta}>{c.name} · {l.studentIds.length} детей</Text>
              </View>
              <Tag label={done ? 'Отмечено' : `${marked}/${l.studentIds.length}`} status={done ? 'ok' : 'warn'} />
            </View>
            <View style={{ marginTop: 12 }}><Progress pct={(marked / l.studentIds.length) * 100} color="#22C38E" /></View>
          </Card>
        );
      })}
      {toCheck.length > 0 && <Section title="На проверку" />}
      {toCheck.map((q) => (
        <Card key={q.id} color="sky">
          <Text style={T.h3}>{q.emoji} Алихан К.: {q.title}</Text>
          <Text style={T.meta}>Принять — ребёнок получит +{q.stars} ⭐</Text>
          <Button title="Принять" kind="mint" onPress={() => teacherConfirmQuest(q.id)} />
        </Card>
      ))}
      <Card color="violet">
        <Text style={T.h3}>🏆 Командная цель группы</Text>
        <Text style={T.meta}>{state.teamGoal.current} из {state.teamGoal.target} посещений за месяц — вся группа получит бейдж</Text>
        <View style={{ marginTop: 10 }}><Progress pct={(state.teamGoal.current / state.teamGoal.target) * 100} /></View>
      </Card>
      <Button title="Отметить посещаемость" kind="mint" onPress={() => router.push({ pathname: '/teacher/attendance', params: { lessonId: teacherLessons[0].id } })} />
    </Screen>
  );
}
