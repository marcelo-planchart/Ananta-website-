import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/Text';
import { Button, Card, Row, Screen, SectionLabel, Spacer, ReviewNotice } from '@/components/primitives';
import { getBuiltInSequence } from '@/data/sequences';
import { PRACTICE_LENGTHS, estimateMinutes, resolveByLength, type PracticeLength } from '@/features/practice/resolve';
import { useSettings } from '@/features/settings/store';
import { getCustomSequence, useCustomSequences } from '@/features/teach/store';
import { useTheme, type SequenceAccentKey } from '@/theme';

/**
 * What you see before you start: the whole practice laid out, with the choice
 * of how long you have. Seeing the shape of the class beforehand is how you
 * decide where you are going to modify.
 */
export default function SequenceDetail() {
  const theme = useTheme();
  const router = useRouter();
  const { sequenceId } = useLocalSearchParams<{ sequenceId: string }>();
  const settings = useSettings();
  // Subscribing keeps this screen live if a custom sequence is edited.
  useCustomSequences();

  const sequence = getBuiltInSequence(sequenceId) ?? getCustomSequence(sequenceId);
  const [lengthKey, setLengthKey] = useState<PracticeLength['key']>('full');

  const preview = useMemo(
    () => (sequence ? resolveByLength(sequence, lengthKey, settings.pace, settings.maxRestBreaths) : null),
    [sequence, lengthKey, settings.pace, settings.maxRestBreaths],
  );

  if (!sequence || !preview) {
    return (
      <Screen>
        <Text variant="heading">Sequence not found</Text>
        <Spacer />
        <Button label="Back" variant="ghost" onPress={() => router.back()} />
      </Screen>
    );
  }

  const accent = theme.sequenceColor[sequence.accentKey as SequenceAccentKey] ?? theme.color.accent;

  return (
    <Screen>
      <Text variant="label" tone="muted" caps weight="600">
        {sequence.subtitle}
      </Text>
      <Text variant="hero" style={{ marginTop: 4, color: accent }}>
        {sequence.name}
      </Text>
      <Spacer size={theme.space.md} />
      <Text variant="body" tone="secondary">
        {sequence.description}
      </Text>

      {sequence.reviewStatus === 'draft-pending-owner-review' && (
        <>
          <Spacer size={theme.space.lg} />
          <ReviewNotice />
        </>
      )}

      <Spacer size={theme.space.xl} />

      {/* ------------------------------------------------ how long you have */}
      <SectionLabel accent={accent}>How long do you have</SectionLabel>
      <Row gap={theme.space.sm}>
        {PRACTICE_LENGTHS.map((length) => {
          const selected = length.key === lengthKey;
          return (
            <Pressable
              key={length.key}
              onPress={() => setLengthKey(length.key)}
              style={{
                flex: 1,
                backgroundColor: selected ? accent : theme.color.surface,
                borderRadius: theme.radius.md,
                padding: theme.space.md,
                alignItems: 'center',
              }}
            >
              <Text variant="label" caps weight="600" tone={selected ? 'onAccent' : 'muted'}>
                {length.label}
              </Text>
              <Text variant="subheading" weight="700" tone={selected ? 'onAccent' : 'primary'}>
                {estimateMinutes(sequence, length.key, settings.pace)}
              </Text>
              <Text variant="label" tone={selected ? 'onAccent' : 'muted'}>
                min
              </Text>
            </Pressable>
          );
        })}
      </Row>
      <Spacer size={theme.space.sm} />
      <Text variant="small" tone="muted">
        {PRACTICE_LENGTHS.find((length) => length.key === lengthKey)?.description} Shortening only ever removes
        poses — the order never changes.
      </Text>

      <Spacer size={theme.space.lg} />
      <Button
        label={`Start · ${preview.steps.length} poses`}
        size="lg"
        tint={accent}
        onPress={() => router.push(`/practice/${sequence.id}?length=${lengthKey}`)}
      />

      <Spacer size={theme.space.xl} />

      {/* -------------------------------------------------------- the flow */}
      <SectionLabel accent={accent}>The flow</SectionLabel>
      {preview.steps.map((step, index) => (
        <Pressable
          key={step.key}
          onPress={() => router.push(`/pose/${step.pose.id}`)}
          style={{ paddingVertical: theme.space.sm }}
        >
          <Row gap={theme.space.md} align="flex-start">
            <Text variant="small" tone="muted" style={{ width: 28 }}>
              {String(index + 1).padStart(2, '0')}
            </Text>
            <View style={{ flex: 1 }}>
              <Text variant="body" weight="500">
                {step.pose.sanskrit}
                {step.side ? <Text tone="muted">{`  ${step.side}`}</Text> : null}
                {step.round ? <Text tone="muted">{`  ${step.round}/${step.totalRounds}`}</Text> : null}
              </Text>
              <Text variant="small" tone="muted">
                {step.pose.english} · {step.breaths} breaths
              </Text>
              {step.note ? (
                <Text variant="small" tone="secondary" style={{ marginTop: 2, fontStyle: 'italic' }}>
                  {step.note}
                </Text>
              ) : null}
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.color.textMuted} />
          </Row>
        </Pressable>
      ))}

      <Spacer size={theme.space.lg} />
      <Card>
        <Text variant="small" tone="secondary">
          Every pose in this list has modifications. Tap any of them to see the options before you start —
          choosing the variation that fits your body today is the practice, not a compromise on it.
        </Text>
      </Card>
    </Screen>
  );
}
