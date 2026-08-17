import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme, type TypeVariant } from '@/theme';

type Variant = TypeVariant;
type Tone = 'primary' | 'secondary' | 'muted' | 'accent' | 'onAccent' | 'caution';

export interface TextProps extends RNTextProps {
  variant?: Variant;
  tone?: Tone;
  weight?: '400' | '500' | '600' | '700';
  /** Uppercase with wide tracking — for section labels and tags. */
  caps?: boolean;
  center?: boolean;
}

/**
 * The only text primitive in the app. Every size, colour and weight resolves
 * through the theme so an official brand pack changes typography everywhere at
 * once.
 */
export function Text({
  variant = 'body',
  tone = 'primary',
  weight,
  caps,
  center,
  style,
  ...rest
}: TextProps) {
  const theme = useTheme();

  const toneColor: Record<Tone, string> = {
    primary: theme.color.textPrimary,
    secondary: theme.color.textSecondary,
    muted: theme.color.textMuted,
    accent: theme.color.accent,
    onAccent: theme.color.textOnAccent,
    caution: theme.color.caution,
  };

  const isDisplay = variant === 'hero' || variant === 'title' || variant === 'poseName' || variant === 'counter';
  const family = variant === 'counter' ? theme.font.mono : isDisplay ? theme.font.display : theme.font.body;

  return (
    <RNText
      style={[
        theme.type[variant],
        {
          color: toneColor[tone],
          fontFamily: family,
          fontWeight: weight ?? (isDisplay ? '700' : '400'),
        },
        caps && styles.caps,
        center && styles.center,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  caps: { textTransform: 'uppercase' },
  center: { textAlign: 'center' },
});
