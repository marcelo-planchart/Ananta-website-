import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

import { Text } from '@/components/Text';
import { useTheme } from '@/theme';

/**
 * A ring that expands and contracts on the breath, with the breath count in
 * the middle. One full cycle takes the practitioner's pace — so the animation
 * is a pacer to breathe with, not decoration.
 */
export function BreathRing({
  size = 220,
  pace,
  running,
  tint,
  breath,
  totalBreaths,
}: {
  size?: number;
  /** Seconds per breath. */
  pace: number;
  running: boolean;
  tint: string;
  breath: number;
  totalBreaths: number;
}) {
  const theme = useTheme();
  const scale = useRef(new Animated.Value(0.82)).current;

  useEffect(() => {
    if (!running) {
      scale.stopAnimation();
      return;
    }
    const half = (pace * 1000) / 2;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: half,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.82,
          duration: half,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [running, pace, scale]);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: tint,
          opacity: 0.5,
          transform: [{ scale }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.7,
          borderRadius: size,
          borderWidth: 1,
          borderColor: theme.color.line,
        }}
      />
      <View style={{ alignItems: 'center' }}>
        <Text variant="counter" weight="700" style={{ color: tint }}>
          {breath}
        </Text>
        <Text variant="label" tone="muted" caps>
          of {totalBreaths} breaths
        </Text>
      </View>
    </View>
  );
}
