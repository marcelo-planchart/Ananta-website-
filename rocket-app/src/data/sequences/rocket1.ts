import type { Sequence } from '../types';

/**
 * ROCKET 1 — DRAFT, PENDING REVIEW BY THE STYLE OWNER
 *
 * Assembled from published descriptions of the system: a modified primary
 * series emphasising forward folds and hip opening, with the inversion and
 * arm-balance work brought into the middle of the practice rather than saved
 * for the end. Tiers are the app's own editorial judgement about what to keep
 * in a shortened practice and are the first thing to correct on review.
 */
export const rocket1: Sequence = {
  id: 'rocket-1',
  name: 'Rocket 1',
  subtitle: 'Forward folds and hips',
  description:
    'The foundation. A modified primary series that works the hamstrings, hips and forward folds, with handstand and arm-balance play in the middle of the practice. This is the one to learn first and the one to come back to.',
  accentKey: 'rocket1',
  traditionalDays: [1, 5],
  reviewStatus: 'draft-pending-owner-review',
  steps: [
    // ------------------------------------------------------------- open
    { poseId: 'sukhasana', tier: 'core', breaths: 8, note: 'Settle. Find the breath before the first movement.' },
    { poseId: 'surya-namaskara-a', tier: 'core', repeat: 3 },
    { poseId: 'surya-namaskara-b', tier: 'core', repeat: 3 },

    // --------------------------------------------------------- standing
    { poseId: 'padangusthasana', tier: 'core' },
    { poseId: 'padahastasana', tier: 'standard' },
    { poseId: 'utthita-trikonasana', tier: 'core' },
    { poseId: 'parivrtta-trikonasana', tier: 'standard' },
    { poseId: 'utthita-parsvakonasana', tier: 'core' },
    { poseId: 'parivrtta-parsvakonasana', tier: 'standard' },
    { poseId: 'prasarita-padottanasana-a', tier: 'core' },
    { poseId: 'prasarita-padottanasana-b', tier: 'full' },
    { poseId: 'prasarita-padottanasana-c', tier: 'standard' },
    { poseId: 'prasarita-padottanasana-d', tier: 'full' },
    { poseId: 'parsvottanasana', tier: 'standard' },
    { poseId: 'utthita-hasta-padangusthasana', tier: 'standard' },
    { poseId: 'ardha-baddha-padmottanasana', tier: 'full' },
    { poseId: 'utkatasana', tier: 'core' },
    { poseId: 'virabhadrasana-a', tier: 'core' },
    { poseId: 'virabhadrasana-b', tier: 'standard' },

    // ------------------------------------------ inversions and balances
    {
      poseId: 'adho-mukha-vrksasana',
      tier: 'core',
      note: 'Inversions come in the middle here, while you are warm and still fresh. Wall is not a lesser option.',
    },
    { poseId: 'pincha-mayurasana', tier: 'standard' },
    { poseId: 'mukta-hasta-sirsasana', tier: 'standard' },
    { poseId: 'bakasana', tier: 'core' },
    { poseId: 'vasisthasana', tier: 'standard' },
    { poseId: 'lolasana', tier: 'full' },

    // ----------------------------------------------------------- seated
    { poseId: 'dandasana', tier: 'core' },
    { poseId: 'paschimottanasana', tier: 'core', breaths: 8 },
    { poseId: 'purvottanasana', tier: 'standard' },
    { poseId: 'ardha-baddha-padma-paschimottanasana', tier: 'full' },
    { poseId: 'triang-mukhaikapada-paschimottanasana', tier: 'standard' },
    { poseId: 'janu-sirsasana-a', tier: 'core' },
    { poseId: 'janu-sirsasana-b', tier: 'full' },
    { poseId: 'janu-sirsasana-c', tier: 'full' },
    { poseId: 'marichyasana-a', tier: 'standard' },
    { poseId: 'marichyasana-b', tier: 'full' },
    { poseId: 'marichyasana-c', tier: 'standard' },
    { poseId: 'marichyasana-d', tier: 'full' },
    { poseId: 'navasana', tier: 'core', note: 'Five rounds, with a lift between each.' },
    { poseId: 'bhujapidasana', tier: 'standard' },
    { poseId: 'kurmasana', tier: 'standard' },
    { poseId: 'supta-kurmasana', tier: 'full' },
    { poseId: 'garbha-pindasana', tier: 'full' },
    { poseId: 'kukkutasana', tier: 'full' },
    { poseId: 'baddha-konasana', tier: 'core' },
    { poseId: 'upavistha-konasana', tier: 'standard' },
    { poseId: 'supta-konasana', tier: 'full' },
    { poseId: 'supta-padangusthasana', tier: 'standard' },
    { poseId: 'ubhaya-padangusthasana', tier: 'full' },
    { poseId: 'urdhva-mukha-paschimottanasana', tier: 'full' },
    { poseId: 'setu-bandhasana', tier: 'full' },

    // -------------------------------------------------------- finishing
    { poseId: 'urdhva-dhanurasana', tier: 'core', repeat: 3 },
    { poseId: 'paschimottanasana', tier: 'core', breaths: 10, note: 'Neutralise the spine after the backbends.' },
    { poseId: 'salamba-sarvangasana', tier: 'core' },
    { poseId: 'halasana', tier: 'standard' },
    { poseId: 'karnapidasana', tier: 'standard' },
    { poseId: 'urdhva-padmasana', tier: 'full' },
    { poseId: 'pindasana', tier: 'full' },
    { poseId: 'matsyasana', tier: 'standard' },
    { poseId: 'uttana-padasana', tier: 'full' },
    { poseId: 'salamba-sirsasana', tier: 'standard' },
    { poseId: 'baddha-padmasana', tier: 'full' },
    { poseId: 'yoga-mudra', tier: 'full' },
    { poseId: 'padmasana', tier: 'standard' },
    { poseId: 'utplutih', tier: 'full' },
    { poseId: 'savasana', tier: 'core', breaths: 60, note: 'Stay. This is where the practice lands.' },
  ],
};
