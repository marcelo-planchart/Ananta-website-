import type { Pose, PoseFamily } from '../types';
import { finishingPoses } from './finishing';
import { foundationPoses } from './foundations';
import { seatedPoses } from './seated';
import { standingPoses } from './standing';
import { strengthPoses } from './strength';

/** Every pose in the library, in no particular order. */
export const allPoses: Pose[] = [
  ...foundationPoses,
  ...standingPoses,
  ...seatedPoses,
  ...strengthPoses,
  ...finishingPoses,
];

/**
 * Lookup by id. Built once at module load; duplicate ids would silently
 * shadow each other, so `src/data/data.test.ts` asserts uniqueness.
 */
export const poseById: Record<string, Pose> = Object.fromEntries(
  allPoses.map((pose) => [pose.id, pose]),
);

export function getPose(id: string): Pose | undefined {
  return poseById[id];
}

/**
 * Throws when an id is missing. Used by sequence resolution, where a missing
 * pose is a data bug we want to hear about immediately rather than a gap the
 * practitioner discovers mid-practice.
 */
export function requirePose(id: string): Pose {
  const pose = poseById[id];
  if (!pose) {
    throw new Error(`Unknown pose id: "${id}"`);
  }
  return pose;
}

/** Human-readable labels for the library's filter chips. */
export const familyLabels: Record<PoseFamily, string> = {
  surya: 'Sun Salutations',
  standing: 'Standing',
  balance: 'Balance',
  'forward-fold': 'Forward Folds',
  'hip-opener': 'Hip Openers',
  twist: 'Twists',
  backbend: 'Backbends',
  'arm-balance': 'Arm Balances',
  inversion: 'Inversions',
  core: 'Core',
  seated: 'Seated',
  finishing: 'Finishing',
  rest: 'Rest',
};

/** Families in the order they are taught, for grouped library browsing. */
export const familyOrder: PoseFamily[] = [
  'surya',
  'standing',
  'balance',
  'forward-fold',
  'twist',
  'hip-opener',
  'backbend',
  'arm-balance',
  'inversion',
  'core',
  'seated',
  'finishing',
  'rest',
];

/** Case-insensitive search across Sanskrit and English names. */
export function searchPoses(query: string, poses: Pose[] = allPoses): Pose[] {
  const q = query.trim().toLowerCase();
  if (!q) return poses;
  return poses.filter(
    (pose) =>
      pose.sanskrit.toLowerCase().includes(q) ||
      pose.english.toLowerCase().includes(q) ||
      pose.family.includes(q),
  );
}

export { finishingPoses, foundationPoses, seatedPoses, standingPoses, strengthPoses };
