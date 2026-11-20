import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Header, Input, Progress, Screen, Section, T, Tag, Toast, useToast } from '../../../components/ui';
import { CHILD_KID_ID, levelInfo, useApp } from '../../../store/AppStore';
import { colors } from '../../../theme';

export default function Kids() {
  const { state, addKid, confirmQuest, givePrize, addPrize } = useApp();
  const [toast, show] = useToast();
  const [kidName, setKidName] = useState('');
  const [kidAge, setKidAge] = useState('');
  const [prizeTitle, setPrizeTitle] = useState('');
  const [prizeCost, setPrizeCost] = useState('');
  const lvl = levelInfo(state.totalStars);
  const waiting = state.quests.filter((q) => q.state === 'waiting' && q.confirmBy === 'parent');
  const requested = state.prizes.filter((p) => p.state === 'requested');

  return (
    <Screen>
      <Header title="Дети" />
      {state.kids.map((k) => (
        <Card key={k.id}>
          <View style={T.row}>
            <Text style={{ fontSize: 40 }}>{k.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={T.h3}>{k.name}</Text>
              <Text style={T.meta}>{k.age} лет</Text>
            </View>
            {k.id === CHILD_KID_ID && <Tag label={`⭐ ${state.stars}`} status="warn" />}
          </View>
          {k.id === CHILD_KID_ID && (
            <View style={{ marginTop: 12 }}>
              <Text style={[T.meta, { marginBottom: 6 }]}>Уровень {lvl.level} · серия {state.streakWeeks} нед. 🔥</Text>
              <Progress pct={lvl.pct} />
            </View>
          )}
        </Card>
      ))}

      <Section title="Нужно подтвердить" />
      {waiting.length === 0 && requested.length === 0 && <Text style={T.meta}>Пока ничего 👌</Text>}
      {waiting.map((q) => (
        <Card key={q.id} color="mint">
          <Text style={T.h3}>{q.emoji} {q.title}</Text>
          <Text style={T.meta}>Алихан говорит, что выполнил · +{q.stars} ⭐</Text>
          <Button title="Подтвердить" kind="mint" onPress={() => { confirmQuest(q.id); show(`+${q.stars} ⭐ Алихану`); }} />
        </Card>
      ))}
      {requested.map((p) => (
        <Card key={p.id} color="violet">
          <Text style={T.h3}>{p.emoji} {p.title}</Text>
          <Text style={T.meta}>Алихан хочет обменять {p.cost} ⭐ (на балансе {state.stars})</Text>
          <Button title="Выдать приз" disabled={state.stars < p.cost} onPress={() => { givePrize(p.id); show('Приз выдан 🎁'); }} />
        </Card>
      ))}

      <Section title="Семейные призы" />
      {state.prizes.map((p) => (
        <View key={p.id} style={[T.rowb, { paddingVertical: 8 }]}>
          <Text style={T.text}>{p.emoji} {p.title}</Text>
          <Text style={{ fontWeight: '800', color: colors.violet }}>{p.state === 'given' ? 'выдан' : `${p.cost} ⭐`}</Text>
        </View>
      ))}
      <Input placeholder="Новый приз, например «Поход в аквапарк»" value={prizeTitle} onChangeText={setPrizeTitle} />
      <Input placeholder="Цена в звёздах" keyboardType="number-pad" value={prizeCost} onChangeText={setPrizeCost} />
      <Button title="Добавить приз" kind="ghost" disabled={!prizeTitle || !Number(prizeCost)} onPress={() => { addPrize(prizeTitle, Number(prizeCost)); setPrizeTitle(''); setPrizeCost(''); show('Приз добавлен'); }} />

      <Section title="Добавить ребёнка" />
      <Input placeholder="Имя" value={kidName} onChangeText={setKidName} />
      <Input placeholder="Возраст" keyboardType="number-pad" value={kidAge} onChangeText={setKidAge} />
      <Button title="Добавить" kind="ghost" disabled={!kidName || !Number(kidAge)} onPress={() => { addKid(kidName, Number(kidAge)); setKidName(''); setKidAge(''); }} />
      <Toast text={toast} />
    </Screen>
  );
}
