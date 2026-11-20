import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Card, Header, Screen, T, Tag, Toast, useToast } from '../../../components/ui';
import * as kaspi from '../../../services/kaspi';
import { useApp } from '../../../store/AppStore';
import { colors } from '../../../theme';

export default function Disputes() {
  const { state, resolveDispute } = useApp();
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, show] = useToast();

  const refund = async (id: string, amount: number) => {
    setBusy(id);
    const ok = await kaspi.refund(`demo_${id}`, amount);
    setBusy(null);
    if (ok) {
      resolveDispute(id, 'refund');
      show('Возврат отправлен в Kaspi');
    }
  };

  return (
    <Screen>
      <Header title="Возвраты и споры" />
      {state.disputes.map((d) => (
        <Card key={d.id}>
          <View style={T.rowb}>
            <Text style={T.h3}>{d.title}</Text>
            <Tag label={d.tag} status={d.tagStatus} />
          </View>
          <Text style={T.meta}>{d.meta}</Text>
          {d.decision ? (
            <View style={{ marginTop: 10 }}><Tag label={d.decision === 'refund' ? 'Возврат оформлен' : 'Отклонено'} status={d.decision === 'refund' ? 'ok' : 'bad'} /></View>
          ) : d.amount ? (
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              <Pressable disabled={busy === d.id} onPress={() => refund(d.id, d.amount!)} style={{ flex: 1, height: 44, borderRadius: 14, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>{busy === d.id ? '…' : 'Вернуть'}</Text>
              </Pressable>
              <Pressable onPress={() => resolveDispute(d.id, 'decline')} style={{ flex: 1, height: 44, borderRadius: 14, backgroundColor: colors.coralSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.coral, fontWeight: '700' }}>Отказать</Text>
              </Pressable>
            </View>
          ) : null}
        </Card>
      ))}
      <Toast text={toast} />
    </Screen>
  );
}
