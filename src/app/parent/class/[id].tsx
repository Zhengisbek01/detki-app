import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { api } from '../../../api/client';
import { Avatar, Button, Card, Header, KV, Panel, Screen, Section, T, Tag } from '../../../components/ui';
import { colors, soft } from '../../../theme';
import type { ClassItem, Tariff } from '../../../types';
import { ratingStr, tenge } from '../../../utils/format';

export default function ClassDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [c, setC] = useState<ClassItem | null>(null);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);

  useEffect(() => {
    api.classById(id).then(setC);
    api.tariffs(id).then(setTariffs);
  }, [id]);

  if (!c) return <ActivityIndicator color={colors.violet} style={{ flex: 1 }} />;

  return (
    <Screen>
      <Header title="" back />
      <View style={{ height: 160, borderRadius: 28, backgroundColor: soft[c.color], alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 80 }}>{c.emoji}</Text>
      </View>
      <Text style={[T.h2, { fontSize: 24 }]}>{c.name}</Text>
      <View style={[T.wrap, { marginTop: 8 }]}>
        <Tag label={c.seats} status={c.seatsStatus} />
        <Tag label={`★ ${ratingStr(c.rating)} · ${c.reviews} отзывов`} />
      </View>
      <Text style={[T.text, { marginTop: 12 }]}>{c.description}</Text>

      <Card style={{ marginTop: 16 }}>
        <View style={T.row}>
          <Avatar name={c.teacherName} size={48} />
          <View style={{ flex: 1 }}>
            <Text style={T.h3}>{c.teacherName}</Text>
            <Text style={T.meta}>{c.legalForm} · документы проверены ✅</Text>
          </View>
        </View>
      </Card>

      <Panel>
        <KV k="Возраст" v={c.age} />
        <KV k="Расписание" v={c.days} />
        <KV k="Адрес" v={`${c.address} · ${c.distance}`} />
        <KV k="Язык" v={c.lang} />
      </Panel>

      <Section title="Тарифы" />
      {tariffs.map((t) => (
        <Card key={t.id} color={t.best ? 'violet' : undefined}>
          <View style={T.rowb}>
            <View style={{ flex: 1 }}>
              <Text style={T.h3}>{t.name}</Text>
              <Text style={T.meta}>{t.details}</Text>
            </View>
            <Text style={{ fontWeight: '800', fontSize: 16, color: colors.violet }}>{tenge(t.price)}</Text>
          </View>
        </Card>
      ))}
      <Button title="Записаться" onPress={() => router.push({ pathname: '/parent/booking', params: { classId: c.id } })} />
    </Screen>
  );
}
