import { Tabs } from 'expo-router/js-tabs';
import React from 'react';
import { tabIcon, tabOptions } from '../../../components/TabIcon';

export default function ChildTabs() {
  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen name="index" options={{ title: 'Главная', tabBarIcon: tabIcon('🏠') }} />
      <Tabs.Screen name="quests" options={{ title: 'Квесты', tabBarIcon: tabIcon('🎯') }} />
      <Tabs.Screen name="prizes" options={{ title: 'Призы', tabBarIcon: tabIcon('🎁') }} />
      <Tabs.Screen name="awards" options={{ title: 'Награды', tabBarIcon: tabIcon('🏆') }} />
    </Tabs>
  );
}
