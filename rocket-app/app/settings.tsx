import { Alert, Platform, Pressable, Switch, View } from 'react-native';

import { Text } from '@/components/Text';
import { Card, Row, Screen, SectionLabel, Spacer } from '@/components/primitives';
import { rocket1 } from '@/data/sequences';
import {
  MAX_PACE_SECONDS,
  MIN_PACE_SECONDS,
  estimateMinutes,
} from '@/features/practice/resolve';
import { clearSessions } from '@/features/progress/store';
import { updateSettings, useSettings } from '@/features/settings/store';
import { useTheme } from '@/theme';

export default function Settings() {
  const theme = useTheme();
  const settings = useSettings();

  const confirmClear = () => {
    if (Platform.OS === 'web') {
      void clearSessions();
      return;
    }
    Alert.alert('Clear history', 'Delete every logged practice? This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => void clearSessions() },
    ]);
  };

  return (
    <Screen>
      <SectionLabel>Breath pace</SectionLabel>
      <Card>
        <Text variant="body" tone="secondary">
          How long one breath takes. Everything in the app is counted in breaths, so this sets the length of
          every practice.
        </Text>
        <Spacer size={theme.space.md} />
        <Row justify="space-between">
          <Pressable
            onPress={() => updateSettings({ pace: settings.pace - 1 })}
            disabled={settings.pace <= MIN_PACE_SECONDS}
            hitSlop={12}
          >
            <Text variant="title" tone={settings.pace <= MIN_PACE_SECONDS ? 'muted' : 'accent'}>
              −
            </Text>
          </Pressable>
          <View style={{ alignItems: 'center' }}>
            <Text variant="title" weight="700">
              {settings.pace}s
            </Text>
            <Text variant="label" tone="muted" caps>
              per breath
            </Text>
          </View>
          <Pressable
            onPress={() => updateSettings({ pace: settings.pace + 1 })}
            disabled={settings.pace >= MAX_PACE_SECONDS}
            hitSlop={12}
          >
            <Text variant="title" tone={settings.pace >= MAX_PACE_SECONDS ? 'muted' : 'accent'}>
              +
            </Text>
          </Pressable>
        </Row>
        <Spacer size={theme.space.md} />
        <Text variant="small" tone="muted">
          At this pace a full Rocket 1 runs about {estimateMinutes(rocket1, 'full', settings.pace)} minutes,
          and the complete sequence about {estimateMinutes(rocket1, 'complete', settings.pace)}.
        </Text>
      </Card>

      <Spacer size={theme.space.xl} />

      <SectionLabel>During practice</SectionLabel>
      <Toggle
        label="Voice cues"
        description="Speak the pose name and first cue at each change."
        value={settings.voiceCues}
        onChange={(voiceCues) => updateSettings({ voiceCues })}
      />
      <Toggle
        label="Vibrate on transitions"
        description="A pulse when the pose changes, for when your eyes are closed."
        value={settings.haptics}
        onChange={(haptics) => updateSettings({ haptics })}
      />
      <Toggle
        label="Move on automatically"
        description="Off means you tap through each pose at your own speed."
        value={settings.autoAdvance}
        onChange={(autoAdvance) => updateSettings({ autoAdvance })}
      />
      <Toggle
        label="Show safety notes"
        description="Warnings on the poses where the risk is real."
        value={settings.showSafetyNotes}
        onChange={(showSafetyNotes) => updateSettings({ showSafetyNotes })}
      />
      <Toggle
        label="Cap the closing rest"
        description="Hold savasana to two minutes, for short practices."
        value={settings.maxRestBreaths !== null}
        onChange={(capped) => updateSettings({ maxRestBreaths: capped ? 24 : null })}
      />

      <Spacer size={theme.space.xl} />

      <SectionLabel>Your data</SectionLabel>
      <Card>
        <Text variant="body" tone="secondary">
          Practice history, settings and any sequences you build are stored on this device only. There is no
          account and nothing is sent anywhere.
        </Text>
        <Spacer size={theme.space.md} />
        <Pressable onPress={confirmClear}>
          <Text variant="body" tone="caution" weight="600">
            Clear practice history
          </Text>
        </Pressable>
      </Card>

      <Spacer size={theme.space.xl} />

      <SectionLabel>About</SectionLabel>
      <Card>
        <Text variant="small" tone="secondary">
          An independent app for practitioners of this system, built with and for the community. The
          sequences are drafts assembled from published descriptions and are awaiting review by the style
          owner. No official mark, wordmark or brand colour is used.
        </Text>
      </Card>
    </Screen>
  );
}

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingVertical: theme.space.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.color.line,
      }}
    >
      <Row justify="space-between" gap={theme.space.md}>
        <View style={{ flex: 1 }}>
          <Text variant="body" weight="500">
            {label}
          </Text>
          <Text variant="small" tone="muted">
            {description}
          </Text>
        </View>
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ true: theme.color.accent, false: theme.color.line }}
          thumbColor={theme.color.textPrimary}
        />
      </Row>
    </View>
  );
}
