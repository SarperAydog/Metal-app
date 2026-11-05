import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { GenreForm } from '@/components/GenreForm';
import { HomeCityScreen } from '@/components/HomeCityScreen';
import { MessageScreen } from '@/components/MessageScreen';
import { UsernameScreen } from '@/components/UsernameScreen';
import { strings } from '@/constants/strings';
import { colors } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/lib/auth';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.accent,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
  },
};

function Gate() {
  const { status, retry } = useAuth();

  switch (status) {
    case 'loading':
      return (
        <View
          accessibilityLabel={strings.status.loading}
          accessibilityRole="progressbar"
          style={styles.loading}>
          <ActivityIndicator color={colors.accent} size="large" />
        </View>
      );
    case 'not-configured':
      return <MessageScreen title={strings.status.setupTitle} body={strings.status.setupBody} />;
    case 'error':
      return (
        <MessageScreen title={strings.status.errorTitle} body={strings.status.errorBody}>
          <Button label={strings.status.retry} onPress={retry} />
        </MessageScreen>
      );
    case 'needs-username':
      return <UsernameScreen />;
    case 'needs-city':
      return <HomeCityScreen />;
    case 'needs-genres':
      return (
        <SafeAreaView edges={['top']} style={styles.onboarding}>
          <GenreForm hint={strings.genres.hint} title={strings.genres.title} />
        </SafeAreaView>
      );
    case 'ready':
      return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="notifications"
            options={{ presentation: 'modal', title: strings.notifications.title }}
          />
          <Stack.Screen name="edit-city" options={{ title: strings.city.editTitle }} />
          <Stack.Screen name="edit-genres" options={{ title: strings.genres.editTitle }} />
        </Stack>
      );
  }
}

export default function RootLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <AuthProvider>
        <StatusBar style="light" />
        <Gate />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  onboarding: { flex: 1, backgroundColor: colors.background },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
