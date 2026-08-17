# Rocket — practice app

A mobile app for practitioners of the Rocket system: a guided practice player,
the full pose library, and a record of what you have actually done.

Built with Expo / React Native. Runs on iOS and Android from the same codebase,
and exports to the web for review.

> **Status: draft content, awaiting the style owner.** The sequences in this app
> were assembled from published descriptions of the system and have **not** been
> reviewed or approved by the owner of the style. The app says so on every
> sequence screen. No official mark, wordmark, colour or photography is used.

---

## Getting it running

```bash
npm install
npm start          # then scan the QR code with Expo Go
npm run ios        # or android / web
```

Checks:

```bash
npm run typecheck  # tsc --noEmit
npm test           # 56 tests, no native mocks needed
npm run export:web # static build in dist/
```

---

## The idea

**Sequences are authored once, in full.** Each pose in a sequence carries a tier
— `core`, `standard` or `full` — and the app derives shorter practices by
dropping tiers. There is no separate "30 minute Rocket 1" list to fall out of
sync: shortening only ever *removes* poses, never reorders or substitutes them.
A test enforces that the order survives.

**Timing is counted in breaths, not seconds.** Every hold is authored as a
breath count. Seconds are computed at runtime from the practitioner's own breath
pace (3–8s, set in Settings), which is how the practice is actually counted. Slow
your breath down and the whole class gets longer, exactly as it does on the mat.

At the default 5s breath:

| Practice | Short | Full | Complete |
| --- | --- | --- | --- |
| Rocket 1 | 23 min | 39 min | 52 min |
| Rocket 2 | 22 min | 34 min | 46 min |
| Rocket 3 | 24 min | 40 min | 54 min |

**Modifications are first class.** Every one of the 103 poses carries its
modifications, and they are one tap away inside the player. The copy treats
taking a variation as the practice working, not as a compromise on it.

---

## Layout

```
app/                        expo-router routes
  (tabs)/                   Practice · Poses · Progress · Community · Teach
  practice/[sequenceId]     the player
  sequence/[sequenceId]     preview a practice, pick a length
  pose/[poseId]             one pose in full
  teach/build               sequence builder
  summary.tsx, settings.tsx

src/
  theme/tokens.ts           ← ALL brand-owned values live here
  data/
    types.ts                content model
    poses/                  103 poses by family
    sequences/              Rocket 1, 2, 3
  features/
    practice/
      resolve.ts            tiers → flat step list, breath-paced (pure)
      machine.ts            player state machine (pure reducer)
      usePracticeEngine.ts  clock, voice, haptics, keep-awake
      BreathRing.tsx        breath pacer
    progress/streak.ts      streak and totals math (pure)
    settings/, teach/, community/
  components/               Text + primitives, all theme-driven
  lib/                      storage, feedback, store factory
```

The pure modules (`resolve`, `machine`, `streak`) import nothing from
react-native, so the interesting behaviour is unit tested in plain node.

---

## Swapping in the official brand

Everything the style owner controls is isolated in **`src/theme/tokens.ts`**. No
screen, component or stylesheet hardcodes a colour or font family — they all read
through `useTheme()`. To apply the real identity:

1. Replace the values in the `brand` object (colours, per-sequence accents).
2. Drop licensed font files in `assets/fonts` and set `brand.font`.
3. Set `brand.asset.wordmark` / `mark` to the supplied artwork.

Nothing else needs to change.

To mark sequence content as reviewed, set a sequence's `reviewStatus` to
`'approved'` — the draft banner disappears on its own. A test asserts the
built-in sequences are drafts, so approving one has to be a deliberate edit.

---

## Phases

**Phase 1 — practice player.** Done. Player, pose library, progress tracking,
settings.

**Phase 2 — community.** Screens are built; the directory is deliberately empty.
Who is certified to teach this system is the owner's to publish, so
`src/features/community/data.ts` ships with empty arrays and an honest empty
state rather than invented names. Fill the arrays and the screens populate.

**Phase 3 — teacher tools.** The sequence builder works today: build a sequence
from the pose library and it plays in the same engine, with the same duration
scaling, as the built-in practices. Sharing sequences with students is next and
needs accounts behind it.

---

## Data and privacy

Practice history, settings and custom sequences are stored on the device with
AsyncStorage. There is no account, no analytics and no server. Nothing leaves the
phone.
