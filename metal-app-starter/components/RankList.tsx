import { useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';

import { strings } from '@/constants/strings';
import { colors, fontSize, minTouchTarget, radius, spacing } from '@/constants/theme';

const ROW_HEIGHT = 68;
const ROW_GAP = spacing.sm;
const STEP = ROW_HEIGHT + ROW_GAP;

export type RankItem = { id: string; label: string; detail?: string };

type Props = {
  items: RankItem[];
  onChange: (items: RankItem[]) => void;
  /** Lets the parent stop scrolling while a row is being dragged. */
  onDragChange?: (dragging: boolean) => void;
};

/** Drag-to-reorder list, built on React Native's own gestures so it works on phone and web. */
export function RankList({ items, onChange, onDragChange }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const offset = useRef(new Animated.Value(0)).current;
  const latest = useRef({ items, onChange, onDragChange });
  latest.current = { items, onChange, onDragChange };
  const drag = useRef({ start: 0, current: 0 });

  const moveTo = (from: number, to: number) => {
    const next = [...latest.current.items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    latest.current.onChange(next);
  };

  const handlers = useRef({
    begin(id: string) {
      const index = latest.current.items.findIndex((item) => item.id === id);
      drag.current = { start: index, current: index };
      offset.setValue(0);
      setActiveId(id);
      latest.current.onDragChange?.(true);
    },
    move(dy: number) {
      const { start, current } = drag.current;
      const last = latest.current.items.length - 1;
      const target = Math.min(last, Math.max(0, start + Math.round(dy / STEP)));
      if (target !== current) {
        moveTo(current, target);
        drag.current.current = target;
      }
      // The row has already moved in the list, so only the remaining distance is animated.
      offset.setValue(dy - (target - start) * STEP);
    },
    end() {
      offset.setValue(0);
      setActiveId(null);
      latest.current.onDragChange?.(false);
    },
  }).current;

  return (
    <View style={{ gap: ROW_GAP }}>
      {items.map((item, index) => (
        <Row
          active={item.id === activeId}
          handlers={handlers}
          index={index}
          item={item}
          key={item.id}
          offset={offset}
          onMoveBy={(by) => {
            const target = index + by;
            if (target >= 0 && target < items.length) moveTo(index, target);
          }}
        />
      ))}
    </View>
  );
}

type RowProps = {
  item: RankItem;
  index: number;
  active: boolean;
  offset: Animated.Value;
  handlers: { begin: (id: string) => void; move: (dy: number) => void; end: () => void };
  onMoveBy: (by: number) => void;
};

function Row({ item, index, active, offset, handlers, onMoveBy }: RowProps) {
  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => handlers.begin(item.id),
        onPanResponderMove: (_, gesture) => handlers.move(gesture.dy),
        onPanResponderRelease: () => handlers.end(),
        onPanResponderTerminate: () => handlers.end(),
      }),
    [handlers, item.id],
  );

  return (
    <Animated.View
      accessibilityActions={[
        { name: 'moveUp', label: strings.genres.moveUp },
        { name: 'moveDown', label: strings.genres.moveDown },
      ]}
      accessible
      accessibilityLabel={`${index + 1}. ${item.label}`}
      onAccessibilityAction={(event) => onMoveBy(event.nativeEvent.actionName === 'moveUp' ? -1 : 1)}
      style={[styles.row, active && styles.rowActive, active && { transform: [{ translateY: offset }] }]}>
      <Text style={styles.rank}>{index + 1}</Text>
      <View style={styles.text}>
        <Text numberOfLines={1} style={styles.label}>
          {item.label}
        </Text>
        {item.detail ? <Text style={styles.detail}>{item.detail}</Text> : null}
      </View>
      <View
        {...pan.panHandlers}
        accessibilityLabel={strings.genres.rankHandle(item.label)}
        style={styles.handle}
        testID={`rank-handle-${item.id}`}>
        <View style={styles.handleLine} />
        <View style={styles.handleLine} />
        <View style={styles.handleLine} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingLeft: spacing.md,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  rowActive: { zIndex: 1, borderColor: colors.accent },
  rank: { color: colors.accent, fontSize: fontSize.title, fontWeight: '800', minWidth: 28 },
  text: { flex: 1 },
  label: { color: colors.text, fontSize: fontSize.body, fontWeight: '600' },
  detail: { color: colors.textMuted, fontSize: fontSize.small, marginTop: 2 },
  handle: {
    width: minTouchTarget + 8,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    cursor: 'grab',
    touchAction: 'none',
    userSelect: 'none',
  },
  handleLine: { width: 22, height: 3, borderRadius: 2, backgroundColor: colors.textMuted },
});
