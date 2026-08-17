import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

/**
 * Voice and touch feedback for the player.
 *
 * Both are best-effort: a phone with haptics disabled, a browser with no
 * speech synthesis, or a device that is simply muted must not break the
 * practice. Every call here swallows its own failures.
 */

const canHaptic = Platform.OS === 'ios' || Platform.OS === 'android';

export function tapFeedback(): void {
  if (!canHaptic) return;
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
}

/** Marks a change of pose. */
export function transitionFeedback(): void {
  if (!canHaptic) return;
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => undefined);
}

/** Marks the end of the practice. */
export function completionFeedback(): void {
  if (!canHaptic) return;
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
}

/**
 * Speaks a cue. Rate is a little under natural so instructions land while
 * upside down; each call interrupts the previous one so cues never pile up.
 */
export function speak(text: string): void {
  try {
    Speech.stop();
    Speech.speak(text, { rate: 0.92, pitch: 1.0 });
  } catch {
    // No speech synthesis available.
  }
}

export function stopSpeaking(): void {
  try {
    Speech.stop();
  } catch {
    // Ignore.
  }
}
