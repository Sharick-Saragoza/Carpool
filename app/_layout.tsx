import '@/global.css';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

import React = require('react');

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}