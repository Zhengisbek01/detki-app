import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../theme';
import type { ClassItem } from '../types';
import { ratingStr, tenge } from '../utils/format';
import { Card, Emoji, T, Tag } from './ui';

export function ClassCard({ c }: { c: ClassItem }) {
  return (
    <Card onPress={() => router.push({ pathname: '/parent/class/[id]', params: { id: c.id } })}>
      <View style={T.row}>
        <Emoji e={c.emoji} color={c.color} size={60} />
        <View style={{ flex: 1 }}>
          <Text style={T.h3}>{c.name}</Text>
          <Text style={T.meta}>{c.teacherName} · {c.legalForm}</Text>
          <Text style={T.meta}>{c.age} · {c.distance} · ★ {ratingStr(c.rating)} ({c.reviews})</Text>
        </View>
      </View>
      <View style={[T.rowb, { marginTop: 12 }]}>
        <Tag label={c.seats} status={c.seatsStatus} />
        <Text style={{ fontWeight: '800', color: colors.violet, fontSize: 16 }}>от {tenge(c.price)}</Text>
      </View>
    </Card>
  );
}
