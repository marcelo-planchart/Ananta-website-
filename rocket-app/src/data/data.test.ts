import { allPoses, familyLabels, poseById, searchPoses } from './poses';
import { builtInSequences } from './sequences';

describe('pose library', () => {
  it('has no duplicate ids', () => {
    const ids = allPoses.map((pose) => pose.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every pose a label for its family', () => {
    for (const pose of allPoses) {
      expect(familyLabels[pose.family]).toBeTruthy();
    }
  });

  it('gives every pose at least one cue and one modification', () => {
    for (const pose of allPoses) {
      expect(pose.cues.length).toBeGreaterThan(0);
      expect(pose.modifications.length).toBeGreaterThan(0);
    }
  });

  it('searches Sanskrit and English names case-insensitively', () => {
    expect(searchPoses('trikon').map((p) => p.id)).toContain('utthita-trikonasana');
    expect(searchPoses('CROW').map((p) => p.id)).toContain('bakasana');
  });
});

describe('sequences', () => {
  it('references only poses that exist', () => {
    for (const sequence of builtInSequences) {
      for (const step of sequence.steps) {
        expect(poseById[step.poseId]).toBeDefined();
      }
    }
  });

  it('always opens with a settling pose and closes in savasana', () => {
    for (const sequence of builtInSequences) {
      expect(sequence.steps[0]?.poseId).toBe('sukhasana');
      expect(sequence.steps[sequence.steps.length - 1]?.poseId).toBe('savasana');
    }
  });

  it('keeps sun salutations, a backbend and the closing rest in every short practice', () => {
    for (const sequence of builtInSequences) {
      const core = sequence.steps.filter((step) => step.tier === 'core').map((step) => step.poseId);
      expect(core).toContain('surya-namaskara-a');
      expect(core).toContain('urdhva-dhanurasana');
      expect(core).toContain('savasana');
    }
  });

  it('flags the built-in sequences as awaiting the style owner’s review', () => {
    // The app shows this state in the UI. If a sequence is ever marked
    // approved, that must be a deliberate edit, not a default.
    for (const sequence of builtInSequences) {
      expect(sequence.reviewStatus).toBe('draft-pending-owner-review');
    }
  });
});
