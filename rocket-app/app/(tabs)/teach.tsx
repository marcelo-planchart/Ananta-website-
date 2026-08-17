import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Platform, Pressable, View } from 'react-native';

import { Text } from '@/components/Text';
import { Button, Card, Row, Screen, SectionLabel, Spacer } from '@/components/primitives';
import { estimateMinutes } from '@/features/practice/resolve';
import { useSettings } from '@/features/settings/store';
import { deleteCustomSequence, useCustomSequences } from '@/features/teach/store';
import { useTheme } from '@/theme';

/**
 * PHASE 3 — TEACHER TOOLS
 *
 * Building a class and practising it are the same code path: a sequence you
 * build here is a first-class `Sequence` and plays in the same engine, with
 * the same duration scaling, as Rocket 1, 2 and 3.
 */
export default function Teach() {
  const theme = useTheme();
  const router = useRouter();
  const settings = useSettings();
  const sequences = useCustomSequences();

  const confirmDelete = (id: string, name: string) => {
    if (Platform.OS === 'web') {
      deleteCustomSequence(id);
      return;
    }
    Alert.alert('Delete sequence', `Delete “${name}”? This cannot be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteCustomSequence(id) },
    ]);
  };

  return (
    <Screen>
      <Text variant="title">Teach</Text>
      <Text variant="small" tone="secondary">
        Build a sequence, then practise it or teach from it.
      </Text>

      <Spacer size={theme.space.lg} />
      <Button label="Build a sequence" size="lg" onPress={() => router.push('/teach/build')} />

      <Spacer size={theme.space.xl} />

      <SectionLabel accent={theme.sequenceColor.custom}>Your sequences</SectionLabel>
      {sequences.length === 0 ? (
        <Card>
          <Text variant="body" tone="secondary">
            Nothing built yet. Start from the full pose library, set the breath count for each pose, and the
            player handles the rest — sides, rounds and timing.
          </Text>
        </Card>
      ) : (
        sequences.map((sequence) => (
          <View key={sequence.id} style={{ marginBottom: theme.space.md }}>
            <Card accent={theme.sequenceColor.custom}>
              <Row justify="space-between">
                <Pressable style={{ flex: 1 }} onPress={() => router.push(`/sequence/${sequence.id}`)}>
                  <Text variant="subheading" weight="600">
                    {sequence.name}
                  </Text>
                  <Text variant="small" tone="muted">
                    {sequence.steps.length} poses ·{' '}
                    {estimateMinutes(sequence, 'complete', settings.pace)} min
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => confirmDelete(sequence.id, sequence.name)}
                  hitSlop={12}
                  accessibilityLabel={`Delete ${sequence.name}`}
                >
                  <Ionicons name="trash-outline" size={20} color={theme.color.textMuted} />
                </Pressable>
              </Row>
            </Card>
          </View>
        ))
      )}

      <Spacer size={theme.space.xl} />

      <SectionLabel>What this becomes</SectionLabel>
      <Card>
        {[
          'Share a sequence with your students, so they practise what you taught.',
          'Save and reuse class plans, with notes on what to watch for.',
          'A record of what you have taught and when.',
          'Sequences built on the official material, once it is confirmed.',
        ].map((line) => (
          <Row key={line} gap={theme.space.sm} align="flex-start" style={{ marginBottom: theme.space.sm }}>
            <Ionicons name="ellipse-outline" size={10} color={theme.color.textMuted} style={{ marginTop: 6 }} />
            <Text variant="small" tone="secondary" style={{ flex: 1 }}>
              {line}
            </Text>
          </Row>
        ))}
        <Text variant="small" tone="muted" style={{ marginTop: theme.space.sm }}>
          Sharing needs accounts behind it, which is the next piece of work in this phase.
        </Text>
      </Card>
    </Screen>
  );
}
