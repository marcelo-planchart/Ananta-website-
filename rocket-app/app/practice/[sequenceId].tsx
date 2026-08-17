import { useEffect, useMemo, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/Text';
import { Button, ProgressBar, Row, Spacer } from '@/components/primitives';
import { getBuiltInSequence } from '@/data/sequences';
import { BreathRing } from '@/features/practice/BreathRing';
import { formatClock, resolveByLength, type PracticeLength } from '@/features/practice/resolve';
import { usePracticeEngine } from '@/features/practice/usePracticeEngine';
import { logSession } from '@/features/progress/store';
import { useSettings } from '@/features/settings/store';
import { getCustomSequence } from '@/features/teach/store';
import { useTheme, type SequenceAccentKey } from '@/theme';

/**
 * The player. Full bleed, high contrast, controls big enough to hit with a
 * sweaty hand from downward dog. Everything secondary is one tap away and
 * nothing on this screen requires reading a paragraph.
 */
export default function PracticePlayer() {
  const theme = useTheme();
  const router = useRouter();
  const settings = useSettings();
  const { sequenceId, length } = useLocalSearchParams<{ sequenceId: string; length?: string }>();

  const sequence = getBuiltInSequence(sequenceId) ?? getCustomSequence(sequenceId);
  const lengthKey = (length ?? 'full') as PracticeLength['key'];

  // Resolved once per practice: changing pace mid-flow would move the goalposts.
  const practice = useMemo(
    () =>
      sequence ? resolveByLength(sequence, lengthKey, settings.pace, settings.maxRestBreaths) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sequence?.id, lengthKey],
  );

  if (!sequence || !practice) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.void, padding: theme.space.lg }}>
        <Text variant="heading">Practice not found</Text>
        <Spacer />
        <Button label="Back" variant="ghost" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  // Remount on a different practice so the engine starts from a clean state.
  return <Player key={`${sequence.id}-${lengthKey}`} practice={practice} />;
}

