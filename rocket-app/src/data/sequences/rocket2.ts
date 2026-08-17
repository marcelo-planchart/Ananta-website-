import type { Sequence } from '../types';

/**
 * ROCKET 2 — DRAFT, PENDING REVIEW BY THE STYLE OWNER
 *
 * The intermediate practice: backbends, deep twists, leg-behind-head work and
 * the harder arm balances, drawn from the second series. Shorter standing
 * section than Rocket 1 to leave room for the heavier material.
 */
export const rocket2: Sequence = {
  id: 'rocket-2',
  name: 'Rocket 2',
  subtitle: 'Backbends and inversions',
  description:
    'The intermediate practice. Backbends, deep twists, leg-behind-head work and the second-series arm balances. Expect to meet an edge here — take the modification and keep breathing.',
  accentKey: 'rocket2',
  traditionalDays: [2, 4],
  reviewStatus: 'draft-pending-owner-review',
  steps: [
    // ------------------------------------------------------------- open
    { poseId: 'sukhasana', tier: 'core', breaths: 8 },
    { poseId: 'surya-namaskara-a', tier: 'core', repeat: 3 },
    { poseId: 'surya-namaskara-b', tier: 'core', repeat: 3 },

    // ------------------------------------- abbreviated standing warm-up
    { poseId: 'utthita-trikonasana', tier: 'core' },
    { poseId: 'utthita-parsvakonasana', tier: 'core' },
    { poseId: 'parivrtta-parsvakonasana', tier: 'standard' },
    { poseId: 'prasarita-padottanasana-a', tier: 'standard' },
    { poseId: 'parighasana', tier: 'full' },
    { poseId: 'utkatasana', tier: 'standard' },
    { poseId: 'virabhadrasana-a', tier: 'core' },

    // ------------------------------------------------------- twist work
    { poseId: 'pasasana', tier: 'core', note: 'Heels down if they will. A blanket under them is not cheating.' },
    { poseId: 'krounchasana', tier: 'standard' },
    { poseId: 'bharadvajasana', tier: 'standard' },
    { poseId: 'ardha-matsyendrasana', tier: 'core' },
    { poseId: 'supta-urdhva-pada-vajrasana', tier: 'full' },

    // --------------------------------------------------------- backbends
    { poseId: 'salabhasana-a', tier: 'core' },
    { poseId: 'salabhasana-b', tier: 'standard' },
    { poseId: 'bhekasana', tier: 'standard' },
    { poseId: 'dhanurasana', tier: 'core' },
    { poseId: 'parsva-dhanurasana', tier: 'full' },
    { poseId: 'ustrasana', tier: 'core' },
    { poseId: 'laghu-vajrasana', tier: 'full' },
    {
      poseId: 'kapotasana',
      tier: 'standard',
      note: 'The deepest backbend in the practice. Warm, patient, unhurried — or take camel instead.',
    },
    { poseId: 'supta-vajrasana', tier: 'full' },

    // ------------------------------------------------------- arm balances
    { poseId: 'bakasana', tier: 'core' },
    { poseId: 'parsva-bakasana', tier: 'standard' },
    { poseId: 'astavakrasana', tier: 'full' },
    { poseId: 'eka-pada-koundinyasana-ii', tier: 'full' },
    { poseId: 'tittibhasana', tier: 'standard' },
    { poseId: 'mayurasana', tier: 'full' },
    { poseId: 'nakrasana', tier: 'full' },

    // -------------------------------------------- legs behind the head
    { poseId: 'eka-pada-sirsasana', tier: 'standard' },
    { poseId: 'dwi-pada-sirsasana', tier: 'full' },
    { poseId: 'yoganidrasana', tier: 'full' },
    { poseId: 'vatayanasana', tier: 'full' },
    { poseId: 'gomukhasana', tier: 'standard' },

    // -------------------------------------------------------- inversions
    { poseId: 'adho-mukha-vrksasana', tier: 'core' },
    { poseId: 'pincha-mayurasana', tier: 'core' },
    { poseId: 'viparita-vrksasana', tier: 'standard', note: 'At the wall. Shoulders open before the feet travel.' },
    { poseId: 'karandavasana', tier: 'full' },
    { poseId: 'mukta-hasta-sirsasana', tier: 'standard' },
    { poseId: 'urdhva-kukkutasana', tier: 'full' },

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
    { poseId: 'padmasana', tier: 'standard' },
    { poseId: 'utplutih', tier: 'full' },
    { poseId: 'savasana', tier: 'core', breaths: 60 },
  ],
};
