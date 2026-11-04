import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/Button';
import { strings, USERNAME_MAX, USERNAME_MIN } from '@/constants/strings';
import { colors, fontSize, minTouchTarget, radius, spacing } from '@/constants/theme';
import { useAuth } from '@/lib/auth';

export function UsernameScreen() {
  const { saveUsername } = useAuth();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    const trimmed = name.trim();
    if (trimmed.length < USERNAME_MIN) {
      setError(strings.username.tooShort);
      return;
    }
    setSaving(true);
    setError(null);
    const saved = await saveUsername(trimmed);
    if (!saved) {
      setError(strings.username.saveFailed);
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.welcome}>
          {strings.username.welcome}
        </Text>
        <Text style={styles.prompt}>{strings.username.prompt}</Text>
        <TextInput
          accessibilityLabel={strings.username.prompt}
          autoCapitalize="words"
          autoCorrect={false}
          autoFocus
          maxLength={USERNAME_MAX}
          onChangeText={setName}
          onSubmitEditing={submit}
          placeholder={strings.username.placeholder}
          placeholderTextColor={colors.textMuted}
          returnKeyType="done"
          style={styles.input}
          value={name}
        />
        <Text style={error ? styles.error : styles.hint}>{error ?? strings.username.hint}</Text>
        <Button
          disabled={saving}
          label={saving ? strings.username.saving : strings.username.continue}
          onPress={submit}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  content: { width: '100%', maxWidth: 420 },
  welcome: { color: colors.text, fontSize: fontSize.display, fontWeight: '800' },
  prompt: {
    color: colors.textMuted,
    fontSize: fontSize.body,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  input: {
    minHeight: minTouchTarget + 8,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: fontSize.body,
    paddingHorizontal: spacing.md,
  },
  hint: {
    color: colors.textMuted,
    fontSize: fontSize.small,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.small,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});
