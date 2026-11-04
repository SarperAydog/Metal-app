import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '@/constants/theme';

type Props = {
  title: string;
  body?: string;
  children?: ReactNode;
};

// A centered title and text: used for empty tabs and status screens.
export function MessageScreen({ title, body, children }: Props) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {children ? <View style={styles.actions}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  body: {
    color: colors.textMuted,
    fontSize: fontSize.body,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: spacing.sm,
    maxWidth: 420,
  },
  actions: { marginTop: spacing.lg },
});
