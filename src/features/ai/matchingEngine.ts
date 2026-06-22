import { Profile } from '../../types';

export interface MatchResult {
  profile: Profile;
  score: number;
  reasons: string[];
  type: 'study' | 'hackathon' | 'mentor' | 'general';
}

/**
 * Calculates a match score (0-99) between a source profile and a target profile.
 */
export const calculateMatchScore = (source: Profile, target: Profile): MatchResult => {
  const reasons: string[] = [];
  let score = 50; // base score

  // 1. Skill overlap
  const sharedSkills = target.skills.filter(s => source.skills.includes(s));
  if (sharedSkills.length > 0) {
    score += sharedSkills.length * 8;
    reasons.push(`You both know ${sharedSkills.slice(0, 2).join(', ')}`);
  }

  // 2. Tech stack overlap
  const sharedTech = target.techStack.filter(t => source.techStack.includes(t));
  if (sharedTech.length > 0) {
    score += sharedTech.length * 6;
    reasons.push(`Shared tech stack: ${sharedTech.slice(0, 2).join(', ')}`);
  }

  // 3. Branch and Year
  if (source.branch === target.branch) {
    score += 12;
    reasons.push(`Common academic branch: ${source.branch}`);
  }
  if (source.year === target.year) {
    score += 6;
  }

  // 4. Availability slots overlap
  const sharedAvailability = target.availability.filter(tSlot =>
    source.availability.some(sSlot => sSlot.day === tSlot.day && sSlot.time === tSlot.time)
  );
  if (sharedAvailability.length > 0) {
    score += Math.min(sharedAvailability.length * 4, 15);
    reasons.push(`Common availability on ${sharedAvailability[0].day}`);
  }

  // 5. Interests overlap
  const sharedInterests = target.interests.filter(i => source.interests.includes(i));
  if (sharedInterests.length > 0) {
    score += sharedInterests.length * 4;
    reasons.push(`Common interests: ${sharedInterests.slice(0, 2).join(', ')}`);
  }

  // Cap score at 99
  const finalScore = Math.min(score, 99);

  // Classify recommendation type
  let type: 'study' | 'hackathon' | 'mentor' | 'general' = 'general';
  if (target.lookingFor.includes('Study Partners') && source.lookingFor.includes('Study Partners')) {
    type = 'study';
  } else if (target.lookingFor.includes('Hackathon Teammates') && source.lookingFor.includes('Hackathon Teammates')) {
    type = 'hackathon';
  } else if (target.year > source.year && target.skills.length > source.skills.length + 2) {
    type = 'mentor';
  }

  return {
    profile: target,
    score: finalScore,
    reasons: reasons.length > 0 ? reasons : [`Connect to expand your campus network!`],
    type
  };
};

/**
 * Returns a sorted list of MatchResult objects for a given student profile.
 */
export const getAIRecommendations = (currentProfile: Profile, allProfiles: Profile[], limit = 3): MatchResult[] => {
  return allProfiles
    .filter(p => p.userId !== currentProfile.userId)
    .map(p => calculateMatchScore(currentProfile, p))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