function Player({ practice }: { practice: ReturnType<typeof resolveByLength> }) {
  const theme = useTheme();
  const router = useRouter();
  const settings = useSettings();
  const engine = usePracticeEngine(practice);
  const [showDetail, setShowDetail] = useState(false);
  const [showFlow, setShowFlow] = useState(false);
  /** Guards against double-logging if the effect re-runs. */
  const loggedRef = useRef(false);

  const accent =
    theme.sequenceColor[practice.sequence.accentKey as SequenceAccentKey] ?? theme.color.accent;
  const current = engine.current;

  // ------------------------------------------------ log and leave when done
  useEffect(() => {
    if (!engine.isComplete || loggedRef.current) return;
    loggedRef.current = true;

    const completed = engine.state.index + 1;
    void logSession({
      sequenceId: practice.sequence.id,
      sequenceName: practice.sequence.name,
      lengthKey: practice.tiers.length === 1 ? 'short' : practice.tiers.length === 2 ? 'full' : 'complete',
      startedAt: engine.startedAt,
      durationSeconds: Math.round(engine.elapsedTotal),
      stepsCompleted: completed,
      stepsTotal: practice.steps.length,
      skippedCount: engine.state.skipped.length,
      finished: true,
    }).then(() => {
      router.replace(
        `/summary?sequenceId=${practice.sequence.id}&minutes=${Math.round(engine.elapsedTotal / 60)}` +
          `&poses=${completed}&skipped=${engine.state.skipped.length}`,
      );
    });
  }, [engine.isComplete, engine.state.index, engine.state.skipped.length, engine.elapsedTotal, engine.startedAt, practice, router]);

  if (!current) return null;

  const remainingTotal = practice.totalSeconds - engine.progress * practice.totalSeconds;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.void }} edges={['top', 'bottom']}>
      {/* ------------------------------------------------------------- top */}
      <View style={{ paddingHorizontal: theme.space.lg, paddingTop: theme.space.sm }}>
        <Row justify="space-between">
          <Pressable onPress={() => setShowFlow(true)} hitSlop={12} accessibilityLabel="Show the whole flow">
            <Row gap={6}>
              <Ionicons name="list-outline" size={18} color={theme.color.textSecondary} />
              <Text variant="small" tone="secondary">
                {engine.state.index + 1} / {practice.steps.length}
              </Text>
            </Row>
          </Pressable>

          <Text variant="label" tone="muted" caps weight="600">
            {practice.sequence.name}
          </Text>

          <Pressable onPress={() => router.back()} hitSlop={12} accessibilityLabel="Leave the practice">
            <Ionicons name="close" size={22} color={theme.color.textSecondary} />
          </Pressable>
        </Row>

        <Spacer size={theme.space.md} />
        <ProgressBar value={engine.progress} tint={accent} />
        <Spacer size={theme.space.xs} />
        <Row justify="space-between">
          <Text variant="label" tone="muted">
            {formatClock(engine.elapsedTotal)} elapsed
          </Text>
          <Text variant="label" tone="muted">
            {formatClock(remainingTotal)} left
          </Text>
        </Row>
      </View>

      {/* ---------------------------------------------------------- centre */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.space.lg }}>
        {(current.side || current.round) && (
          <Row gap={theme.space.sm}>
            {current.side ? (
              <Badge label={`${current.side} side`} tint={accent} />
            ) : null}
            {current.round ? (
              <Badge label={`round ${current.round} of ${current.totalRounds}`} tint={accent} />
            ) : null}
          </Row>
        )}

        <Spacer size={theme.space.md} />
        <Text variant="poseName" center style={{ color: theme.color.textPrimary }}>
          {current.pose.sanskrit}
        </Text>
        <Text variant="subheading" tone="secondary" center style={{ marginTop: 4 }}>
          {current.pose.english}
        </Text>

        <Spacer size={theme.space.lg} />
        <BreathRing
          pace={practice.pace}
          running={engine.isRunning}
          tint={accent}
          breath={engine.breath}
          totalBreaths={current.breaths}
        />

        <Spacer size={theme.space.md} />
        <Text variant="body" tone="secondary" center>
          {current.pose.cues[0]}
        </Text>

        {current.note ? (
          <>
            <Spacer size={theme.space.sm} />
            <Text variant="small" tone="muted" center style={{ fontStyle: 'italic' }}>
              {current.note}
            </Text>
          </>
        ) : null}

        {settings.showSafetyNotes && current.pose.safety ? (
          <>
            <Spacer size={theme.space.sm} />
            <Row gap={6} align="flex-start" style={{ maxWidth: 320 }}>
              <Ionicons name="alert-circle-outline" size={16} color={theme.color.caution} />
              <Text variant="small" tone="caution" style={{ flex: 1 }}>
                {current.pose.safety}
              </Text>
            </Row>
          </>
        ) : null}
      </View>

      {/* ------------------------------------------------------ next & keys */}
      <View style={{ paddingHorizontal: theme.space.lg }}>
        {engine.upcoming ? (
          <Text variant="small" tone="muted" center>
            Next · {engine.upcoming.pose.sanskrit}
            {engine.upcoming.side ? `, ${engine.upcoming.side}` : ''}
          </Text>
        ) : (
          <Text variant="small" tone="muted" center>
            Last pose
          </Text>
        )}

        <Spacer size={theme.space.md} />

        <Row justify="space-between" style={{ paddingHorizontal: theme.space.md }}>
          <ControlButton icon="play-back" label="Back" onPress={engine.controls.back} />
          <ControlButton
            icon="add-circle-outline"
            label="Stay"
            onPress={() => engine.controls.extend(practice.pace * 3)}
          />
          <Pressable
            onPress={engine.controls.toggle}
            style={{
              width: 76,
              height: 76,
              borderRadius: 38,
              backgroundColor: accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={engine.isRunning ? 'Pause' : 'Resume'}
          >
            <Ionicons
              name={engine.isRunning ? 'pause' : 'play'}
              size={32}
              color={theme.color.textOnAccent}
            />
          </Pressable>
          <ControlButton icon="options-outline" label="Modify" onPress={() => setShowDetail(true)} />
          <ControlButton icon="play-forward" label="Next" onPress={engine.controls.next} />
        </Row>
        <Spacer size={theme.space.md} />
      </View>

      {/* ------------------------------------------------ modifications sheet */}
      <Modal visible={showDetail} animationType="slide" transparent onRequestClose={() => setShowDetail(false)}>
        <Pressable style={{ flex: 1, backgroundColor: '#000A' }} onPress={() => setShowDetail(false)} />
        <View
          style={{
            backgroundColor: theme.color.base,
            borderTopLeftRadius: theme.radius.lg,
            borderTopRightRadius: theme.radius.lg,
            padding: theme.space.lg,
            maxHeight: '70%',
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text variant="heading">{current.pose.sanskrit}</Text>
            <Text variant="small" tone="muted">
              {current.pose.english}
            </Text>

            <Spacer size={theme.space.lg} />
            <Text variant="label" tone="muted" caps weight="600">
              Cues
            </Text>
            <Spacer size={theme.space.sm} />
            {current.pose.cues.map((cue) => (
              <Text key={cue} variant="body" tone="secondary" style={{ marginBottom: 6 }}>
                · {cue}
              </Text>
            ))}

            <Spacer size={theme.space.lg} />
            <Text variant="label" tone="accent" caps weight="600">
              Modifications
            </Text>
            <Spacer size={theme.space.sm} />
            {current.pose.modifications.map((modification) => (
              <Text key={modification} variant="body" style={{ marginBottom: 6 }}>
                · {modification}
              </Text>
            ))}

            {current.pose.drishti ? (
              <>
                <Spacer size={theme.space.lg} />
                <Text variant="label" tone="muted" caps weight="600">
                  Drishti
                </Text>
                <Text variant="body" tone="secondary">
                  {current.pose.drishti}
                </Text>
              </>
            ) : null}

            <Spacer size={theme.space.lg} />
            <Button label="Back to practice" variant="secondary" onPress={() => setShowDetail(false)} />
          </ScrollView>
        </View>
      </Modal>

      {/* --------------------------------------------------------- flow sheet */}
      <Modal visible={showFlow} animationType="slide" transparent onRequestClose={() => setShowFlow(false)}>
        <Pressable style={{ flex: 1, backgroundColor: '#000A' }} onPress={() => setShowFlow(false)} />
        <View
          style={{
            backgroundColor: theme.color.base,
            borderTopLeftRadius: theme.radius.lg,
            borderTopRightRadius: theme.radius.lg,
            padding: theme.space.lg,
            maxHeight: '70%',
          }}
        >
          <Text variant="heading">Jump to a pose</Text>
          <Spacer size={theme.space.md} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {practice.steps.map((step, index) => {
              const isCurrent = index === engine.state.index;
              return (
                <Pressable
                  key={step.key}
                  onPress={() => {
                    engine.controls.jump(index);
                    setShowFlow(false);
                  }}
                  style={{ paddingVertical: theme.space.sm }}
                >
                  <Row gap={theme.space.md}>
                    <Text variant="small" tone={isCurrent ? 'accent' : 'muted'} style={{ width: 28 }}>
                      {String(index + 1).padStart(2, '0')}
                    </Text>
                    <Text
                      variant="body"
                      weight={isCurrent ? '600' : '400'}
                      tone={index < engine.state.index ? 'muted' : 'primary'}
                      style={{ flex: 1 }}
                    >
                      {step.pose.sanskrit}
                      {step.side ? ` · ${step.side}` : ''}
                    </Text>
                    {isCurrent ? <Ionicons name="ellipse" size={10} color={accent} /> : null}
                  </Row>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function ControlButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={{ alignItems: 'center', width: 56 }}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name={icon} size={24} color={theme.color.textSecondary} />
      <Text variant="label" tone="muted" style={{ marginTop: 4 }}>
        {label}
      </Text>
    </Pressable>
  );
}

function Badge({ label, tint }: { label: string; tint: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        borderColor: tint,
        borderWidth: 1,
        borderRadius: theme.radius.pill,
        paddingHorizontal: theme.space.md,
        paddingVertical: 4,
      }}
    >
      <Text variant="label" caps weight="600" style={{ color: tint }}>
        {label}
      </Text>
    </View>
  );
}
