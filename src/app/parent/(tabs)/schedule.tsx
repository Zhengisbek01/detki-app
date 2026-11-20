import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { classes } from '../../../api/mockData';
import { Card, Emoji, Header, Screen, Section, T, Tag } from '../../../components/ui';
import { useApp } from '../../../store/AppStore';
import { colors } from '../../../theme';

const days = [['Пн', 23], ['Вт', 24], ['Ср', 25], ['Чт', 26], ['Пт', 27], ['Сб', 28], ['Вс', 29]] as const;
const dayMap: Record<string, string> = { Пн: 'Пн', Вт: 'Вт', Ср: 'Ср', Чт: 'Чт', Пт: 'Пт', Сб: 'Сб', Вс: 'Вс' };

export default function Schedule() {
  const { state } = useApp();
  const [day, setDay] = useState(0);
  const dayName = days[day][0];

  // Базовые записи (демо) + оплаченные в приложении
  const base = [{ classId: 'c1', kidId: 'k1' }, { classId: 'c3', kidId: 'k1' }, { classId: 'c2', kidId: 'k2' }];
  const all = [...base, ...state.bookings.map((b) => ({ classId: b.classId, kidId: b.kidId }))];
  const items = all
    .map((x) => ({ ...x, c: classes.find((c) => c.id === x.classId)!, k: state.kids.find((k) => k.id === x.kidId) }))
    .filter((x) => x.c && x.k && x.c.days.split('·')[0].split(',').map((d) => dayMap[d.trim()]).includes(dayName));
  const unique = items.filter((x, i) => items.findIndex((y) => y.classId === x.classId && y.kidId === x.kidId) === i);

  return (
    <Screen>
      <Header title="Расписание" subtitle="Ноябрь 2026" />
      <View style={[T.rowb, { marginBottom: 12 }]}>
        {days.map(([d, n], i) => (
          <Pressable key={d} onPress={() => setDay(i)} style={{ width: 44, paddingVertical: 10, borderRadius: 16, alignItems: 'center', backgroundColor: day === i ? colors.violet : colors.card }}>
            <Text style={{ fontSize: 12, color: day === i ? '#fff' : colors.muted }}>{d}</Text>
            <Text style={{ fontSize: 17, fontWeight: '800', color: day === i ? '#fff' : colors.ink }}>{n}</Text>
          </Pressable>
        ))}
      </View>
      <Section title={`${dayName}, ${days[day][1]} ноября`} />
      {unique.length === 0 && <Text style={[T.meta, { textAlign: 'center', marginTop: 20 }]}>Занятий нет — отдыхаем 😴</Text>}
      {unique.map(({ c, k }) => (
        <Card key={c.id + k!.id}>
          <View style={T.row}>
            <Emoji e={c.emoji} color={c.color} />
            <View style={{ flex: 1 }}>
              <Text style={T.h3}>{c.name}</Text>
              <Text style={T.meta}>{c.days.split('·')[1]?.trim()} · {c.address}</Text>
            </View>
            <Tag label={`${k!.emoji} ${k!.name}`} />
          </View>
        </Card>
      ))}
      {state.bookings.length > 0 && (
        <>
          <Section title="Оплаты" />
          {state.bookings.map((b) => {
            const c = classes.find((x) => x.id === b.classId)!;
            return (
              <Card key={b.id}>
                <View style={T.rowb}>
                  <Text style={T.h3}>{c.emoji} {c.name}</Text>
                  <Tag label="Оплачено" status="ok" />
                </View>
                <Text style={T.meta}>Первое занятие: {b.firstLesson}</Text>
              </Card>
            );
          })}
        </>
      )}
    </Screen>
  );
}
