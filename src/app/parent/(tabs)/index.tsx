import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { api } from '../../../api/client';
import { categories } from '../../../api/mockData';
import { ClassCard } from '../../../components/ClassCard';
import { Header, Input, Screen, T } from '../../../components/ui';
import { colors, soft } from '../../../theme';
import type { ClassItem } from '../../../types';

export default function Catalog() {
  const [cat, setCat] = useState('Все');
  const [q, setQ] = useState('');
  const [list, setList] = useState<ClassItem[] | null>(null);

  useEffect(() => {
    setList(null);
    api.classes(cat).then(setList);
  }, [cat]);

  const filtered = (list ?? []).filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <Screen blob="violet">
      <Header subtitle="Астана · Есиль" title="Куда пойдём?" />
      <Input placeholder="🔍  Каратэ, рисование, английский…" value={q} onChangeText={setQ} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -18, marginBottom: 12 }} contentContainerStyle={{ paddingHorizontal: 18, gap: 10 }}>
        {categories.map((c) => (
          <Pressable key={c.name} onPress={() => setCat(c.name)} style={{ alignItems: 'center', width: 68 }}>
            <View style={{ width: 60, height: 60, borderRadius: 20, backgroundColor: cat === c.name ? colors.violet : soft[c.color], alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 26 }}>{c.emoji}</Text>
            </View>
            <Text style={[T.meta, { fontWeight: '700', color: cat === c.name ? colors.violet : colors.ink }]}>{c.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {!list ? <ActivityIndicator color={colors.violet} style={{ marginTop: 40 }} /> : filtered.map((c) => <ClassCard key={c.id} c={c} />)}
      {list && filtered.length === 0 && <Text style={[T.meta, { textAlign: 'center', marginTop: 30 }]}>Ничего не нашли 🙈</Text>}
    </Screen>
  );
}
