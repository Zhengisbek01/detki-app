import React from 'react';
import { Text, View } from 'react-native';
import { teacherGross, teacherIncome } from '../../../api/mockData';
import { Button, Card, Header, KV, Panel, Screen, T, Toast, useToast } from '../../../components/ui';
import { PLATFORM_COMMISSION, teacherSummary } from '../../../services/finance';
import { colors } from '../../../theme';
import { tenge } from '../../../utils/format';

export default function Finance() {
  const [toast, show] = useToast();
  const sum = teacherSummary(teacherGross.payments, teacherGross.refunds);
  const max = Math.max(...teacherIncome.map((m) => m.value));
  const toPay = sum.income - teacherGross.hold - 150600; // часть уже выплачена ранее в месяце (демо)

  return (
    <Screen>
      <Header title="Финансы" />
      <View style={{ backgroundColor: colors.violet, borderRadius: 28, padding: 20, marginBottom: 12 }}>
        <Text style={{ color: '#fff', opacity: 0.85 }}>К выплате в {teacherGross.payoutDate}</Text>
        <Text style={{ color: '#fff', fontSize: 34, fontWeight: '900', marginVertical: 4 }}>{tenge(toPay)}</Text>
        <View style={T.rowb}>
          <Text style={{ color: '#fff', opacity: 0.85 }}>В холде: {tenge(teacherGross.hold)}</Text>
          <Text style={{ color: '#fff', opacity: 0.85 }}>{teacherGross.card}</Text>
        </View>
      </View>
      <Card>
        <View style={T.rowb}><Text style={T.h3}>Доход по месяцам</Text><Text style={T.meta}>тыс. ₸</Text></View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 120, gap: 10, marginTop: 12 }}>
          {teacherIncome.map((m, i) => (
            <View key={m.month} style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ width: '100%', height: (m.value / max) * 100, borderRadius: 10, backgroundColor: i === teacherIncome.length - 1 ? colors.violet : colors.violetSoft }} />
              <Text style={[T.meta, { fontSize: 11 }]}>{m.month}</Text>
            </View>
          ))}
        </View>
      </Card>
      <Panel>
        <KV k="Оплаты родителей" v={tenge(sum.payments)} />
        <KV k={`Комиссия ${PLATFORM_COMMISSION * 100}%`} v={`−${tenge(sum.commission)}`} vColor={colors.coral} />
        <KV k="Возвраты" v={`−${tenge(sum.refunds)}`} vColor={colors.coral} />
        <KV k="Ваш доход" v={tenge(sum.income)} vColor={colors.mint} />
      </Panel>
      <Button title="Скачать акт за ноябрь" kind="ghost" onPress={() => show('Акт и ЭСФ на комиссию за ноябрь отправлены на e-mail')} />
      <Toast text={toast} />
    </Screen>
  );
}
