import React from 'react';
import { Text, View } from 'react-native';
import { RoleSwitch } from '../../../components/RoleSwitch';
import { Avatar, Card, Header, KV, Panel, Screen, T, Tag } from '../../../components/ui';

export default function TeacherProfile() {
  return (
    <Screen>
      <Header title="Профиль" right={<RoleSwitch />} />
      <Card>
        <View style={T.row}>
          <Avatar name="Ерлан" size={56} />
          <View style={{ flex: 1 }}>
            <Text style={T.h3}>Ерлан Сапаров</Text>
            <Text style={T.meta}>ИП · ★ 4,9 · 38 отзывов</Text>
          </View>
          <Tag label="Проверен" status="ok" />
        </View>
      </Card>
      <Panel>
        <KV k="ИИН" v="9001******12" />
        <KV k="Справка о несудимости" v="до 14.09.2027" />
        <KV k="Реквизиты для выплат" v="Kaspi Gold •• 4512" />
        <KV k="Налоговый режим" v="ИП, упрощёнка" />
      </Panel>
    </Screen>
  );
}
