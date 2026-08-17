import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { Text } from '@/components/Text';
import { Button, Row, Screen, Spacer } from '@/components/primitives';
import { getBuiltInSequence } from '@/data/sequences';
import { useTotals } from '@/features/progress/store';
import { getCustomSequence } from '@/features/teach/store';
import { useTheme, type SequenceAccentKey } from '@/theme';

/** Shown once, immediately after savasana. Short, then out of the way. */
export default function Summary() {
  const theme = useTheme();
  const router = useRouter();
  const { sequenceId, minutes, poses, skipped } = useLocalSearchParams<{
    sequenceId: string;
    minutes: string;
    poses: string;
    skipped: string;
  }>();

  const totals = useTotals();
  const sequence = getBuiltInSequence(sequenceId) ?? getCustomSequence(sequenceId);
  const accent = sequence
    ? theme.sequenceColor[sequence.accentKey as SequenceAccentKey] ?? theme.color.accent
    : theme.color.accent;

  const skippedCount = Number(skipped ?? 0);

  return (
    <Screen background={theme.color.void} contentStyle={{ justifyContent: 'center', flexGrow: 1 }}>
      <Text variant="label" tone="muted" caps weight="600">
        Practice complete
      </Text>
      <Text variant="hero" style={{ color: accent, marginTop: 4 }}>
        {sequence?.name ?? 'Practice'}
      </Text>

      <Spacer size={theme.space.xl} />

      <Row gap={theme.space.md}>
        <Metric value={minutes ?? '0'} unit="minutes" />
        <Metric value={poses ?? '0'} unit="poses" />
        <Metric value={String(totals.currentStreak)} unit="day streak" />
      </Row>

      <Spacer size={theme.space.xl} />

      <Text variant="body" tone="secondary">
        {skippedCount === 0
          ? 'You held every pose you were given. Rest well.'
          : `You moved on early from ${skippedCount} ${skippedCount === 1 ? 'pose' : 'poses'} — which is the practice working as intended. The sequence is a map, not a test.`}
      </Text>

      <Spacer size={theme.space.xl} />

      <Button label="Done" size="lg" tint={accent} onPress={() => router.replace('/')} />
      <Spacer size={theme.space.sm} />
      <Button
        label="See your progress"
        variant="ghost"
        onPress={() => router.replace('/progress')}
      />
    </Screen>
  );
}

function Metric({ value, unit }: { value: string; unit: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color.surface,
        borderRadius: theme.radius.md,
        padding: theme.space.base,
      }}
    >
      <Text variant="title" weight="700">
        {value}
      </Text>
      <Text variant="label" tone="muted" caps>
        {unit}
      </Text>
    </View>
  );
}
