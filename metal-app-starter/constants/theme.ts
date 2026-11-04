// Readability first: high contrast, large text, generous spacing.
export const colors = {
  background: '#0E0E10',
  surface: '#1C1C21',
  border: '#34343B',
  text: '#F5F5F7',
  textMuted: '#B4B4BC',
  accent: '#F2C230',
  onAccent: '#111111',
  danger: '#FF7A6B',
  onDanger: '#111111',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const fontSize = { body: 17, small: 15, title: 24, display: 34 } as const;

export const radius = 12;

export const minTouchTarget = 48;
