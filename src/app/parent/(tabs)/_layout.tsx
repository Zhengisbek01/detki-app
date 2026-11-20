import { Tabs } from 'expo-router/js-tabs';
import React from 'react';
import { tabIcon, tabOptions } from '../../../components/TabIcon';

export default function ParentTabs() {
  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen name="index" options={{ title: 'Поиск', tabBarIcon: tabIcon('🔍') }} />
      <Tabs.Screen name="schedule" options={{ title: 'Расписание', tabBarIcon: tabIcon('📅') }} />
      <Tabs.Screen name="kids" options={{ title: 'Дети', tabBarIcon: tabIcon('🧒') }} />
      <Tabs.Screen name="profile" options={{ title: 'Профиль', tabBarIcon: tabIcon('👤') }} />
    </Tabs>
  );
}
