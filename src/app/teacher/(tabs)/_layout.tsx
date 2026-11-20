import { Tabs } from 'expo-router/js-tabs';
import React from 'react';
import { tabIcon, tabOptions } from '../../../components/TabIcon';

export default function TeacherTabs() {
  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen name="index" options={{ title: 'Сегодня', tabBarIcon: tabIcon('🏠') }} />
      <Tabs.Screen name="classes" options={{ title: 'Занятия', tabBarIcon: tabIcon('📚') }} />
      <Tabs.Screen name="finance" options={{ title: 'Финансы', tabBarIcon: tabIcon('💳') }} />
      <Tabs.Screen name="profile" options={{ title: 'Профиль', tabBarIcon: tabIcon('👤') }} />
    </Tabs>
  );
}
