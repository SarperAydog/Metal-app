import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { strings } from '@/constants/strings';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { useAuth } from '@/lib/auth';

export default function ProfileScreen() {
  const { username, deleteAccount } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [failed, setFailed] = useState(false);

  const confirmDelete = async () => {
    setDeleting(true);
    setFailed(false);
    const deleted = await deleteAccount();
    if (!deleted) {
      setFailed(true);
      setDeleting(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>{strings.profile.nameLabel}</Text>
      <Text style={styles.name}>{username}</Text>

      <Text accessibilityRole="header" style={styles.section}>
        {strings.profile.settings}
      </Text>
      <View style={styles.card}>
        {confirming ? (
          <>
            <Text style={styles.warning}>{strings.profile.deleteWarning}</Text>
            {failed ? <Text style={styles.error}>{strings.profile.deleteFailed}</Text> : null}
            <View style={styles.buttons}>
              <Button
                disabled={deleting}
                label={deleting ? strings.profile.deleting : strings.profile.deleteConfirm}
                onPress={confirmDelete}
                variant="danger"
              />
              <Button
                disabled={deleting}
                label={strings.profile.deleteCancel}
                onPress={() => setConfirming(false)}
                variant="secondary"
              />
            </View>
          </>
        ) : (
          <Button
            label={strings.profile.deleteAccount}
            onPress={() => setConfirming(true)}
            variant="secondary"
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, width: '100%', maxWidth: 560, alignSelf: 'center' },
  label: { color: colors.textMuted, fontSize: fontSize.small },
  name: { color: colors.text, fontSize: fontSize.title, fontWeight: '700', marginTop: spacing.xs },
  section: {
    color: colors.text,
    fontSize: fontSize.body,
    fontWeight: '700',
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  card: { backgroundColor: colors.surface, borderRadius: radius, padding: spacing.md },
  warning: { color: colors.text, fontSize: fontSize.body, lineHeight: 24 },
  error: { color: colors.danger, fontSize: fontSize.small, marginTop: spacing.sm },
  buttons: { gap: spacing.sm, marginTop: spacing.md },
});
