# Rocket practice app — working notes

Expo / React Native app for the Rocket yoga community. See `README.md` for the
full picture; this file is the short version for future sessions.

## Commands

```bash
npm run typecheck   # tsc --noEmit — must be clean
npm test            # jest, pure logic only, no native mocks
npm run export:web  # static build, useful for screenshotting screens
```

`npx expo install` does not work in the sandboxed environment (api.expo.dev is
blocked by network policy). Install with plain `npm install` and check the
version lines up with the Expo SDK in `package.json`.

## Rules that matter

- **Brand values live only in `src/theme/tokens.ts`.** Never hardcode a colour,
  font family or logo path in a screen or component. Read tokens via
  `useTheme()`. The official Rocket assets have not been supplied yet, and the
  current palette is an explicitly-labelled neutral placeholder.
- **Do not present draft sequence content as official.** The three sequences are
  `reviewStatus: 'draft-pending-owner-review'` and the UI shows a banner saying
  so. Only the style owner's confirmation justifies changing that field.
- **Do not invent community data.** `src/features/community/data.ts` is empty on
  purpose. Teachers, studios and trainings come from the owner's directory.
- **Keep `resolve.ts`, `machine.ts` and `streak.ts` free of react-native
  imports.** That is what keeps the test suite fast and mock-free.
- Sequences are authored once at full length with per-step tiers. Never add a
  separate short version of a sequence — shorten by tier.
- Holds are authored in breaths. Never hardcode seconds in sequence data.

## Architecture in one paragraph

`resolve.ts` turns an authored `Sequence` into a flat list of `ResolvedStep`s —
filtering by tier, expanding two-sided poses into right/left, expanding repeat
rounds, and multiplying breaths by the practitioner's pace. `machine.ts` is the
player's reducer over that list. `usePracticeEngine.ts` wraps the reducer with
the clock, voice cues, haptics and keep-awake. Everything else — the sequence
preview, the builder, the summary — is a view over those three modules.
