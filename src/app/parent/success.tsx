import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { classes, tariffs } from '../../api/mockData';
import { Button, KV, Panel, Screen, T } from '../../components/ui';
import { useApp } from '../../store/AppStore';
import { tenge } from '../../utils/format';

export default function Success() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { state } = useApp();
  const b = state.bookings.find((x) => x.id === bookingId);
  if (!b) return null;
  const c = classes.find((x) => x.id === b.classId)!;
  const k = state.kids.find((x) => x.id === b.kidId)!;
  const t = tariffs.find((x) => x.id === b.tariffId)!;

  return (
    <Screen blob="mint">
      <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 24 }}>
        <Text style={{ fontSize: 80 }}>🎉</Text>
        <Text style={[T.h2, { fontSize: 24, marginTop: 8 }]}>{k.name} записан(а)!</Text>
        <Text style={T.meta}>Чек отправлен в SMS и в раздел «Профиль»</Text>
      </View>
      <Panel>
        <KV k="Занятие" v={`${c.emoji} ${c.name}`} />
        <KV k="Первое занятие" v={b.firstLesson} />
        <KV k="Тариф" v={t.name} />
        <KV k="Оплачено" v={tenge(b.amount)} />
        <KV k="Чек Kaspi" v={b.paymentId.slice(-8).toUpperCase()} />
      </Panel>
      <Button title="В расписание" onPress={() => { router.dismissAll(); router.replace('/parent/schedule'); }} />
      <Button title="Найти ещё занятие" kind="ghost" onPress={() => { router.dismissAll(); router.replace('/parent'); }} />
    </Screen>
  );
}
