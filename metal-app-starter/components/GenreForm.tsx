import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { RankList, type RankItem } from '@/components/RankList';
import { strings } from '@/constants/strings';
import { colors, fontSize, minTouchTarget, radius, spacing } from '@/constants/theme';
import { useAuth } from '@/lib/auth';
import { findGenre, genres, type Genre, type GenreSelection } from '@/lib/catalog';

const detailFor = (selection: GenreSelection) =>
  selection.subgenreIds ? strings.genres.someSubgenres(selection.subgenreIds.length) : strings.genres.allSubgenres;

/** Genre choice, then ranking. Used in onboarding and from the profile. */
export function GenreForm({
  title,
  hint,
  onSaved,
}: {
  title?: string;
  hint?: string;
  onSaved?: () => void;
}) {
  const { genreSelections, saveGenres } = useAuth();
  const [selections, setSelections] = useState<GenreSelection[]>(genreSelections);
  const [step, setStep] = useState<'pick' | 'rank'>('pick');
  const [customizing, setCustomizing] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const insets = useSafeAreaInsets();

  const selectionFor = (genreId: string) => selections.find((s) => s.genreId === genreId);

  const setSubgenres = (genreId: string, subgenreIds: string[] | null) =>
    setSelections((current) => current.map((s) => (s.genreId === genreId ? { ...s, subgenreIds } : s)));

  // Closing the list with nothing ticked means the user did not narrow the genre down.
  const closeCustomizing = () => {
    if (customizing && selectionFor(customizing)?.subgenreIds?.length === 0) {
      setSubgenres(customizing, null);
    }
    setCustomizing(null);
  };

  const toggleGenre = (genre: Genre) => {
    closeCustomizing();
    if (selectionFor(genre.id)) {
      setSelections((current) => current.filter((s) => s.genreId !== genre.id));
    } else {
      setSelections((current) => [...current, { genreId: genre.id, subgenreIds: null }]);
    }
  };

  const startCustomizing = (genreId: string) => {
    if (!selectionFor(genreId)?.subgenreIds) setSubgenres(genreId, []);
    setCustomizing(genreId);
  };

  const toggleSubgenre = (genreId: string, subgenreId: string) => {
    const chosen = selectionFor(genreId)?.subgenreIds ?? [];
    setSubgenres(
      genreId,
      chosen.includes(subgenreId) ? chosen.filter((id) => id !== subgenreId) : [...chosen, subgenreId],
    );
  };

  const save = async () => {
    setSaving(true);
    setFailed(false);
    const saved = await saveGenres(selections);
    if (saved) {
      onSaved?.();
    } else {
      setFailed(true);
      setSaving(false);
    }
  };

  const continueFromPick = () => {
    closeCustomizing();
    if (selections.length > 1) setStep('rank');
    else save();
  };

  const rankItems: RankItem[] = selections.map((selection) => ({
    id: selection.genreId,
    label: findGenre(selection.genreId)?.name ?? selection.genreId,
    detail: detailFor(selection),
  }));

  const reorder = (items: RankItem[]) =>
    setSelections(items.map((item) => selections.find((s) => s.genreId === item.id)!));

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={!dragging}>
        {step === 'pick' ? (
          <>
            {title ? (
              <Text accessibilityRole="header" style={styles.title}>
                {title}
              </Text>
            ) : null}
            {hint ? <Text style={styles.hint}>{hint}</Text> : null}
            <View style={styles.list}>
              {genres.map((genre) => {
                const selection = selectionFor(genre.id);
                return (
                  <View key={genre.id} style={[styles.card, selection && styles.cardSelected]}>
                    <Pressable
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: Boolean(selection) }}
                      onPress={() => toggleGenre(genre)}
                      style={styles.cardHeader}>
                      <View style={[styles.check, selection && styles.checkSelected]}>
                        {selection ? <Text style={styles.checkMark}>✓</Text> : null}
                      </View>
                      <View style={styles.cardText}>
                        <Text style={styles.genreName}>{genre.name}</Text>
                        {selection && customizing !== genre.id ? (
                          <Text style={styles.detail}>{detailFor(selection)}</Text>
                        ) : null}
                      </View>
                    </Pressable>

                    {customizing === genre.id ? (
                      <View style={styles.panel}>
                        <View style={styles.chips}>
                          {genre.subgenres.map((subgenre) => {
                            const chosen = selection?.subgenreIds?.includes(subgenre.id) ?? false;
                            return (
                              <Pressable
                                accessibilityRole="checkbox"
                                accessibilityState={{ checked: chosen }}
                                key={subgenre.id}
                                onPress={() => toggleSubgenre(genre.id, subgenre.id)}
                                style={[styles.chip, chosen && styles.chipSelected]}>
                                <Text style={[styles.chipText, chosen && styles.chipTextSelected]}>
                                  {subgenre.name}
                                </Text>
                              </Pressable>
                            );
                          })}
                        </View>
                        <Button label={strings.genres.subgenreDone} onPress={closeCustomizing} variant="secondary" />
                      </View>
                    ) : null}

                    {selection && customizing !== genre.id ? (
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => startCustomizing(genre.id)}
                        style={styles.changeLink}>
                        <Text style={styles.changeText}>{strings.genres.subgenreChange}</Text>
                      </Pressable>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          <>
            <Text accessibilityRole="header" style={styles.title}>
              {strings.genres.rankTitle}
            </Text>
            <Text style={styles.hint}>{strings.genres.rankHint}</Text>
            <RankList items={rankItems} onChange={reorder} onDragChange={setDragging} />
          </>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: spacing.md + insets.bottom }]}>
        {failed ? <Text style={styles.error}>{strings.genres.saveFailed}</Text> : null}
        <View style={styles.buttons}>
          {step === 'pick' ? (
            <Button
              disabled={selections.length === 0 || saving}
              label={saving ? strings.genres.saving : selections.length > 1 ? strings.genres.continue : strings.genres.save}
              onPress={continueFromPick}
            />
          ) : (
            <>
              <Button
                disabled={saving}
                label={saving ? strings.genres.saving : strings.genres.save}
                onPress={save}
              />
              <Button
                disabled={saving}
                label={strings.genres.back}
                onPress={() => setStep('pick')}
                variant="secondary"
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, width: '100%', maxWidth: 560, alignSelf: 'center' },
  title: { color: colors.text, fontSize: fontSize.title + 4, fontWeight: '800' },
  hint: { color: colors.textMuted, fontSize: fontSize.body, marginTop: spacing.sm, marginBottom: spacing.lg },
  list: { gap: spacing.sm },
  card: {
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  cardSelected: { borderColor: colors.accent },
  cardHeader: {
    minHeight: minTouchTarget + 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  cardText: { flex: 1 },
  check: {
    width: 26,
    height: 26,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkSelected: { backgroundColor: colors.accent, borderColor: colors.accent },
  checkMark: { color: colors.onAccent, fontSize: 16, fontWeight: '800' },
  genreName: { color: colors.text, fontSize: fontSize.body, fontWeight: '600' },
  detail: { color: colors.textMuted, fontSize: fontSize.small, marginTop: 2 },
  panel: { paddingHorizontal: spacing.md, paddingBottom: spacing.md, gap: spacing.md },
  buttons: { gap: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    minHeight: minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: minTouchTarget / 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipText: { color: colors.text, fontSize: fontSize.small },
  chipTextSelected: { color: colors.onAccent, fontWeight: '700' },
  changeLink: {
    minHeight: minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  changeText: { color: colors.accent, fontSize: fontSize.small, fontWeight: '600' },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    gap: spacing.sm,
  },
  error: { color: colors.danger, fontSize: fontSize.small },
});
