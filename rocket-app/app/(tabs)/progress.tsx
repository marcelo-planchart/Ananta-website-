import { View } from 'react-native';

import { Text } from '@/components/Text';
import { Card, Row, Screen, SectionLabel, Spacer } from '@/components/primitives';
import { builtInSequences } from '@/data/sequences';
import { formatDuration } from '@/features/practice/resolve';
import { useSessions, useTotals } from '@/features/progress/store';
import { dayKey, lastSevenDays } from '@/features/progress/streak';
import { useTheme, type SequenceAccentKey } from '@/theme';

const DAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Progress() {
  const theme = useTheme();
  const sessions = useSessions();
  const totals = useTotals();

  const week = lastSevenDays();
  const practisedDays = new Set(totals.daysThisWeek);

  return (
    <Screen>
      <Text variant="title">Progress</Text>
      <Text variant="small" tone="secondary">
        Kept on this device. Nothing is uploaded anywhere.
      </Text>

      <Spacer size={theme.space.lg} />

      <Row gap={theme.space.md}>
        <Stat value={String(totals.currentStreak)} label="Day streak" big />
        <Stat value={String(totals.longestStreak)} label="Longest" />
      </Row>
      <Spacer size={theme.space.md} />
      <Row gap={theme.space.md}>
        <Stat value={String(totals.sessionCount)} label="Practices" />
        <Stat value={formatDuration(totals.totalMinutes * 60)} label="On the mat" />
      </Row>

      <Spacer size={theme.space.xl} />

      {/* --------------------------------------------------------- the week */}
      <SectionLabel>This week</SectionLabel>
      <Row justify="space-between">
        {week.map((day, index) => {
          const done = practisedDays.has(day);
          const isToday = day === dayKey(new Date());
          return (
            <View key={day} style={{ alignItems: 'center', gap: 6 }}>
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: done ? theme.color.accent : theme.color.surface,
                  borderWidth: isToday ? 1 : 0,
                  borderColor: theme.color.textSecondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text variant="small" weight="600" tone={done ? 'onAccent' : 'muted'}>
                  {DAY_INITIALS[new Date(`${day}T00:00:00`).getDay()]}
                </Text>
              </View>
            </View>
          );
        })}
      </Row>

      <Spacer size={theme.space.xl} />

      {/* --------------------------------------------------- per sequence */}
      <SectionLabel>By practice</SectionLabel>
      {builtInSequences.map((sequence) => {
        const count = totals.bySequence[sequence.id] ?? 0;
        const accent = theme.sequenceColor[sequence.accentKey as SequenceAccentKey] ?? theme.color.accent;
        const share = totals.sessionCount > 0 ? count / totals.sessionCount : 0;
        return (
          <View key={sequence.id} style={{ marginBottom: theme.space.md }}>
            <Row justify="space-between">
              <Text variant="body">{sequence.name}</Text>
              <Text variant="small" tone="muted">
                {count}
              </Text>
            </Row>
            <Spacer size={6} />
            <View style={{ height: 6, backgroundColor: theme.color.line, borderRadius: 3 }}>
              <View
                style={{
                  width: `${share * 100}%`,
                  height: '100%',
                  backgroundColor: accent,
                  borderRadius: 3,
                }}
              />
            </View>
          </View>
        );
      })}

      <Spacer size={theme.space.xl} />

      {/* -------------------------------------------------------- history */}
      <SectionLabel>History</SectionLabel>
      {sessions.length === 0 ? (
        <Card>
          <Text variant="body" tone="secondary">
            No practices logged yet. The first one shows up here the moment you finish savasana.
          </Text>
        </Card>
      ) : (
        sessions.slice(0, 30).map((session) => (
          <View
            key={session.id}
            style={{
              paddingVertical: theme.space.md,
              borderBottomWidth: 1,
              borderBottomColor: theme.color.line,
            }}
          >
            <Row justify="space-between">
              <View>
                <Text variant="body" weight="500">
                  {session.sequenceName}
                </Text>
                <Text variant="small" tone="muted">
                  {new Date(session.startedAt).toLocaleDateString()} · {session.lengthKey}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text variant="body">{formatDuration(session.durationSeconds)}</Text>
                <Text variant="label" tone="muted">
                  {session.stepsCompleted} poses
                </Text>
              </View>
            </Row>
          </View>
        ))
      )}
    </Screen>
  );
}

function Stat({ value, label, big }: { value: string; label: string; big?: boolean }) {
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
      <Text variant={big ? 'hero' : 'title'} weight="700">
        {value}
      </Text>
      <Text variant="label" tone="muted" caps>
        {label}
      </Text>
    </View>
  );
}
