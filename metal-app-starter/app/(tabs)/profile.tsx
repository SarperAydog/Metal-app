import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { strings } from '@/constants/strings';
import { colors, fontSize, minTouchTarget, radius, spacing } from '@/constants/theme';
import { useAuth } from '@/lib/auth';
import { findCity, findGenre } from '@/lib/catalog';

export default function ProfileScreen() {
  const { username, homeCityId, genreSelections, deleteAccount } = useAuth();
  const city = findCity(homeCityId);
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

      <View style={styles.sectionRow}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          {strings.profile.homeCity}
        </Text>
        <Link accessibilityLabel={`${strings.profile.change}: ${strings.profile.homeCity}`} href="/edit-city" style={styles.change}>
          {strings.profile.change}
        </Link>
      </View>
      <View style={styles.card}>
        <Text style={styles.value}>
          {city ? `${city.name}, ${strings.countries[city.country] ?? city.country}` : homeCityId}
        </Text>
      </View>

      <View style={styles.sectionRow}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          {strings.profile.genres}
        </Text>
        <Link accessibilityLabel={`${strings.profile.change}: ${strings.profile.genres}`} href="/edit-genres" style={styles.change}>
          {strings.profile.change}
        </Link>
      </View>
      <View style={styles.card}>
        {genreSelections.map((selection, index) => (
          <View key={selection.genreId} style={styles.genreRow}>
            <Text style={styles.genreRank}>{index + 1}</Text>
            <View style={styles.genreText}>
              <Text style={styles.value}>{findGenre(selection.genreId)?.name ?? selection.genreId}</Text>
              <Text style={styles.genreDetail}>
                {selection.subgenreIds
                  ? strings.genres.someSubgenres(selection.subgenreIds.length)
                  : strings.genres.allSubgenres}
              </Text>
            </View>
          </View>
        ))}
      </View>

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
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  sectionTitle: { color: colors.text, fontSize: fontSize.body, fontWeight: '700' },
  change: {
    color: colors.accent,
    fontSize: fontSize.small,
    fontWeight: '600',
    paddingVertical: (minTouchTarget - fontSize.small - 4) / 2,
    paddingLeft: spacing.lg,
  },
  value: { color: colors.text, fontSize: fontSize.body },
  genreRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xs },
  genreRank: { color: colors.accent, fontSize: fontSize.body, fontWeight: '800', minWidth: 20 },
  genreText: { flex: 1 },
  genreDetail: { color: colors.textMuted, fontSize: fontSize.small },
  card: { backgroundColor: colors.surface, borderRadius: radius, padding: spacing.md },
  warning: { color: colors.text, fontSize: fontSize.body, lineHeight: 24 },
  error: { color: colors.danger, fontSize: fontSize.small, marginTop: spacing.sm },
  buttons: { gap: spacing.sm, marginTop: spacing.md },
});
