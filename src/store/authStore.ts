import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Profile } from '../types';
import { mockUsers, mockProfiles } from '../data/mockData';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  login: (email: string) => boolean;
  logout: () => void;
  register: (userData: Partial<User>, profileData: Partial<Profile>) => void;
  verifyUser: (studentIdFileUrl?: string) => void;
  updateProfile: (updatedProfile: Partial<Profile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Aarav Sharma is default logged-in user to show premium dashboards immediately
      user: mockUsers[0], 
      profile: mockProfiles[0],

      login: (email: string) => {
        const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (foundUser) {
          const foundProfile = mockProfiles.find((p) => p.userId === foundUser.id) || null;
          set({ user: foundUser, profile: foundProfile });
          return true;
        }
        // If not found, create a dummy student user
        const newId = 'u_' + Date.now();
        const newUser: User = {
          id: newId,
          email,
          role: 'student',
          isVerified: false,
          trustScore: 70,
          createdAt: new Date().toISOString()
        };
        const newProfile: Profile = {
          userId: newId,
          name: email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${newId}`,
          college: 'Engineering Institute of Tech',
          branch: 'Computer Science',
          year: 1,
          bio: 'Hey there! I am new to CampusBuddy.',
          skills: [],
          interests: [],
          techStack: [],
          clubs: [],
          careerGoals: [],
          availability: [],
          lookingFor: [],
          projects: [],
          achievements: []
        };
        set({ user: newUser, profile: newProfile });
        return true;
      },

      logout: () => {
        set({ user: null, profile: null });
      },

      register: (userData, profileData) => {
        const newId = 'u_' + Date.now();
        const newUser: User = {
          id: newId,
          email: userData.email || 'student@college.edu',
          role: 'student',
          isVerified: false,
          trustScore: 75,
          createdAt: new Date().toISOString()
        };
        const newProfile: Profile = {
          userId: newId,
          name: profileData.name || 'Anonymous Student',
          avatar: profileData.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${newId}`,
          college: profileData.college || 'Engineering Institute of Tech',
          branch: profileData.branch || 'Computer Science',
          year: Number(profileData.year) || 1,
          bio: profileData.bio || '',
          skills: profileData.skills || [],
          interests: profileData.interests || [],
          techStack: profileData.techStack || [],
          clubs: [],
          careerGoals: profileData.careerGoals || [],
          availability: profileData.availability || [],
          lookingFor: profileData.lookingFor || [],
          projects: [],
          achievements: []
        };
        set({ user: newUser, profile: newProfile });
      },

      verifyUser: () => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, isVerified: true, trustScore: 99 }
          });
        }
      },

      updateProfile: (updatedProfile) => {
        const currentProfile = get().profile;
        if (currentProfile) {
          set({
            profile: { ...currentProfile, ...updatedProfile }
          });
        }
      }
    }),
    {
      name: 'campusbuddy-auth-store'
    }
  )
);
