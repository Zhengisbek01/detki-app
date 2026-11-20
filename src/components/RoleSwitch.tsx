import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, shadow } from '../theme';

/** Кнопка смены роли (для демо: в проде роль определяется аккаунтом) */
export function RoleSwitch() {
  return (
    <Pressable
      onPress={() => router.push('/role')}
      style={{ height: 40, paddingHorizontal: 12, borderRadius: 14, backgroundColor: colors.card, justifyContent: 'center', ...shadow }}
    >
      <Text style={{ fontWeight: '700', color: colors.violet }}>Роль ⇄</Text>
    </Pressable>
  );
}
