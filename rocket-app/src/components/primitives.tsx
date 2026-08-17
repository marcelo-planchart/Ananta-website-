import type { ReactNode } from 'react';
import {
  Pressable,
  type PressableProps,
  ScrollView,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { Text } from './Text';
import { useTheme } from '@/theme';
import { tapFeedback } from '@/lib/feedback';

/** Standard screen frame: safe area, background, optional scrolling. */
export function Screen({
  children,
  scroll = true,
  background,
  edges = ['top'],
  contentStyle,
}: {
  children: ReactNode;
  scroll?: boolean;
  background?: string;
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[{ padding: theme.space.lg, paddingBottom: theme.space.huge }, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1, padding: theme.space.lg }, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background ?? theme.color.base }} edges={edges}>
      {body}
    </SafeAreaView>
  );
}

/** Small uppercase heading with a hairline, used to open each block. */
export function SectionLabel({ children, accent }: { children: ReactNode; accent?: string }) {
  const theme = useTheme();
  return (
    <View style={[styles.sectionLabel, { marginBottom: theme.space.md }]}>
      <View style={{ width: 18, height: 2, backgroundColor: accent ?? theme.color.accent }} />
      <Text variant="label" tone="secondary" caps weight="600">
        {children}
      </Text>
    </View>
  );
}

export function Card({
  children,
  onPress,
  style,
  accent,
}: {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /** Draws a colour bar down the leading edge. */
  accent?: string;
}) {
  const theme = useTheme();
  const content = (
    <View
      style={[
        {
          backgroundColor: theme.color.surface,
          borderRadius: theme.radius.md,
          padding: theme.space.base,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.color.line,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {accent ? <View style={[styles.accentBar, { backgroundColor: accent }]} /> : null}
      {children}
    </View>
  );

  if (!onPress) return content;
  return (
    <Pressable
      onPress={() => {
        tapFeedback();
        onPress();
      }}
      style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
    >
      {content}
    </Pressable>
  );
}

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  tint?: string;
  size?: 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}

export function Button({ label, variant = 'primary', tint, size = 'md', style, onPress, ...rest }: ButtonProps) {
  const theme = useTheme();
  const accent = tint ?? theme.color.accent;

  const background =
    variant === 'primary' ? accent : variant === 'secondary' ? theme.color.surfaceHigh : 'transparent';
  const borderColor = variant === 'ghost' ? theme.color.line : 'transparent';

  return (
    <Pressable
      onPress={(event) => {
        tapFeedback();
        onPress?.(event);
      }}
      style={({ pressed }) => [
        {
          backgroundColor: background,
          borderColor,
          borderWidth: variant === 'ghost' ? StyleSheet.hairlineWidth : 0,
          borderRadius: theme.radius.pill,
          paddingVertical: size === 'lg' ? theme.space.base : theme.space.md,
          paddingHorizontal: theme.space.lg,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
      accessibilityRole="button"
      {...rest}
    >
      <Text
        variant={size === 'lg' ? 'subheading' : 'body'}
        weight="600"
        tone={variant === 'primary' ? 'onAccent' : 'primary'}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function Chip({
  label,
  selected,
  onPress,
  tint,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  tint?: string;
}) {
  const theme = useTheme();
  const accent = tint ?? theme.color.accent;
  return (
    <Pressable
      onPress={() => {
        tapFeedback();
        onPress?.();
      }}
      style={({ pressed }) => ({
        backgroundColor: selected ? accent : theme.color.surface,
        borderColor: selected ? accent : theme.color.line,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: theme.radius.pill,
        paddingVertical: theme.space.sm,
        paddingHorizontal: theme.space.base,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text variant="small" weight="500" tone={selected ? 'onAccent' : 'secondary'}>
        {label}
      </Text>
    </Pressable>
  );
}

/** Horizontal fill bar, 0..1. */
export function ProgressBar({ value, tint, height = 4 }: { value: number; tint?: string; height?: number }) {
  const theme = useTheme();
  const clamped = Math.min(1, Math.max(0, value));
  return (
    <View
      style={{
        height,
        backgroundColor: theme.color.line,
        borderRadius: height,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          backgroundColor: tint ?? theme.color.accent,
        }}
      />
    </View>
  );
}

/** Vertical rhythm helper. */
export function Spacer({ size = 16 }: { size?: number }) {
  return <View style={{ height: size }} />;
}

export function Row({
  children,
  gap = 8,
  align = 'center',
  justify = 'flex-start',
  wrap,
  style,
}: {
  children: ReactNode;
  gap?: number;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: align,
          justifyContent: justify,
          gap,
          flexWrap: wrap ? 'wrap' : 'nowrap',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

/**
 * The banner shown wherever draft sequence data is presented. The app should
 * never imply the style owner has signed off on content they have not seen.
 */
export function ReviewNotice({ compact }: { compact?: boolean }) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.color.surface,
        borderLeftWidth: 3,
        borderLeftColor: theme.color.caution,
        borderRadius: theme.radius.sm,
        padding: theme.space.md,
      }}
    >
      <Text variant="label" tone="caution" caps weight="600">
        Draft sequence
      </Text>
      {!compact && (
        <Text variant="small" tone="secondary" style={{ marginTop: 4 }}>
          Assembled from published descriptions of the system and not yet reviewed by the style owner. Poses,
          order and counts may be wrong.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  accentBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3 },
});
