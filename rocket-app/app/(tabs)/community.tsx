import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Text } from '@/components/Text';
import { Card, Row, Screen, SectionLabel, Spacer } from '@/components/primitives';
import { studios, teachers, upcomingEvents } from '@/features/community/data';
import { useTheme } from '@/theme';

/**
 * PHASE 2 — COMMUNITY
 *
 * The screen is complete; the directory behind it is not. Rather than seed it
 * with invented teachers, it renders an honest empty state until the style
 * owner supplies the real list. Fill `src/features/community/data.ts` and
 * every list below populates with no further work.
 */
export default function Community() {
  const theme = useTheme();
  const events = upcomingEvents();
  const isEmpty = teachers.length === 0 && studios.length === 0 && events.length === 0;

  return (
    <Screen>
      <Text variant="title">Community</Text>
      <Text variant="small" tone="secondary">
        Teachers, studios and trainings in this lineage.
      </Text>

      <Spacer size={theme.space.lg} />

      {isEmpty ? (
        <Card>
          <Row gap={theme.space.md} align="flex-start">
            <Ionicons name="people-outline" size={22} color={theme.color.accent} />
            <View style={{ flex: 1 }}>
              <Text variant="subheading" weight="600">
                Waiting on the official directory
              </Text>
              <Spacer size={theme.space.sm} />
              <Text variant="small" tone="secondary">
                Who is certified to teach this system is the style owner’s to publish, so this list is empty
                rather than guessed at. Once we have the directory — names, certification levels, cities,
                trainings — it drops straight in here.
              </Text>
            </View>
          </Row>
        </Card>
      ) : (
        <>
          <SectionLabel>Teachers</SectionLabel>
          {teachers.map((teacher) => (
            <View key={teacher.id} style={{ marginBottom: theme.space.md }}>
              <Card>
                <Text variant="body" weight="600">
                  {teacher.name}
                </Text>
                <Text variant="small" tone="muted">
                  {teacher.certification} · {teacher.city}, {teacher.country}
                </Text>
              </Card>
            </View>
          ))}

          {studios.length > 0 && (
            <>
              <Spacer size={theme.space.lg} />
              <SectionLabel>Studios</SectionLabel>
              {studios.map((studio) => (
                <View key={studio.id} style={{ marginBottom: theme.space.md }}>
                  <Card>
                    <Text variant="body" weight="600">
                      {studio.name}
                    </Text>
                    <Text variant="small" tone="muted">
                      {studio.city}, {studio.country}
                    </Text>
                  </Card>
                </View>
              ))}
            </>
          )}

          {events.length > 0 && (
            <>
              <Spacer size={theme.space.lg} />
              <SectionLabel>Coming up</SectionLabel>
              {events.map((event) => (
                <View key={event.id} style={{ marginBottom: theme.space.md }}>
                  <Card>
                    <Text variant="body" weight="600">
                      {event.title}
                    </Text>
                    <Text variant="small" tone="muted">
                      {new Date(event.startsAt).toLocaleDateString()} · {event.city}, {event.country}
                    </Text>
                  </Card>
                </View>
              ))}
            </>
          )}
        </>
      )}

      <Spacer size={theme.space.xl} />

      <SectionLabel>What this becomes</SectionLabel>
      <Card>
        {[
          'Find a certified teacher near you, or teaching online.',
          'Studios where the sequences are taught, with schedules.',
          'Teacher trainings, workshops and retreats.',
          'Follow the teachers you practise with.',
        ].map((line) => (
          <Row key={line} gap={theme.space.sm} align="flex-start" style={{ marginBottom: theme.space.sm }}>
            <Ionicons name="ellipse-outline" size={10} color={theme.color.textMuted} style={{ marginTop: 6 }} />
            <Text variant="small" tone="secondary" style={{ flex: 1 }}>
              {line}
            </Text>
          </Row>
        ))}
      </Card>
    </Screen>
  );
}
