import { router } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { Button, Card, Header, Screen, T } from '../components/ui';
import { useApp } from '../store/AppStore';
import type { Role } from '../types';
import { roleTitles } from '../roles';

export default function RoleScreen() {
  const { state, setRole, logout, resetDemo } = useApp();
  const pick = (r: Role) => {
    setRole(r);
    router.dismissAll();
    router.replace(`/${r}`);
  };
  return (
    <Screen>
      <Header title="Сменить роль" back />
      <Text style={[T.meta, { marginBottom: 12 }]}>В демо можно переключаться между ролями и видеть, как действия одной роли влияют на другую: тренер отмечает посещение — у ребёнка появляются звёзды.</Text>
      {(Object.keys(roleTitles) as Role[]).map((r) => (
        <Card key={r} onPress={() => pick(r)} color={state.role === r ? 'violet' : undefined}>
          <Text style={T.h3}>{roleTitles[r].e}  {roleTitles[r].t}</Text>
        </Card>
      ))}
      <Button title="Сбросить демо-данные" kind="ghost" onPress={() => { resetDemo(); router.back(); }} />
      <Button title="Выйти" kind="danger" onPress={() => { logout(); router.dismissAll(); router.replace('/'); }} />
    </Screen>
  );
}
