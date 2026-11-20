import { Stack } from 'expo-router';
import React from 'react';
import { colors } from '../../theme';

export default function AdminLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />;
}
