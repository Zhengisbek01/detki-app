import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { platformMonth } from '../../../api/mockData';
import { Button, Card, Chip, Header, KV, Panel, Screen, Stat, T, Toast, useToast } from '../../../components/ui';
import { ACQUIRING_RATE, PLATFORM_COMMISSION, VAT_RATE, platformSummary } from '../../../services/finance';
import { colors } from '../../../theme';
import { tenge } from '../../../utils/format';

const periods = { month: 1, week: 0.24, today: 0.035 } as const;

export default function Payments() {
  const [period, setPeriod] = useState<keyof typeof periods>('month');
  const [toast, show] = useToast();
  const sum = platformSummary(platformMonth.gmv * periods[period]);
  const pct = (n: number) => `${Math.round(n * 100)}%`;

  return (
    <Screen>
      <Header title="Платежи" />
      <View style={[T.wrap, { marginBottom: 12 }]}>
        <Chip label={platformMonth.label} on={period === 'month'} onPress={() => setPeriod('month')} />
        <Chip label="Неделя" on={period === 'week'} onPress={() => setPeriod('week')} />
        <Chip label="Сегодня" on={period === 'today'} onPress={() => setPeriod('today')} />
      </View>
      <View style={{ backgroundColor: colors.violet, borderRadius: 28, padding: 20, marginBottom: 12 }}>
        <Text style={{ color: '#fff', opacity: 0.85 }}>Оборот (GMV)</Text>
        <Text style={{ color: '#fff', fontSize: 32, fontWeight: '900', marginVertical: 4 }}>{tenge(sum.gmv)}</Text>
        <Text style={{ color: '#fff', opacity: 0.85 }}>Комиссия {pct(PLATFORM_COMMISSION)}: {tenge(sum.commission)}</Text>
      </View>
      <Stat items={[
        { value: tenge(sum.vat), label: `НДС ${pct(VAT_RATE)} в комиссии` },
        { value: tenge(sum.acquiring), label: `эквайринг ~${pct(ACQUIRING_RATE)}` },
      ]} />
      <Card>
        <Text style={T.h3}>Способы оплаты</Text>
        <View style={{ flexDirection: 'row', height: 14, borderRadius: 10, overflow: 'hidden', marginVertical: 10 }}>
          <View style={{ width: `${platformMonth.kaspiShare * 100}%`, backgroundColor: colors.kaspi }} />
          <View style={{ flex: 1, backgroundColor: colors.sky }} />
        </View>
        <View style={T.rowb}>
          <Text style={T.meta}>🟥 Kaspi {pct(platformMonth.kaspiShare)}</Text>
          <Text style={T.meta}>🟦 Карты {pct(1 - platformMonth.kaspiShare)}</Text>
        </View>
      </Card>
      <Panel>
        <KV k="Чистая выручка платформы" v={tenge(sum.netRevenue)} vColor={colors.mint} />
        <KV k={`Выплата ${platformMonth.payoutDate}`} v={`${platformMonth.teachersToPay} преподавателей`} />
      </Panel>
      <Button title="Выгрузить реестр" kind="ghost" onPress={() => show('Реестр выплат и выгрузка для 1С сформированы')} />
      <Toast text={toast} />
    </Screen>
  );
}
