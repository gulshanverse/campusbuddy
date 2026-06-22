import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Profile, Club, ClubApplication, Event, StudyGroup, Team, ChatConversation, Message, Notification, Report } from '../types';
import {
  mockProfiles,
  mockClubs,
  mockEvents,
  mockStudyGroups,
  mockTeams,
  mockConversations,
  mockMessages,
  mockNotifications,
  mockReports,
  mockUsers
} from '../data/mockData';

interface AppState {
  profiles: Profile[];
  clubs: Club[];
  clubApplications: ClubApplication[];
  events: Event[];
  studyGroups: StudyGroup[];
  teams: Team[];
  conversations: ChatConversation[];
  messages: Message[];
  notifications: Notification[];
  reports: Report[];
  blockedUserIds: string[];

  // Mutators - Study Buddy
  createStudyGroup: (group: Partial<StudyGroup>) => void;
  joinStudyGroup: (groupId: string, userId: string) => void;
  leaveStudyGroup: (groupId: string, userId: string) => void;

  // Mutators - Hackathon
  createTeam: (team: Partial<Team>) => void;
  joinTeam: (teamId: string, userId: string) => void;
  applyToRole: (teamId: string, role: string, userId: string) => void;

  // Mutators - Clubs
  followClub: (clubId: string, userId: string) => void;
  applyToClub: (clubId: string, userId: string, reason: string) => void;
  approveClubApplication: (applicationId: string) => void;
  rejectClubApplication: (applicationId: string) => void;

  // Mutators - Events
  registerForEvent: (eventId: string, userId: string) => void;
  unregisterFromEvent: (eventId: string, userId: string) => void;

  // Mutators - Chat
  sendMessage: (conversationId: string, senderId: string, content: string) => void;
  startConversation: (participantIds: string[], type: 'direct' | 'group', name?: string) => string;

  // Mutators - Safety
  reportEntity: (report: Partial<Report>) => void;
  blockUser: (userId: string, targetId: string) => void;

