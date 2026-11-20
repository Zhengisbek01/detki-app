import { Stack } from 'expo-router';
import React from 'react';
import { colors } from '../../theme';

export default function ChildLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />;
}
