import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Emoji, Header, Screen, T, Tag, Toast, useToast } from '../../../components/ui';
import { useApp } from '../../../store/AppStore';
import { colors } from '../../../theme';

export default function Prizes() {
  const { state, requestPrize } = useApp();
  const [toast, show] = useToast();
  return (
    <Screen>
      <Header title="Семейные призы" subtitle={`У тебя ⭐ ${state.stars}`} />
      <Text style={[T.meta, { marginBottom: 10 }]}>Призы придумывают родители. Накопи звёзды и попроси приз!</Text>
      {state.prizes.map((p) => {
        const can = state.stars >= p.cost;
        return (
          <Card key={p.id}>
            <View style={T.row}>
              <Emoji e={p.emoji} color={p.color} />
              <View style={{ flex: 1 }}>
                <Text style={T.h3}>{p.title}</Text>
                <Text style={{ fontWeight: '800', color: colors.violet }}>{p.cost} ⭐</Text>
              </View>
              {p.state === 'requested' && <Tag label="Ждёт родителей" status="warn" />}
              {p.state === 'given' && <Tag label="Получен 🎉" status="ok" />}
            </View>
            {p.state === 'available' && (
              <Button
                title={can ? 'Хочу этот приз!' : `Ещё ${p.cost - state.stars} ⭐`}
                kind={can ? 'primary' : 'ghost'}
                disabled={!can}
                onPress={() => requestPrize(p.id) && show('Родители получили запрос 💌')}
              />
            )}
          </Card>
        );
      })}
      <Toast text={toast} />
    </Screen>
  );
}
