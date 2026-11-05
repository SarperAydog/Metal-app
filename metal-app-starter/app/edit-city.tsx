import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { HomeCityForm } from '@/components/HomeCityForm';
import { strings } from '@/constants/strings';
import { colors, spacing } from '@/constants/theme';

export default function EditCityScreen() {
  const router = useRouter();
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      style={styles.screen}>
      <HomeCityForm onSaved={() => router.back()} submitLabel={strings.city.save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, width: '100%', maxWidth: 560, alignSelf: 'center' },
});
