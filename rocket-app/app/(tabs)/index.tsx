import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/Text';
import { Card, Row, Screen, SectionLabel, Spacer } from '@/components/primitives';
import { builtInSequences, sequenceForDay } from '@/data/sequences';
import type { Sequence } from '@/data/types';
import { estimateMinutes } from '@/features/practice/resolve';
import { useTotals } from '@/features/progress/store';
import { useSettings } from '@/features/settings/store';
import { useCustomSequences } from '@/features/teach/store';
import { useTheme, type SequenceAccentKey } from '@/theme';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function PracticeHome() {
  const theme = useTheme();
  const router = useRouter();
  const settings = useSettings();
  const totals = useTotals();
  const custom = useCustomSequences();

  const today = new Date();
  const suggested = sequenceForDay(today.getDay());

  const accentFor = (sequence: Sequence) =>
    theme.sequenceColor[sequence.accentKey as SequenceAccentKey] ?? theme.color.accent;

  return (
    <Screen>
      <Row justify="space-between" align="flex-start">
        <View style={{ flex: 1 }}>
          <Text variant="label" tone="muted" caps weight="600">
            {DAY_NAMES[today.getDay()]}
          </Text>
          <Text variant="title" style={{ marginTop: 4 }}>
            {greeting(today)}
          </Text>
        </View>
        <Pressable
          onPress={() => router.push('/settings')}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Settings"
          style={{ paddingTop: 8 }}
        >
          <Ionicons name="options-outline" size={24} color={theme.color.textSecondary} />
        </Pressable>
      </Row>

      <Spacer size={theme.space.lg} />

      {/* ------------------------------------------------ today's practice */}
      <SectionLabel accent={accentFor(suggested)}>Today, traditionally</SectionLabel>
      <Card accent={accentFor(suggested)} onPress={() => router.push(`/sequence/${suggested.id}`)}>
        <Row justify="space-between" align="flex-start">
          <View style={{ flex: 1, paddingRight: theme.space.md }}>
            <Text variant="heading">{suggested.name}</Text>
            <Text variant="small" tone="secondary" style={{ marginTop: 2 }}>
              {suggested.subtitle}
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={22} color={accentFor(suggested)} />
        </Row>
        <Spacer size={theme.space.md} />
        <Text variant="small" tone="muted">
          {suggested.description}
        </Text>
        <Spacer size={theme.space.md} />
        <Row gap={theme.space.md}>
          {(['short', 'full', 'complete'] as const).map((key) => (
            <View key={key}>
              <Text variant="label" tone="muted" caps>
                {key}
              </Text>
              <Text variant="small" weight="600">
                {estimateMinutes(suggested, key, settings.pace)} min
              </Text>
            </View>
          ))}
        </Row>
      </Card>

      <Spacer size={theme.space.xl} />

      {/* --------------------------------------------------- all practices */}
      <SectionLabel>The three practices</SectionLabel>
      {builtInSequences.map((sequence) => (
        <View key={sequence.id} style={{ marginBottom: theme.space.md }}>
          <Card accent={accentFor(sequence)} onPress={() => router.push(`/sequence/${sequence.id}`)}>
            <Row justify="space-between">
              <View style={{ flex: 1, paddingRight: theme.space.md }}>
                <Text variant="subheading" weight="600">
                  {sequence.name}
                </Text>
                <Text variant="small" tone="secondary">
                  {sequence.subtitle}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text variant="small" tone="muted">
                  {estimateMinutes(sequence, 'full', settings.pace)} min
                </Text>
                <Text variant="label" tone="muted" caps>
                  {sequence.steps.length} poses
                </Text>
              </View>
            </Row>
          </Card>
        </View>
      ))}

      {/* ------------------------------------------------ custom sequences */}
      {custom.length > 0 && (
        <>
          <Spacer size={theme.space.lg} />
          <SectionLabel accent={theme.sequenceColor.custom}>Your sequences</SectionLabel>
          {custom.map((sequence) => (
            <View key={sequence.id} style={{ marginBottom: theme.space.md }}>
              <Card
                accent={theme.sequenceColor.custom}
                onPress={() => router.push(`/sequence/${sequence.id}`)}
              >
                <Row justify="space-between">
                  <Text variant="subheading" weight="600">
                    {sequence.name}
                  </Text>
                  <Text variant="small" tone="muted">
                    {sequence.steps.length} poses
                  </Text>
                </Row>
              </Card>
            </View>
          ))}
        </>
      )}

      <Spacer size={theme.space.xl} />

      {/* ------------------------------------------------------- your week */}
      <SectionLabel>Where you are</SectionLabel>
      <Row gap={theme.space.md}>
        <Stat label="Day streak" value={String(totals.currentStreak)} />
        <Stat label="Practices" value={String(totals.sessionCount)} />
        <Stat label="Minutes" value={String(totals.totalMinutes)} />
      </Row>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
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
        {label}
      </Text>
    </View>
  );
}

function greeting(date: Date): string {
  const hour = date.getHours();
  if (hour < 11) return 'Get on the mat.';
  if (hour < 17) return 'Time to practise.';
  return 'Evening practice.';
}
