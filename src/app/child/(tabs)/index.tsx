import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { RoleSwitch } from '../../../components/RoleSwitch';
import { Card, Emoji, Header, Progress, Screen, Section, T } from '../../../components/ui';
import { levelInfo, useApp } from '../../../store/AppStore';
import { colors } from '../../../theme';

export default function ChildHome() {
  const { state } = useApp();
  const lvl = levelInfo(state.totalStars);
  const doneQuests = state.quests.filter((q) => q.state !== 'active').length;

  return (
    <Screen blob="sun">
      <Header subtitle="Привет," title="Алихан! 🚀" right={<RoleSwitch />} />
      <View style={{ backgroundColor: colors.violet, borderRadius: 28, padding: 20, marginBottom: 12 }}>
        <View style={T.rowb}>
          <View>
            <Text style={{ color: '#fff', opacity: 0.85, fontWeight: '600' }}>Уровень {lvl.level}</Text>
            <Text style={{ color: '#fff', fontSize: 40, fontWeight: '900' }}>⭐ {state.stars}</Text>
          </View>
          <Text style={{ fontSize: 64 }}>🦸‍♂️</Text>
        </View>
        <View style={{ marginTop: 10 }}><Progress pct={lvl.pct} color={colors.sun} height={12} /></View>
        <Text style={{ color: '#fff', opacity: 0.85, marginTop: 6 }}>До уровня {lvl.level + 1}: {lvl.need - lvl.into} ⭐</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Card color="coral" style={{ flex: 1 }}>
          <Text style={{ fontSize: 28 }}>🔥</Text>
          <Text style={T.h3}>{state.streakWeeks} недели</Text>
          <Text style={T.meta}>серия · ❄️ заморозок: {state.freezeLeft}</Text>
        </Card>
        <Card color="mint" style={{ flex: 1 }} onPress={() => router.push('/child/quests')}>
          <Text style={{ fontSize: 28 }}>🎯</Text>
          <Text style={T.h3}>{doneQuests} из {state.quests.length}</Text>
          <Text style={T.meta}>квестов недели</Text>
        </Card>
      </View>

      <Section title="Сегодня" />
      <Card>
        <View style={T.row}>
          <Emoji e="🥋" color="coral" />
          <View style={{ flex: 1 }}>
            <Text style={T.h3}>Каратэ в 17:00</Text>
            <Text style={T.meta}>Приходи — получишь +10 ⭐</Text>
          </View>
        </View>
      </Card>
      <Card color="violet" onPress={() => router.push('/child/team')}>
        <Text style={T.h3}>🤝 Командная цель</Text>
        <Text style={T.meta}>Группа каратэ: {state.teamGoal.current} из {state.teamGoal.target} посещений</Text>
        <View style={{ marginTop: 10 }}><Progress pct={(state.teamGoal.current / state.teamGoal.target) * 100} /></View>
      </Card>
    </Screen>
  );
}