  // Mutators - Admin
  verifyStudent: (userId: string) => void;
  suspendStudent: (userId: string) => void;
  resolveReport: (reportId: string, status: 'resolved' | 'dismissed') => void;
  deleteEvent: (eventId: string) => void;
  createEvent: (event: Partial<Event>) => void;
  deleteClub: (clubId: string) => void;
  createClub: (club: Partial<Club>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profiles: mockProfiles,
      clubs: mockClubs,
      clubApplications: [],
      events: mockEvents,
      studyGroups: mockStudyGroups,
      teams: mockTeams,
      conversations: mockConversations,
      messages: mockMessages,
      notifications: mockNotifications,
      reports: mockReports,
      blockedUserIds: [],

      // Study Groups
      createStudyGroup: (group) => {
        const newGroup: StudyGroup = {
          id: 'sg_' + Date.now(),
          name: group.name || 'Untitled Group',
          subject: group.subject || 'DSA',
          description: group.description || '',
          creatorId: group.creatorId || '',
          memberIds: [group.creatorId || ''],
          maxMembers: group.maxMembers || 5,
          schedule: group.schedule || 'Flexible',
          isOpen: true,
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          studyGroups: [newGroup, ...state.studyGroups]
        }));
      },

      joinStudyGroup: (groupId, userId) => {
        set((state) => ({
          studyGroups: state.studyGroups.map((g) => {
            if (g.id === groupId && !g.memberIds.includes(userId) && g.memberIds.length < g.maxMembers) {
              const updatedMembers = [...g.memberIds, userId];
              return { ...g, memberIds: updatedMembers, isOpen: updatedMembers.length < g.maxMembers };
            }
            return g;
          })
        }));
      },

      leaveStudyGroup: (groupId, userId) => {
        set((state) => ({
          studyGroups: state.studyGroups.map((g) => {
            if (g.id === groupId) {
              const updatedMembers = g.memberIds.filter((m) => m !== userId);
              return { ...g, memberIds: updatedMembers, isOpen: true };
            }
            return g;
          })
        }));
      },

      // Teams
      createTeam: (team) => {
        const newTeam: Team = {
          id: 't_' + Date.now(),
          name: team.name || 'New Team',
          hackathonName: team.hackathonName || 'General',
          description: team.description || '',
          leaderId: team.leaderId || '',
          memberIds: [team.leaderId || ''],
          openRoles: team.openRoles || [],
          requiredSkills: team.requiredSkills || [],
          status: 'forming',
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          teams: [newTeam, ...state.teams]
        }));
      },

      joinTeam: (teamId, userId) => {
        set((state) => ({
          teams: state.teams.map((t) => {
            if (t.id === teamId && !t.memberIds.includes(userId)) {
              return { ...t, memberIds: [...t.memberIds, userId] };
            }
            return t;
          })
        }));
      },

      applyToRole: (teamId, role, userId) => {
        set((state) => {
          const updatedTeams = state.teams.map((t) => {
            if (t.id === teamId) {
              const isMember = t.memberIds.includes(userId);
              const remainingRoles = t.openRoles.filter((r) => r !== role);
              const members = isMember ? t.memberIds : [...t.memberIds, userId];
              return {
                ...t,
                memberIds: members,
                openRoles: remainingRoles,
                status: remainingRoles.length === 0 ? 'complete' : 'forming' as any
              };
            }
            return t;
          });
          
          // Send notification to team leader
          const targetTeam = state.teams.find(t => t.id === teamId);
          const applicant = state.profiles.find(p => p.userId === userId);
          const newNotifications = [...state.notifications];
          if (targetTeam && applicant) {
            newNotifications.unshift({
              id: 'n_' + Date.now(),
              userId: targetTeam.leaderId,
              type: 'success',
              title: 'Teammate Joined',
              message: `${applicant.name} joined team ${targetTeam.name} as ${role}!`,
              isRead: false,
              createdAt: new Date().toISOString()
            });
          }

          return { teams: updatedTeams, notifications: newNotifications };
        });
      },

      // Clubs
      followClub: (clubId, userId) => {
        set((state) => ({
          clubs: state.clubs.map((c) => {
            if (c.id === clubId) {
              const isMember = c.memberIds.includes(userId);
              return {
                ...c,
                memberIds: isMember ? c.memberIds.filter((id) => id !== userId) : [...c.memberIds, userId]
              };
            }
            return c;
          })
        }));
      },

      applyToClub: (clubId, userId, reason) => {
        const newApp: ClubApplication = {
          id: 'app_' + Date.now(),
          clubId,
          userId,
          reason,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        set((state) => {
          const targetClub = state.clubs.find(c => c.id === clubId);
          const applicant = state.profiles.find(p => p.userId === userId);
          const updatedNotifs = [...state.notifications];
          if (targetClub && applicant) {
            updatedNotifs.unshift({
              id: 'n_' + Date.now(),
              userId: targetClub.leaderId,
              type: 'info',
              title: 'Club Application',
              message: `${applicant.name} applied to join ${targetClub.name}.`,
              isRead: false,
              createdAt: new Date().toISOString()
            });
          }
          return {
            clubApplications: [newApp, ...state.clubApplications],
            notifications: updatedNotifs
          };
        });
      },

      approveClubApplication: (applicationId) => {
        set((state) => {
          const application = state.clubApplications.find(a => a.id === applicationId);
          if (!application) return {};

          const updatedClubs = state.clubs.map((c) => {
            if (c.id === application.clubId && !c.memberIds.includes(application.userId)) {
              return { ...c, memberIds: [...c.memberIds, application.userId] };
            }
            return c;
          });

          const updatedNotifs = [
            {
              id: 'n_' + Date.now(),
              userId: application.userId,
              type: 'success',
              title: 'Club Membership Approved',
              message: `Congratulations! Your membership request has been approved.`,
              isRead: false,
              createdAt: new Date().toISOString()
            },
            ...state.notifications
          ];

          return {
            clubApplications: state.clubApplications.map(a => a.id === applicationId ? { ...a, status: 'approved' } : a),
            clubs: updatedClubs,
            notifications: updatedNotifs
          };
        });
      },

      rejectClubApplication: (applicationId) => {
        set((state) => {
          const application = state.clubApplications.find(a => a.id === applicationId);
          if (!application) return {};

          return {
            clubApplications: state.clubApplications.map(a => a.id === applicationId ? { ...a, status: 'rejected' } : a),
            notifications: [
              {
                id: 'n_' + Date.now(),
                userId: application.userId,
                type: 'warning',
                title: 'Club Membership Update',
                message: `Your membership application was not approved this time.`,
                isRead: false,
                createdAt: new Date().toISOString()
              },
              ...state.notifications
            ]
          };
        });
      },

      // Events
      registerForEvent: (eventId, userId) => {
        set((state) => {
          const updatedEvents = state.events.map((e) => {
            if (e.id === eventId && !e.registeredIds.includes(userId)) {
              return { ...e, registeredIds: [...e.registeredIds, userId] };
            }
            return e;
          });
          
          const event = state.events.find(e => e.id === eventId);
          const updatedNotifs = [...state.notifications];
          if (event) {
            updatedNotifs.unshift({
              id: 'n_' + Date.now(),
              userId,
              type: 'success',
              title: 'Event Registered',
              message: `Successfully registered for ${event.title}.`,
              isRead: false,
              createdAt: new Date().toISOString()
            });
          }

          return { events: updatedEvents, notifications: updatedNotifs };
        });
      },

      unregisterFromEvent: (eventId, userId) => {
        set((state) => ({
          events: state.events.map((e) => {
            if (e.id === eventId) {
              return { ...e, registeredIds: e.registeredIds.filter(id => id !== userId) };
            }
            return e;
          })
        }));
      },

      // Chat Messages
      sendMessage: (conversationId, senderId, content) => {
        const newMessage: Message = {
          id: 'm_' + Date.now(),
          conversationId,
          senderId,
          content,
          timestamp: new Date().toISOString(),
          readBy: [senderId]
        };
        set((state) => {
          const updatedConversations = state.conversations.map((c) => {
            if (c.id === conversationId) {
              return {
                ...c,
                lastMessage: content,
                lastMessageTime: newMessage.timestamp
              };
            }
            return c;
          });
          return {
            messages: [...state.messages, newMessage],
            conversations: updatedConversations
          };
        });
      },

      startConversation: (participantIds, type, name) => {
        const conversations = get().conversations;
        
        // If DM, check if it already exists
        if (type === 'direct') {
          const existing = conversations.find(
            (c) =>
              c.type === 'direct' &&
              c.participantIds.includes(participantIds[0]) &&
              c.participantIds.includes(participantIds[1])
          );
          if (existing) return existing.id;
        }

        const newId = 'c_' + Date.now();
        const newConv: ChatConversation = {
          id: newId,
          type,
          participantIds,
          name,
          lastMessage: 'Conversation started',
          lastMessageTime: new Date().toISOString()
        };

        set((state) => ({
          conversations: [newConv, ...state.conversations]
        }));

        return newId;
      },

      // Safety
      reportEntity: (report) => {
        const newReport: Report = {
          id: 'r_' + Date.now(),
          reporterId: report.reporterId || '',
          targetId: report.targetId || '',
          targetType: report.targetType || 'user',
          reason: report.reason || 'General',
          description: report.description || '',
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          reports: [newReport, ...state.reports]
        }));
      },

      blockUser: (userId, targetId) => {
        set((state) => ({
          blockedUserIds: [...state.blockedUserIds, targetId]
        }));
      },

      // Admin actions
      verifyStudent: (userId) => {
        // Find profile and user
        set((state) => {
          const updatedProfiles = state.profiles.map((p) => {
            if (p.userId === userId) {
              // Trigger notification to user
              return p;
            }
            return p;
          });
          
          const updatedNotifs = [
            {
              id: 'n_' + Date.now(),
              userId,
              type: 'success',
              title: 'Verification Complete',
              message: 'Your student identity has been verified! You now have a verified badge.',
              isRead: false,
              createdAt: new Date().toISOString()
            },
            ...state.notifications
          ];

          return {
            profiles: updatedProfiles,
            notifications: updatedNotifs
          };
        });
      },

      suspendStudent: (userId) => {
        set((state) => ({
          profiles: state.profiles.filter(p => p.userId !== userId)
        }));
      },

      resolveReport: (reportId, status) => {
        set((state) => ({
          reports: state.reports.map((r) => r.id === reportId ? { ...r, status } : r)
        }));
      },

      deleteEvent: (eventId) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== eventId)
        }));
      },

      createEvent: (eventData) => {
        const newEvent: Event = {
          id: 'e_' + Date.now(),
          title: eventData.title || 'Untitled Event',
          description: eventData.description || '',
          category: eventData.category || 'technical',
          date: eventData.date || new Date().toISOString(),
          endDate: eventData.endDate || new Date().toISOString(),
          venue: eventData.venue || 'TBD',
          organizer: eventData.organizer || 'CampusBuddy',
          clubId: eventData.clubId,
          banner: eventData.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
          registeredIds: [],
          maxCapacity: eventData.maxCapacity || 100
        };
        set((state) => ({
          events: [newEvent, ...state.events]
        }));
      },

      deleteClub: (clubId) => {
        set((state) => ({
          clubs: state.clubs.filter((c) => c.id !== clubId)
        }));
      },

      createClub: (clubData) => {
        const newClub: Club = {
          id: 'c_' + Date.now(),
          name: clubData.name || 'Untitled Club',
          description: clubData.description || '',
          category: clubData.category || 'technical',
          logo: clubData.logo || '👥',
          banner: clubData.banner || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
          leaderId: clubData.leaderId || 'admin',
          memberIds: [clubData.leaderId || 'admin'],
          isRecruiting: clubData.isRecruiting || false,
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          clubs: [newClub, ...state.clubs]
        }));
      }
    }),
    {
      name: 'campusbuddy-app-store'
    }
  )
);
