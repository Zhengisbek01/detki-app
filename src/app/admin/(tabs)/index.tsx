import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { RoleSwitch } from '../../../components/RoleSwitch';
import { Avatar, Card, Header, Screen, Stat, T, Tag } from '../../../components/ui';
import { useApp } from '../../../store/AppStore';
import { colors } from '../../../theme';

export default function Moderation() {
  const { state, moderate } = useApp();
  const left = state.moderation.filter((m) => !m.decision).length;
  return (
    <Screen>
      <Header title="Модерация" right={<RoleSwitch />} />
      <Stat items={[{ value: String(left), label: 'в очереди' }, { value: '1,4 дн.', label: 'среднее время' }]} />
      {state.moderation.map((m) => (
        <Card key={m.id}>
          <View style={T.row}>
            <Avatar name={m.title} />
            <View style={{ flex: 1 }}>
              <Text style={T.h3}>{m.title}</Text>
              <Text style={T.meta}>{m.subtitle}</Text>
            </View>
          </View>
          <View style={[T.wrap, { marginTop: 10 }]}>
            {m.docs.map((d) => <Tag key={d.name} label={`${d.ok ? '✓' : '✕'} ${d.name}`} status={d.ok ? 'ok' : 'bad'} />)}
          </View>
          {m.decision ? (
            <View style={{ marginTop: 10 }}><Tag label={m.decision === 'approved' ? 'Одобрено' : 'Возвращено на доработку'} status={m.decision === 'approved' ? 'ok' : 'bad'} /></View>
          ) : (
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              <Pressable onPress={() => moderate(m.id, 'approved')} style={{ flex: 1, height: 44, borderRadius: 14, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Одобрить</Text>
              </Pressable>
              <Pressable onPress={() => moderate(m.id, 'rejected')} style={{ flex: 1, height: 44, borderRadius: 14, backgroundColor: colors.coralSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.coral, fontWeight: '700' }}>На доработку</Text>
              </Pressable>
            </View>
          )}
        </Card>
      ))}
    </Screen>
  );
}
