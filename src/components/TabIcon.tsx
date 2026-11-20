import React from 'react';
import { Text } from 'react-native';

/** Иконки вкладок — эмодзи, чтобы не тянуть пакет иконок и сохранить детский стиль */
export const tabIcon = (emoji: string) =>
  function Icon({ focused }: { focused: boolean }) {
    return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>;
  };

export const tabOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#6A4DFF',
  tabBarInactiveTintColor: '#8C88A8',
  tabBarStyle: { height: 84, paddingTop: 8, borderTopColor: '#ECEAF5' },
  tabBarLabelStyle: { fontSize: 11, fontWeight: '700' as const },
};
