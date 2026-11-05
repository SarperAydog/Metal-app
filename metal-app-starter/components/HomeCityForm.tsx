import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/Button';
import { strings } from '@/constants/strings';
import { colors, fontSize, minTouchTarget, radius, spacing } from '@/constants/theme';
import { findCity, nearestBigCity, searchCities, type City } from '@/lib/catalog';
import { useAuth } from '@/lib/auth';

const countryName = (city: City) => strings.countries[city.country] ?? city.country;
const cityLabel = (city: City) => `${city.name}, ${countryName(city)}`;

// Many small places share a name, so they also show the big city they are near.
const resultDetail = (city: City) => {
  const big = nearestBigCity(city);
  return big ? `${strings.city.near(big.name)}, ${countryName(city)}` : countryName(city);
};

/** Type-ahead home city search. Used in onboarding and from the profile. */
export function HomeCityForm({ submitLabel, onSaved }: { submitLabel: string; onSaved?: () => void }) {
  const { homeCityId, saveHomeCity } = useAuth();
  const [selected, setSelected] = useState<City | undefined>(() => findCity(homeCityId));
  const [text, setText] = useState(selected ? cityLabel(selected) : '');
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  const results = useMemo(() => (selected ? [] : searchCities(text)), [selected, text]);
  const showNoResults = !selected && text.trim().length > 0 && results.length === 0;

  const submit = async () => {
    if (!selected) return;
    setSaving(true);
    setFailed(false);
    const saved = await saveHomeCity(selected.id);
    if (saved) {
      onSaved?.();
    } else {
      setFailed(true);
      setSaving(false);
    }
  };

  return (
    <View>
      <TextInput
        accessibilityLabel={strings.city.label}
        autoCapitalize="words"
        autoCorrect={false}
        autoFocus
        onChangeText={(value) => {
          setText(value);
          setSelected(undefined);
        }}
        placeholder={strings.city.placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={text}
      />
      {results.length > 0 ? (
        <View style={styles.results}>
          {results.map((city) => (
            <Pressable
              accessibilityRole="button"
              key={city.id}
              onPress={() => {
                setSelected(city);
                setText(cityLabel(city));
              }}
              style={({ pressed }) => [styles.result, pressed && styles.pressed]}>
              <Text style={styles.resultName}>{city.name}</Text>
              <Text style={styles.resultCountry}>{resultDetail(city)}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      {showNoResults ? <Text style={styles.message}>{strings.city.noResults}</Text> : null}
      {failed ? <Text style={styles.error}>{strings.city.saveFailed}</Text> : null}
      <View style={styles.submit}>
        <Button
          disabled={!selected || saving}
          label={saving ? strings.city.saving : submitLabel}
          onPress={submit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  results: {
    marginTop: spacing.sm,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  result: {
    minHeight: minTouchTarget + 4,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  pressed: { backgroundColor: colors.border },
  resultName: { color: colors.text, fontSize: fontSize.body, flexShrink: 1 },
  resultCountry: { color: colors.textMuted, fontSize: fontSize.small, flexShrink: 1, textAlign: 'right' },
  message: { color: colors.textMuted, fontSize: fontSize.small, marginTop: spacing.sm },
  error: { color: colors.danger, fontSize: fontSize.small, marginTop: spacing.sm },
  submit: { marginTop: spacing.lg },
});
