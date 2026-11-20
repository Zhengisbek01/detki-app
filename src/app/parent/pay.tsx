import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { tariffs } from '../../api/mockData';
import { Button, Header, KV, Panel, Screen, T, Toast, useToast } from '../../components/ui';
import { splitPayment } from '../../services/finance';
import * as kaspi from '../../services/kaspi';
import { useApp } from '../../store/AppStore';
import { colors } from '../../theme';
import { tenge } from '../../utils/format';

export default function Pay() {
  const { classId, kidId, tariffId, date } = useLocalSearchParams<{ classId: string; kidId: string; tariffId: string; date: string }>();
  const { addBooking } = useApp();
  const [loading, setLoading] = useState(false);
  const [toast, show] = useToast();
  const t = tariffs.find((x) => x.id === tariffId)!;
  const split = splitPayment(t.price);

  const pay = async () => {
    try {
      setLoading(true);
      const inv = await kaspi.createInvoice(t.price, t.name);
      await kaspi.openKaspi(inv); // в проде — переход в Kaspi.kz
      const status = await kaspi.getStatus(inv.paymentId);
      if (status !== 'paid') throw new Error('Оплата не прошла');
      const b = addBooking({ classId, kidId, tariffId, amount: t.price, paymentId: inv.paymentId, status: 'paid', firstLesson: date });
      router.replace({ pathname: '/parent/success', params: { bookingId: b.id } });
    } catch (e) {
      show(e instanceof Error ? e.message : 'Ошибка оплаты');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Header title="Оплата" back />
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <View style={{ width: 88, height: 88, borderRadius: 28, backgroundColor: colors.kaspi, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 30, fontWeight: '900' }}>K</Text>
        </View>
        <Text style={[T.meta, { marginTop: 12 }]}>К оплате</Text>
        <Text style={{ fontSize: 34, fontWeight: '900', color: colors.ink }}>{tenge(t.price)}</Text>
        <Text style={T.meta}>{t.name}</Text>
      </View>
      <Panel>
        <KV k="Сумма" v={tenge(t.price)} />
        <KV k="Из неё преподавателю" v={tenge(split.teacherPayout)} />
        <KV k="Сервисный сбор платформы" v={tenge(split.commission)} />
      </Panel>
      <Text style={[T.meta, { textAlign: 'center' }]}>Деньги поступят преподавателю после первого занятия. Возврат — по правилам отмены.</Text>
      <Button title="Оплатить в Kaspi.kz" kind="kaspi" onPress={pay} loading={loading} />
      <Text style={[T.meta, { textAlign: 'center', marginTop: 8 }]}>Демо: оплата имитируется (src/services/kaspi.ts)</Text>
      <Toast text={toast} />
    </Screen>
  );
}
