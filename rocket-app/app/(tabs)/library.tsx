import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, TextInput, View } from 'react-native';

import { Text } from '@/components/Text';
import { Chip, Row, Screen, Spacer } from '@/components/primitives';
import { allPoses, familyLabels, familyOrder, searchPoses } from '@/data/poses';
import type { PoseFamily } from '@/data/types';
import { useTheme } from '@/theme';

/** The whole pose library, searchable and filterable by family. */
export default function Library() {
  const theme = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<PoseFamily | null>(null);

  const results = useMemo(() => {
    const byFamily = family ? allPoses.filter((pose) => pose.family === family) : allPoses;
    return searchPoses(query, byFamily);
  }, [query, family]);

  return (
    <Screen>
      <Text variant="title">Poses</Text>
      <Text variant="small" tone="secondary">
        {allPoses.length} poses, each with the modifications that make it available today.
      </Text>

      <Spacer size={theme.space.lg} />

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
          placeholder="Sanskrit or English"
          placeholderTextColor={theme.color.textMuted}
          style={{
            flex: 1,
            paddingVertical: theme.space.md,
            color: theme.color.textPrimary,
            fontSize: theme.type.body.fontSize,
          }}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} hitSlop={10}>
            <Ionicons name="close-circle" size={18} color={theme.color.textMuted} />
          </Pressable>
        )}
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

      <Spacer size={theme.space.lg} />

      {results.length === 0 ? (
        <Text variant="body" tone="muted">
          Nothing matches “{query}”.
        </Text>
      ) : (
        results.map((pose) => (
          <Pressable
            key={pose.id}
            onPress={() => router.push(`/pose/${pose.id}`)}
            style={{
              paddingVertical: theme.space.md,
              borderBottomWidth: 1,
              borderBottomColor: theme.color.line,
            }}
          >
            <Row justify="space-between">
              <View style={{ flex: 1, paddingRight: theme.space.md }}>
                <Text variant="body" weight="500">
                  {pose.sanskrit}
                </Text>
                <Text variant="small" tone="muted">
                  {pose.english} · {familyLabels[pose.family]}
                </Text>
              </View>
              <Text variant="small" tone="muted">
                {'●'.repeat(pose.difficulty)}
              </Text>
            </Row>
          </Pressable>
        ))
      )}
    </Screen>
  );
}
