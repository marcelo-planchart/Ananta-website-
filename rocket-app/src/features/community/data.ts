/**
 * PHASE 2 — COMMUNITY
 *
 * Types and lookups for the teacher, studio and training directory.
 *
 * The lists below are deliberately EMPTY. A directory of who is certified to
 * teach this system is the style owner's to publish, and inventing plausible
 * names would put words in real people's mouths. The screens render real
 * entries the moment `teachers`, `studios` and `events` are filled from an
 * owner-supplied source, and show an honest empty state until then.
 */

export interface Teacher {
  id: string;
  name: string;
  /** Certification level as defined by the style owner. */
  certification: string;
  city: string;
  country: string;
  /** Sequence ids this teacher regularly teaches. */
  teaches: string[];
  bio?: string;
  website?: string;
  photoUrl?: string;
}

export interface Studio {
  id: string;
  name: string;
  city: string;
  country: string;
  website?: string;
  /** Teacher ids based here. */
  teacherIds: string[];
}

export interface CommunityEvent {
  id: string;
  title: string;
  kind: 'training' | 'workshop' | 'retreat' | 'class';
  /** ISO date. */
  startsAt: string;
  endsAt?: string;
  city: string;
  country: string;
  teacherIds: string[];
  url?: string;
}

export const teachers: Teacher[] = [];
export const studios: Studio[] = [];
export const events: CommunityEvent[] = [];

/** True while the directory has no owner-supplied content. */
export const directoryIsEmpty = teachers.length === 0 && studios.length === 0 && events.length === 0;

export function teachersInCountry(country: string): Teacher[] {
  return teachers.filter((teacher) => teacher.country.toLowerCase() === country.toLowerCase());
}

export function upcomingEvents(from: Date = new Date()): CommunityEvent[] {
  return events
    .filter((event) => new Date(event.startsAt) >= from)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function searchCommunity(query: string): { teachers: Teacher[]; studios: Studio[] } {
  const q = query.trim().toLowerCase();
  if (!q) return { teachers, studios };
  return {
    teachers: teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(q) ||
        teacher.city.toLowerCase().includes(q) ||
        teacher.country.toLowerCase().includes(q),
    ),
    studios: studios.filter(
      (studio) =>
        studio.name.toLowerCase().includes(q) ||
        studio.city.toLowerCase().includes(q) ||
        studio.country.toLowerCase().includes(q),
    ),
  };
}
