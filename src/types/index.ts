// CampusBuddy Domain Models

export interface User {
  id: string;
  email: string;
  role: 'student' | 'club_leader' | 'faculty' | 'admin';
  isVerified: boolean;
  trustScore: number;
  createdAt: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface AvailabilitySlot {
  day: string; // 'Monday', 'Tuesday', etc.
  time: string; // 'Morning', 'Afternoon', 'Evening'
}

export interface Profile {
  userId: string;
  name: string;
  avatar: string;
  college: string;
  branch: string;
  year: number;
  bio: string;
  skills: string[];
  interests: string[];
  techStack: string[];
  clubs: string[];
  careerGoals: string[];
  availability: AvailabilitySlot[];
  lookingFor: string[]; // 'Study Partners', 'Hackathon Teammates', 'Club Members', 'Mentors', 'Project Teammates'
  projects: Project[];
  achievements: Achievement[];
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: 'technical' | 'cultural' | 'sports' | 'social';
  logo: string;
  banner: string;
  leaderId: string;
  memberIds: string[];
  isRecruiting: boolean;
  createdAt: string;
}

export interface ClubApplication {
  id: string;
  clubId: string;
  userId: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'cultural' | 'sports' | 'workshop' | 'hackathon';
  date: string;
  endDate: string;
  venue: string;
  organizer: string;
  clubId?: string;
  banner: string;
  registeredIds: string[];
  maxCapacity: number;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: 'DSA' | 'AI/ML' | 'DBMS' | 'OS' | 'CN' | 'Aptitude' | string;
  description: string;
  creatorId: string;
  memberIds: string[];
  maxMembers: number;
  schedule: string;
  isOpen: boolean;
  createdAt: string;
}

export interface TeamRole {
  name: string; // 'Frontend', 'Backend', 'AI/ML', 'UI/UX', 'Marketing'
  status: 'open' | 'filled';
}

export interface Team {
  id: string;
  name: string;
  hackathonName: string;
  description: string;
  leaderId: string;
  memberIds: string[];
  openRoles: string[]; // 'Frontend', 'Backend', 'AI/ML', 'UI/UX', 'Marketing'
  requiredSkills: string[];
  status: 'forming' | 'complete' | 'competing';
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  type: 'direct' | 'group' | 'study_group' | 'team';
  participantIds: string[];
  name?: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  readBy: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  targetId: string;
  targetType: 'user' | 'message' | 'club' | 'event';
  reason: string;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}
