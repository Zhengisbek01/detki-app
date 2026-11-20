import React from 'react';
import { Text, View } from 'react-native';
import { students } from '../../api/mockData';
import { Avatar, Card, Header, Progress, Screen, T } from '../../components/ui';
import { useApp } from '../../store/AppStore';

export default function Team() {
  const { state } = useApp();
  const pct = (state.teamGoal.current / state.teamGoal.target) * 100;
  return (
    <Screen blob="violet">
      <Header title="Команда каратэ" back />
      <Card>
        <Text style={{ fontSize: 48, textAlign: 'center' }}>🏆</Text>
        <Text style={[T.h3, { textAlign: 'center' }]}>{state.teamGoal.target} посещений за месяц</Text>
        <Text style={[T.meta, { textAlign: 'center', marginBottom: 10 }]}>Сейчас {state.teamGoal.current} — вместе получим бейдж «Дружная команда»</Text>
        <Progress pct={pct} height={14} />
      </Card>
      {students.map((s) => (
        <Card key={s.id}>
          <View style={T.row}>
            <Avatar name={s.name} />
            <Text style={[T.h3, { flex: 1 }]}>{s.name}{s.kidId ? ' (ты)' : ''}</Text>
            <Text>💪</Text>
          </View>
        </Card>
      ))}
      <Text style={[T.meta, { textAlign: 'center' }]}>Без рейтингов — только общая цель</Text>
    </Screen>
  );
}
