import type { Sequence } from '../types';

/**
 * ROCKET 3 — DRAFT, PENDING REVIEW BY THE STYLE OWNER
 *
 * The combination practice: material from both Rocket 1 and Rocket 2 in one
 * flow. Longest of the three, and the one most often taught with room to play.
 */
export const rocket3: Sequence = {
  id: 'rocket-3',
  name: 'Rocket 3',
  subtitle: 'The whole thing',
  description:
    'Rocket 1 and Rocket 2 combined — forward folds and hips, then backbends, twists and the full inversion menu. The longest practice of the three, and the one with the most room to play.',
  accentKey: 'rocket3',
  traditionalDays: [3, 0],
  reviewStatus: 'draft-pending-owner-review',
  steps: [
    // ------------------------------------------------------------- open
    { poseId: 'sukhasana', tier: 'core', breaths: 8 },
    { poseId: 'surya-namaskara-a', tier: 'core', repeat: 3 },
    { poseId: 'surya-namaskara-b', tier: 'core', repeat: 3 },

    // --------------------------------------------------------- standing
    { poseId: 'padangusthasana', tier: 'core' },
    { poseId: 'padahastasana', tier: 'full' },
    { poseId: 'utthita-trikonasana', tier: 'core' },
    { poseId: 'parivrtta-trikonasana', tier: 'standard' },
    { poseId: 'utthita-parsvakonasana', tier: 'core' },
    { poseId: 'parivrtta-parsvakonasana', tier: 'standard' },
    { poseId: 'prasarita-padottanasana-a', tier: 'standard' },
    { poseId: 'prasarita-padottanasana-c', tier: 'full' },
    { poseId: 'parsvottanasana', tier: 'standard' },
    { poseId: 'utthita-hasta-padangusthasana', tier: 'standard' },
    { poseId: 'utkatasana', tier: 'core' },
    { poseId: 'virabhadrasana-a', tier: 'core' },
    { poseId: 'virabhadrasana-b', tier: 'standard' },
    { poseId: 'vasisthasana', tier: 'standard' },

    // ------------------------------------- first inversion block (early)
    { poseId: 'adho-mukha-vrksasana', tier: 'core', note: 'First of two inversion blocks. Play.' },
    { poseId: 'pincha-mayurasana', tier: 'standard' },
    { poseId: 'bakasana', tier: 'core' },
    { poseId: 'parsva-bakasana', tier: 'full' },

    // ------------------------------------------ seated, from Rocket 1
    { poseId: 'dandasana', tier: 'core' },
    { poseId: 'paschimottanasana', tier: 'core', breaths: 8 },
    { poseId: 'purvottanasana', tier: 'standard' },
    { poseId: 'triang-mukhaikapada-paschimottanasana', tier: 'full' },
    { poseId: 'janu-sirsasana-a', tier: 'core' },
    { poseId: 'janu-sirsasana-c', tier: 'full' },
    { poseId: 'marichyasana-a', tier: 'standard' },
    { poseId: 'marichyasana-c', tier: 'standard' },
    { poseId: 'navasana', tier: 'core' },
    { poseId: 'bhujapidasana', tier: 'standard' },
    { poseId: 'kurmasana', tier: 'standard' },
    { poseId: 'supta-kurmasana', tier: 'full' },
    { poseId: 'baddha-konasana', tier: 'core' },
    { poseId: 'upavistha-konasana', tier: 'standard' },
    { poseId: 'supta-padangusthasana', tier: 'full' },

    // ----------------------------------- twists and legs behind the head
    { poseId: 'pasasana', tier: 'standard' },
    { poseId: 'ardha-matsyendrasana', tier: 'standard' },
    { poseId: 'krounchasana', tier: 'full' },
    { poseId: 'eka-pada-sirsasana', tier: 'full' },
    { poseId: 'yoganidrasana', tier: 'full' },

    // ---------------------------------------- backbends, from Rocket 2
    { poseId: 'salabhasana-a', tier: 'core' },
    { poseId: 'bhekasana', tier: 'full' },
    { poseId: 'dhanurasana', tier: 'standard' },
    { poseId: 'ustrasana', tier: 'core' },
    { poseId: 'laghu-vajrasana', tier: 'full' },
    { poseId: 'kapotasana', tier: 'standard' },

    // --------------------------------- second inversion block (the menu)
    { poseId: 'adho-mukha-vrksasana', tier: 'standard', note: 'Second block. Longer holds now that you are open.' },
    { poseId: 'viparita-vrksasana', tier: 'standard' },
    { poseId: 'mukta-hasta-sirsasana', tier: 'standard' },
    { poseId: 'urdhva-kukkutasana', tier: 'full' },
    { poseId: 'tittibhasana', tier: 'full' },
    { poseId: 'astavakrasana', tier: 'full' },
    { poseId: 'mayurasana', tier: 'full' },

    // -------------------------------------------------------- finishing
    { poseId: 'urdhva-dhanurasana', tier: 'core', repeat: 3 },
    { poseId: 'paschimottanasana', tier: 'core', breaths: 10, note: 'Neutralise.' },
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
    { poseId: 'savasana', tier: 'core', breaths: 60 },
  ],
};
