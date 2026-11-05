import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HomeCityForm } from '@/components/HomeCityForm';
import { strings } from '@/constants/strings';
import { colors, fontSize, spacing } from '@/constants/theme';

export function HomeCityScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text accessibilityRole="header" style={styles.title}>
            {strings.city.title}
          </Text>
          <Text style={styles.hint}>{strings.city.hint}</Text>
          <HomeCityForm submitLabel={strings.city.continue} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl * 2 },
  content: { width: '100%', maxWidth: 420 },
  title: { color: colors.text, fontSize: fontSize.title + 4, fontWeight: '800' },
  hint: { color: colors.textMuted, fontSize: fontSize.body, marginTop: spacing.sm, marginBottom: spacing.lg },
});
