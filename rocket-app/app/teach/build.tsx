import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, TextInput, View } from 'react-native';

import { Text } from '@/components/Text';
import { Button, Card, Chip, Row, Screen, SectionLabel, Spacer } from '@/components/primitives';
import { allPoses, familyLabels, familyOrder, searchPoses } from '@/data/poses';
import type { PoseFamily, SequenceStep } from '@/data/types';
import { DEFAULT_PACE_SECONDS, formatDuration } from '@/features/practice/resolve';
import { useSettings } from '@/features/settings/store';
import { createCustomSequence } from '@/features/teach/store';
import { useTheme } from '@/theme';

/**
 * The sequence builder. Pick poses, set breaths, reorder — the result is an
 * ordinary `Sequence` that plays in the same engine as the built-in practices.
 */
export default function BuildSequence() {
  const theme = useTheme();
  const router = useRouter();
  const settings = useSettings();

  const [name, setName] = useState('');
  const [steps, setSteps] = useState<SequenceStep[]>([]);
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<PoseFamily | null>(null);

  const candidates = useMemo(() => {
    const byFamily = family ? allPoses.filter((pose) => pose.family === family) : allPoses;
    return searchPoses(query, byFamily).slice(0, 40);
  }, [query, family]);

  // Estimated length, counting both sides of a two-sided pose.
  const estimatedSeconds = useMemo(
    () =>
      steps.reduce((total, step) => {
        const pose = allPoses.find((candidate) => candidate.id === step.poseId);
        if (!pose) return total;
        const breaths = step.breaths ?? pose.breaths;
        const sides = pose.side === 'both' ? 2 : 1;
        return total + breaths * sides * (settings.pace || DEFAULT_PACE_SECONDS);
      }, 0),
    [steps, settings.pace],
  );

  const addPose = (poseId: string) => setSteps((current) => [...current, { poseId, tier: 'core' }]);
  const removeAt = (index: number) => setSteps((current) => current.filter((_, i) => i !== index));
  const move = (index: number, direction: -1 | 1) =>
    setSteps((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      const [moved] = next.splice(index, 1);
      next.splice(target, 0, moved!);
      return next;
    });
  const setBreaths = (index: number, delta: number) =>
    setSteps((current) =>
      current.map((step, i) => {
        if (i !== index) return step;
        const pose = allPoses.find((candidate) => candidate.id === step.poseId);
        const base = step.breaths ?? pose?.breaths ?? 5;
        return { ...step, breaths: Math.max(1, base + delta) };
      }),
    );

  const save = () => {
    if (steps.length === 0) return;
    const sequence = createCustomSequence(name, steps);
    router.replace(`/sequence/${sequence.id}`);
  };

  return (
    <Screen>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name your sequence"
        placeholderTextColor={theme.color.textMuted}
        style={{
          color: theme.color.textPrimary,
          fontSize: theme.type.title.fontSize,
          fontWeight: '700',
          paddingVertical: theme.space.sm,
        }}
      />

      <Row justify="space-between">
        <Text variant="small" tone="muted">
          {steps.length} poses
        </Text>
        <Text variant="small" tone="muted">
          about {formatDuration(estimatedSeconds)}
        </Text>
      </Row>

      <Spacer size={theme.space.lg} />

      {/* ------------------------------------------------------- the flow */}
      <SectionLabel accent={theme.sequenceColor.custom}>Your flow</SectionLabel>
      {steps.length === 0 ? (
        <Card>
          <Text variant="small" tone="secondary">
            Add poses from the library below. Two-sided poses are expanded automatically — add Trikonasana
            once and you get both sides.
          </Text>
        </Card>
      ) : (
        steps.map((step, index) => {
          const pose = allPoses.find((candidate) => candidate.id === step.poseId);
          if (!pose) return null;
          return (
            <View
              key={`${step.poseId}-${index}`}
              style={{
                paddingVertical: theme.space.sm,
                borderBottomWidth: 1,
                borderBottomColor: theme.color.line,
              }}
            >
              <Row gap={theme.space.sm}>
                <Text variant="small" tone="muted" style={{ width: 24 }}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text variant="body" weight="500">
                    {pose.sanskrit}
                  </Text>
                  <Text variant="small" tone="muted">
                    {step.breaths ?? pose.breaths} breaths
                    {pose.side === 'both' ? ' · both sides' : ''}
                  </Text>
                </View>
                <Row gap={2}>
                  <IconButton icon="remove" onPress={() => setBreaths(index, -1)} label="Fewer breaths" />
                  <IconButton icon="add" onPress={() => setBreaths(index, 1)} label="More breaths" />
                  <IconButton icon="arrow-up" onPress={() => move(index, -1)} label="Move up" />
                  <IconButton icon="arrow-down" onPress={() => move(index, 1)} label="Move down" />
                  <IconButton icon="close" onPress={() => removeAt(index)} label="Remove" />
                </Row>
              </Row>
            </View>
          );
        })
      )}

      <Spacer size={theme.space.lg} />
      <Button
        label={steps.length === 0 ? 'Add a pose to save' : 'Save sequence'}
        size="lg"
        tint={theme.sequenceColor.custom}
        disabled={steps.length === 0}
        style={{ opacity: steps.length === 0 ? theme.opacity.disabled : 1 }}
        onPress={save}
      />

      <Spacer size={theme.space.xl} />

      {/* ---------------------------------------------------- pose picker */}
      <SectionLabel>Add poses</SectionLabel>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.space.sm,
          backgroundColor: theme.color.surface,
          borderRadius: theme.radius.pill,
          paddingHorizontal: theme.space.base,
        }}
      >
        <Ionicons name="search" size={18} color={theme.color.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search poses"
          placeholderTextColor={theme.color.textMuted}
          style={{
            flex: 1,
            paddingVertical: theme.space.md,
            color: theme.color.textPrimary,
            fontSize: theme.type.body.fontSize,
          }}
        />
      </View>

      <Spacer size={theme.space.md} />
      <Row gap={theme.space.sm} wrap>
        <Chip label="All" selected={family === null} onPress={() => setFamily(null)} />
        {familyOrder.map((key) => (
          <Chip
            key={key}
            label={familyLabels[key]}
            selected={family === key}
            onPress={() => setFamily(family === key ? null : key)}
          />
        ))}
      </Row>

      <Spacer size={theme.space.md} />
      {candidates.map((pose) => (
        <Pressable
          key={pose.id}
          onPress={() => addPose(pose.id)}
          style={{
            paddingVertical: theme.space.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.color.line,
          }}
        >
          <Row justify="space-between">
            <View style={{ flex: 1 }}>
              <Text variant="body">{pose.sanskrit}</Text>
              <Text variant="small" tone="muted">
                {pose.english}
              </Text>
            </View>
            <Ionicons name="add-circle-outline" size={22} color={theme.color.accent} />
          </Row>
        </Pressable>
      ))}
    </Screen>
  );
}

function IconButton({
  icon,
  onPress,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  label: string;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      accessibilityLabel={label}
      style={{ padding: 6 }}
    >
      <Ionicons name={icon} size={16} color={theme.color.textSecondary} />
    </Pressable>
  );
}
