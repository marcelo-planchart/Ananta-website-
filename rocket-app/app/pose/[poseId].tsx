import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

import { Text } from '@/components/Text';
import { Button, Card, Row, Screen, SectionLabel, Spacer } from '@/components/primitives';
import { familyLabels, getPose } from '@/data/poses';
import { builtInSequences } from '@/data/sequences';
import { useTheme } from '@/theme';

/** Everything about one pose: how it is taught, and how to make it yours. */
export default function PoseDetail() {
  const theme = useTheme();
  const router = useRouter();
  const { poseId } = useLocalSearchParams<{ poseId: string }>();
  const pose = getPose(poseId);

  if (!pose) {
    return (
      <Screen>
        <Text variant="heading">Pose not found</Text>
        <Spacer />
        <Button label="Back" variant="ghost" onPress={() => router.back()} />
      </Screen>
    );
  }

  const appearsIn = builtInSequences.filter((sequence) =>
    sequence.steps.some((step) => step.poseId === pose.id),
  );

  return (
    <Screen>
      <Text variant="label" tone="muted" caps weight="600">
        {familyLabels[pose.family]}
      </Text>
      <Text variant="title" style={{ marginTop: 4 }}>
        {pose.sanskrit}
      </Text>
      <Text variant="subheading" tone="secondary">
        {pose.english}
      </Text>

      <Spacer size={theme.space.lg} />
      <Row gap={theme.space.md}>
        <Fact label="Breaths" value={String(pose.breaths)} />
        <Fact label="Sides" value={pose.side === 'both' ? 'Both' : 'One'} />
        <Fact label="Level" value={'●'.repeat(pose.difficulty) + '○'.repeat(5 - pose.difficulty)} />
      </Row>

      {pose.safety ? (
        <>
          <Spacer size={theme.space.lg} />
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
              Take care
            </Text>
            <Text variant="small" tone="secondary" style={{ marginTop: 4 }}>
              {pose.safety}
            </Text>
          </View>
        </>
      ) : null}

      <Spacer size={theme.space.xl} />
      <SectionLabel>Cues</SectionLabel>
      {pose.cues.map((cue) => (
        <Text key={cue} variant="body" tone="secondary" style={{ marginBottom: theme.space.sm }}>
          · {cue}
        </Text>
      ))}

      <Spacer size={theme.space.lg} />
      <SectionLabel>Modifications</SectionLabel>
      <Card>
        {pose.modifications.map((modification) => (
          <Text key={modification} variant="body" style={{ marginBottom: theme.space.sm }}>
            · {modification}
          </Text>
        ))}
        <Text variant="small" tone="muted" style={{ marginTop: theme.space.sm }}>
          Taking the modification is not taking the easier option. It is how the pose is practised until the
          full expression is available, and often long after.
        </Text>
      </Card>

      {pose.drishti ? (
        <>
          <Spacer size={theme.space.lg} />
          <SectionLabel>Drishti</SectionLabel>
          <Text variant="body" tone="secondary">
            {pose.drishti}
          </Text>
        </>
      ) : null}

      {appearsIn.length > 0 && (
        <>
          <Spacer size={theme.space.lg} />
          <SectionLabel>Appears in</SectionLabel>
          <Row gap={theme.space.sm} wrap>
            {appearsIn.map((sequence) => (
              <Button
                key={sequence.id}
                label={sequence.name}
                variant="ghost"
                onPress={() => router.push(`/sequence/${sequence.id}`)}
              />
            ))}
          </Row>
        </>
      )}
    </Screen>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color.surface,
        borderRadius: theme.radius.md,
        padding: theme.space.md,
      }}
    >
      <Text variant="label" tone="muted" caps>
        {label}
      </Text>
      <Text variant="subheading" weight="600">
        {value}
      </Text>
    </View>
  );
}
