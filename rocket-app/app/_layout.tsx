import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { hydrateCustomSequences } from '@/features/teach/store';
import { hydrateSessions } from '@/features/progress/store';
import { hydrateSettings } from '@/features/settings/store';
import { useTheme } from '@/theme';

export default function RootLayout() {
  const theme = useTheme();
  const [ready, setReady] = useState(false);

  // Everything is read from device storage, so the first paint waits on it.
  // Hydration is three small reads; if any of them fail they resolve to
  // defaults rather than rejecting, so the app always opens.
  useEffect(() => {
    void Promise.all([hydrateSettings(), hydrateSessions(), hydrateCustomSequences()]).finally(() =>
      setReady(true),
    );
  }, []);

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: theme.color.void }} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.color.base },
          headerTintColor: theme.color.textPrimary,
          headerTitleStyle: { fontWeight: '600' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.color.base },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="practice/[sequenceId]"
          options={{ headerShown: false, animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen name="summary" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="sequence/[sequenceId]" options={{ title: '' }} />
        <Stack.Screen name="pose/[poseId]" options={{ title: '', presentation: 'modal' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="teach/build" options={{ title: 'Build a sequence' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
