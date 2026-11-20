import React from 'react';
import { Text, View } from 'react-native';
import { classes } from '../../../api/mockData';
import { RoleSwitch } from '../../../components/RoleSwitch';
import { Avatar, Card, Header, KV, Panel, Screen, Section, T } from '../../../components/ui';
import { useApp } from '../../../store/AppStore';
import { tenge } from '../../../utils/format';

export default function Profile() {
  const { state } = useApp();
  return (
    <Screen>
      <Header title="Профиль" right={<RoleSwitch />} />
      <Card>
        <View style={T.row}>
          <Avatar name="М" size={56} />
          <View>
            <Text style={T.h3}>Мадина К.</Text>
            <Text style={T.meta}>{state.phone || '+7 701 *** ** 12'}</Text>
          </View>
        </View>
      </Card>
      <Panel>
        <KV k="Язык" v={{ ru: 'Русский', kk: 'Қазақша', en: 'English' }[state.lang]} />
        <KV k="Способ оплаты" v="Kaspi.kz" />
        <KV k="Уведомления" v="Вкл" />
      </Panel>
      <Section title="Чеки" />
      {state.bookings.length === 0 && <Text style={T.meta}>Оплат пока нет</Text>}
      {state.bookings.map((b) => (
        <Panel key={b.id}>
          <KV k={classes.find((c) => c.id === b.classId)?.name ?? ''} v={tenge(b.amount)} />
        </Panel>
      ))}
    </Screen>
  );
}
