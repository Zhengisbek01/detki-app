import { Tabs } from 'expo-router/js-tabs';
import React from 'react';
import { tabIcon, tabOptions } from '../../../components/TabIcon';

export default function AdminTabs() {
  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen name="index" options={{ title: 'Модерация', tabBarIcon: tabIcon('🛡️') }} />
      <Tabs.Screen name="payments" options={{ title: 'Платежи', tabBarIcon: tabIcon('💳') }} />
      <Tabs.Screen name="disputes" options={{ title: 'Споры', tabBarIcon: tabIcon('⚖️') }} />
    </Tabs>
  );
}
