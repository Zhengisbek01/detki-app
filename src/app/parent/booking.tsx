import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { api } from '../../api/client';
import { Button, Card, Chip, Header, Screen, Section, T } from '../../components/ui';
import { useApp } from '../../store/AppStore';
import { colors } from '../../theme';
import type { ClassItem, Tariff } from '../../types';
import { tenge } from '../../utils/format';

const firstDates = ['Пн, 23 ноября', 'Ср, 25 ноября', 'Пт, 27 ноября'];

export default function Booking() {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const { state } = useApp();
  const [c, setC] = useState<ClassItem | null>(null);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [kidId, setKidId] = useState(state.kids[0]?.id);
  const [tariffId, setTariffId] = useState('sub8');
  const [date, setDate] = useState(firstDates[0]);

  useEffect(() => {
    api.classById(classId).then(setC);
    api.tariffs(classId).then(setTariffs);
  }, [classId]);

  const t = tariffs.find((x) => x.id === tariffId);

  return (
    <Screen>
      <Header title="Запись" back />
      {c && <Text style={[T.meta, { marginBottom: 4 }]}>{c.emoji} {c.name}</Text>}

      <Section title="Кого записываем" />
      <View style={[T.row, { flexWrap: 'wrap' }]}>
        {state.kids.map((k) => (
          <Pressable key={k.id} onPress={() => setKidId(k.id)} style={{ padding: 14, borderRadius: 20, backgroundColor: kidId === k.id ? colors.violet : colors.card, alignItems: 'center', minWidth: 100 }}>
            <Text style={{ fontSize: 32 }}>{k.emoji}</Text>
            <Text style={{ fontWeight: '700', color: kidId === k.id ? '#fff' : colors.ink }}>{k.name}</Text>
            <Text style={{ fontSize: 12, color: kidId === k.id ? '#fff' : colors.muted }}>{k.age} лет</Text>
          </Pressable>
        ))}
      </View>

      <Section title="Тариф" />
      {tariffs.map((x) => (
        <Card key={x.id} onPress={() => setTariffId(x.id)} style={tariffId === x.id ? { borderWidth: 2, borderColor: colors.violet } : undefined}>
          <View style={T.rowb}>
            <View style={{ flex: 1 }}>
              <Text style={T.h3}>{x.name}{x.best ? '  🔥' : ''}</Text>
              <Text style={T.meta}>{x.details}</Text>
            </View>
            <Text style={{ fontWeight: '800', color: colors.violet }}>{tenge(x.price)}</Text>
          </View>
        </Card>
      ))}

      <Section title="Первое занятие" />
      <View style={T.wrap}>
        {firstDates.map((d) => <Chip key={d} label={d} on={date === d} onPress={() => setDate(d)} />)}
      </View>

      <Button
        title={t ? `К оплате ${tenge(t.price)}` : 'К оплате'}
        disabled={!t || !kidId}
        onPress={() => router.push({ pathname: '/parent/pay', params: { classId, kidId, tariffId, date } })}
      />
    </Screen>
  );
}
