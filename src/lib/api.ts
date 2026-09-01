import {
  Event,
  Announcement,
  TeamMember,
  Project,
  Achievement,
  GalleryImage,
  JoinApplication,
  EventRegistration,
  ContactMessage,
  SiteStats,
  SiteSettings,
  Certificate,
  NewsletterSubscriber,
  NewsletterBroadcast,
  AttendanceRecord,
  LearningResource,
  AuditLog,
} from '../types';


const ADMIN_TOKEN_KEY = 'intelligenz_admin_token';
const ADMIN_USER_KEY = 'intelligenz_admin_user';

export const authStorage = {
  getToken: () => localStorage.getItem(ADMIN_TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(ADMIN_TOKEN_KEY, token),
  clearToken: () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
  },
  getUser: () => {
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  setUser: (user: any) => localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user)),
  isAuthenticated: () => !!localStorage.getItem(ADMIN_TOKEN_KEY),
};

function authHeaders(): Record<string, string> {
  const token = authStorage.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const api = {
  // Public API
  getSettings: async (): Promise<SiteSettings> => {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to load settings');
    return res.json();
  },

  getStats: async (): Promise<SiteStats> => {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Failed to load stats');
    return res.json();
  },

  getEvents: async (params?: { category?: string; status?: string; featured?: boolean }): Promise<Event[]> => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.status) query.append('status', params.status);
    if (params?.featured) query.append('featured', 'true');
    const res = await fetch(`/api/events?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to load events');
    return res.json();
  },

  getEventBySlug: async (slug: string): Promise<Event> => {
    const res = await fetch(`/api/events/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error('Event not found');
    return res.json();
  },

  registerForEvent: async (eventId: string, data: {
    full_name: string;
    email: string;
    phone?: string;
    department: string;
    year: string;
    roll_number: string;
  }): Promise<{ success: boolean; message: string; registration: EventRegistration }> => {
    const res = await fetch(`/api/events/${encodeURIComponent(eventId)}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Registration failed');
    return result;
  },

  getAnnouncements: async (params?: { category?: string; featured?: boolean }): Promise<Announcement[]> => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.featured) query.append('featured', 'true');
    const res = await fetch(`/api/announcements?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to load announcements');
    return res.json();
  },

  getAnnouncementBySlug: async (slug: string): Promise<Announcement> => {
    const res = await fetch(`/api/announcements/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error('Announcement not found');
    return res.json();
  },

  getTeam: async (): Promise<TeamMember[]> => {
    const res = await fetch('/api/team');
    if (!res.ok) throw new Error('Failed to load team members');
    return res.json();
  },

  getProjects: async (category?: string): Promise<Project[]> => {
    const url = category && category !== 'All' ? `/api/projects?category=${encodeURIComponent(category)}` : '/api/projects';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load projects');
    return res.json();
  },

  getAchievements: async (): Promise<Achievement[]> => {
    const res = await fetch('/api/achievements');
    if (!res.ok) throw new Error('Failed to load achievements');
    return res.json();
  },

  getGallery: async (album?: string): Promise<GalleryImage[]> => {
    const url = album && album !== 'All' ? `/api/gallery?album=${encodeURIComponent(album)}` : '/api/gallery';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load gallery');
    return res.json();
  },

  submitJoinApplication: async (data: Partial<JoinApplication>): Promise<{ success: boolean; message: string; application_id: string; application?: JoinApplication }> => {
    const res = await fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to submit application');
    return result;
  },

  submitApplication: async (data: Partial<JoinApplication>): Promise<{ success: boolean; message: string; application_id: string; application?: JoinApplication }> => {
    const res = await fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to submit application');
    return result;
  },

  submitContactMessage: async (data: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean; message: string }> => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to send message');
    return result;
  },

  search: async (query: string): Promise<{ events: Event[]; announcements: Announcement[]; projects: Project[] }> => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },

  // Auth
  login: async (credentials: { identifier?: string; username?: string; email?: string; password: string }) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid administrator credentials.');
    authStorage.setToken(data.token);
    authStorage.setUser(data.user);
    return data;
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: authHeaders(),
      });
    } catch {
      // Ignore network errors on signout
    }
    authStorage.clearToken();
  },

  verifyAuth: async () => {
    try {
      const res = await fetch('/api/auth/verify', {
        headers: authHeaders(),
      });
      if (!res.ok) {
        authStorage.clearToken();
        return false;
      }
      const data = await res.json();
      if (data.valid && data.user) {
        authStorage.setUser(data.user);
        return true;
      }
      authStorage.clearToken();
      return false;
    } catch {
      return false;
    }
  },

  // Admin Whitelist & Access Control Management (Super Admin)
  adminGetAdmins: async () => {
    const res = await fetch('/api/admin/admins', { headers: authHeaders() });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to fetch administrators list' }));
      throw new Error(err.error || 'Failed to fetch administrators list');
    }
    return res.json();
  },

  adminCreateAdmin: async (data: {
    name: string;
    username: string;
    email: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
    password?: string;
    temporaryPassword?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'REVOKED';
  }) => {
    const res = await fetch('/api/admin/admins', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create administrator');
    return result;
  },

  adminUpdateAdmin: async (
    id: string,
    data: {
      name?: string;
      username?: string;
      email?: string;
      role?: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
      status?: 'ACTIVE' | 'INACTIVE' | 'REVOKED';
    }
  ) => {
    const res = await fetch(`/api/admin/admins/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update administrator');
    return result;
  },

  adminSetAdminPassword: async (id: string, password: string) => {
    const res = await fetch(`/api/admin/admins/${encodeURIComponent(id)}/password`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ password, newPassword: password }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to set administrator password');
    return result;
  },

  adminResetAdminPassword: async (id: string, password?: string) => {
    const res = await fetch(`/api/admin/admins/${encodeURIComponent(id)}/password`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ password, newPassword: password }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to reset administrator password');
    return result;
  },

  adminUpdateAdminStatus: async (id: string, status: 'ACTIVE' | 'INACTIVE' | 'REVOKED') => {
    const res = await fetch(`/api/admin/admins/${encodeURIComponent(id)}/status`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update administrator status');
    return result;
  },

  adminDeleteAdmin: async (id: string) => {
    const res = await fetch(`/api/admin/admins/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete administrator');
    return result;
  },

  // Admin Profile & Security
  adminGetProfile: async () => {
    const res = await fetch('/api/admin/profile', { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to load admin profile');
    return res.json();
  },

  adminUpdateProfile: async (data: { email?: string; username?: string }) => {
    const res = await fetch('/api/admin/profile', {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update profile');
    if (result.user) {
      authStorage.setUser(result.user);
    }
    return result;
  },

  adminChangePassword: async (data: { currentPassword?: string; newPassword: string }) => {
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to change password');
    return result;
  },

  // Admin APIs
  getAdminOverview: async () => {
    const res = await fetch('/api/admin/overview', { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to fetch admin overview');
    return res.json();
  },

  adminCreateEvent: async (eventData: Partial<Event>) => {
    const res = await fetch('/api/admin/events', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error('Failed to create event');
    return res.json();
  },

  adminUpdateEvent: async (id: string, eventData: Partial<Event>) => {
    const res = await fetch(`/api/admin/events/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error('Failed to update event');
    return res.json();
  },

  adminDuplicateEvent: async (id: string) => {
    const res = await fetch(`/api/admin/events/${encodeURIComponent(id)}/duplicate`, {
      method: 'POST',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to duplicate event');
    return res.json();
  },

  adminDeleteEvent: async (id: string) => {
    const res = await fetch(`/api/admin/events/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete event');
    return res.json();
  },

  adminCreateAnnouncement: async (data: Partial<Announcement>) => {
    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create announcement');
    return res.json();
  },

  adminUpdateAnnouncement: async (id: string, data: Partial<Announcement>) => {
    const res = await fetch(`/api/admin/announcements/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update announcement');
    return res.json();
  },

  adminDeleteAnnouncement: async (id: string) => {
    const res = await fetch(`/api/admin/announcements/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete announcement');
    return res.json();
  },

  adminGetApplications: async (): Promise<JoinApplication[]> => {
    const res = await fetch('/api/admin/join-applications', { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to load applications');
    return res.json();
  },

  adminUpdateApplicationStatus: async (id: string, status: string, reviewer_notes?: string) => {
    const res = await fetch(`/api/admin/join-applications/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status, reviewer_notes }),
    });
    if (!res.ok) throw new Error('Failed to update application');
    return res.json();
  },

  adminDeleteApplication: async (id: string) => {
    const res = await fetch(`/api/admin/join-applications/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete application');
    return res.json();
  },

  adminGetRegistrations: async (eventId?: string): Promise<EventRegistration[]> => {
    const url = eventId ? `/api/admin/registrations?event_id=${encodeURIComponent(eventId)}` : '/api/admin/registrations';
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to load registrations');
    return res.json();
  },

  adminUpdateRegistrationStatus: async (id: string, status: string) => {
    const res = await fetch(`/api/admin/registrations/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update registration');
    return res.json();
  },

  adminDeleteRegistration: async (id: string) => {
    const res = await fetch(`/api/admin/registrations/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete registration');
    return res.json();
  },

  adminGetMessages: async (): Promise<ContactMessage[]> => {
    const res = await fetch('/api/admin/messages', { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to load messages');
    return res.json();
  },

  adminUpdateMessage: async (id: string, data: { is_read?: boolean; responded?: boolean }) => {
    const res = await fetch(`/api/admin/messages/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update message');
    return res.json();
  },

  adminDeleteMessage: async (id: string) => {
    const res = await fetch(`/api/admin/messages/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete message');
    return res.json();
  },

  adminCreateTeamMember: async (data: Partial<TeamMember>) => {
    const res = await fetch('/api/admin/team', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create team member');
    return res.json();
  },

  adminUpdateTeamMember: async (id: string, data: Partial<TeamMember>) => {
    const res = await fetch(`/api/admin/team/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update team member');
    return res.json();
  },

  adminDeleteTeamMember: async (id: string) => {
    const res = await fetch(`/api/admin/team/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete team member');
    return res.json();
  },

  adminCreateProject: async (data: Partial<Project>) => {
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  },

  adminUpdateProject: async (id: string, data: Partial<Project>) => {
    const res = await fetch(`/api/admin/projects/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  },

  adminDeleteProject: async (id: string) => {
    const res = await fetch(`/api/admin/projects/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  },

  adminCreateAchievement: async (data: Partial<Achievement>) => {
    const res = await fetch('/api/admin/achievements', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create achievement');
    return res.json();
  },

  adminUpdateAchievement: async (id: string, data: Partial<Achievement>) => {
    const res = await fetch(`/api/admin/achievements/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update achievement');
    return res.json();
  },

  adminDeleteAchievement: async (id: string) => {
    const res = await fetch(`/api/admin/achievements/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete achievement');
    return res.json();
  },

  adminCreateGalleryItem: async (data: Partial<GalleryImage>) => {
    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to add gallery item');
    return res.json();
  },

  adminUpdateGalleryItem: async (id: string, data: Partial<GalleryImage>) => {
    const res = await fetch(`/api/admin/gallery/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update gallery item');
    return res.json();
  },

  adminDeleteGalleryItem: async (id: string) => {
    const res = await fetch(`/api/admin/gallery/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete gallery item');
    return res.json();
  },

  adminUpdateStats: async (stats: Partial<SiteStats>) => {
    const res = await fetch('/api/admin/stats', {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(stats),
    });
    if (!res.ok) throw new Error('Failed to update stats');
    return res.json();
  },

  adminUpdateSettings: async (settings: Partial<SiteSettings>) => {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  getSupabaseSchemaSql: async (): Promise<string> => {
    const res = await fetch('/api/export-supabase-sql');
    if (!res.ok) throw new Error('Failed to fetch SQL');
    return res.text();
  },

  getSupabaseSchema: async (): Promise<{ schema: string }> => {
    const res = await fetch('/api/export-supabase-sql');
    if (!res.ok) throw new Error('Failed to fetch SQL');
    const text = await res.text();
    return { schema: text };
  },

  // Aliases for admin actions
  adminLogin: async (credentials: { identifier?: string; username?: string; email?: string; password: string } | string, maybePassword?: string) => {
    if (typeof credentials === 'string') {
      return api.login({ identifier: credentials, username: credentials, password: maybePassword || '' });
    }
    return api.login(credentials);
  },

  adminLogout: () => {
    authStorage.clearToken();
  },

  getAdminProfile: async () => {
    return api.adminGetProfile();
  },

  updateAdminProfile: async (data: { email?: string; username?: string; name?: string }) => {
    return api.adminUpdateProfile(data);
  },

  changeAdminPassword: async (data: { current_password?: string; currentPassword?: string; new_password?: string; newPassword?: string }) => {
    return api.adminChangePassword({
      currentPassword: data.currentPassword || data.current_password || '',
      newPassword: data.newPassword || data.new_password || '',
    });
  },

  getOverviewStats: async () => {
    return api.getAdminOverview();
  },

  getApplications: async () => {
    return api.adminGetApplications();
  },

  deleteApplication: async (id: string) => {
    return api.adminDeleteApplication(id);
  },

  getRegistrations: async (eventId?: string) => {
    return api.adminGetRegistrations(eventId);
  },

  updateRegistrationStatus: async (id: string, status: string) => {
    return api.adminUpdateRegistrationStatus(id, status);
  },

  deleteRegistration: async (id: string) => {
    return api.adminDeleteRegistration(id);
  },

  getMessages: async () => {
    return api.adminGetMessages();
  },

  updateMessageStatus: async (id: string, is_read: boolean, is_responded?: boolean) => {
    return api.adminUpdateMessage(id, { is_read, responded: is_responded });
  },

  deleteMessage: async (id: string) => {
    return api.adminDeleteMessage(id);
  },

  createProject: async (data: Partial<Project>) => {
    return api.adminCreateProject(data);
  },

  updateProject: async (id: string, data: Partial<Project>) => {
    return api.adminUpdateProject(id, data);
  },

  deleteProject: async (id: string) => {
    return api.adminDeleteProject(id);
  },

  createTeamMember: async (data: Partial<TeamMember>) => {
    return api.adminCreateTeamMember(data);
  },

  updateTeamMember: async (id: string, data: Partial<TeamMember>) => {
    return api.adminUpdateTeamMember(id, data);
  },

  deleteTeamMember: async (id: string) => {
    return api.adminDeleteTeamMember(id);
  },

  createAchievement: async (data: Partial<Achievement>) => {
    return api.adminCreateAchievement(data);
  },

  updateAchievement: async (id: string, data: Partial<Achievement>) => {
    return api.adminUpdateAchievement(id, data);
  },

  deleteAchievement: async (id: string) => {
    return api.adminDeleteAchievement(id);
  },

  createGalleryItem: async (data: Partial<GalleryImage>) => {
    return api.adminCreateGalleryItem(data);
  },

  updateGalleryItem: async (id: string, data: Partial<GalleryImage>) => {
    return api.adminUpdateGalleryItem(id, data);
  },

  deleteGalleryItem: async (id: string) => {
    return api.adminDeleteGalleryItem(id);
  },

  createEvent: async (eventData: Partial<Event>) => {
    return api.adminCreateEvent(eventData);
  },

  updateEvent: async (id: string, eventData: Partial<Event>) => {
    return api.adminUpdateEvent(id, eventData);
  },

  duplicateEvent: async (id: string) => {
    return api.adminDuplicateEvent(id);
  },

  deleteEvent: async (id: string) => {
    return api.adminDeleteEvent(id);
  },

  createAnnouncement: async (data: Partial<Announcement>) => {
    return api.adminCreateAnnouncement(data);
  },

  updateAnnouncement: async (id: string, data: Partial<Announcement>) => {
    return api.adminUpdateAnnouncement(id, data);
  },

  deleteAnnouncement: async (id: string) => {
    return api.adminDeleteAnnouncement(id);
  },

  updateApplicationStatus: async (id: string, status: any, notes?: string) => {
    return api.adminUpdateApplicationStatus(id, status, notes);
  },

  updateStats: async (stats: Partial<SiteStats>) => {
    return api.adminUpdateStats(stats);
  },

  updateSettings: async (settings: Partial<SiteSettings>) => {
    return api.adminUpdateSettings(settings);
  },

  // ==========================================
  // NEWSLETTER (Public & Admin)
  // ==========================================
  subscribeNewsletter: async (data: { email: string; name?: string; department?: string; source?: string }): Promise<{ success: boolean; message: string; subscriber?: NewsletterSubscriber }> => {
    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to subscribe to newsletter');
    return result;
  },

  adminGetNewsletterSubscribers: async (): Promise<NewsletterSubscriber[]> => {
    const res = await fetch('/api/admin/newsletter/subscribers', { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to load subscribers');
    return res.json();
  },

  adminDeleteNewsletterSubscriber: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`/api/admin/newsletter/subscribers/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete subscriber');
    return res.json();
  },

  adminGetNewsletterBroadcasts: async (): Promise<NewsletterBroadcast[]> => {
    const res = await fetch('/api/admin/newsletter/broadcasts', { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to load broadcasts');
    return res.json();
  },

  adminSendNewsletterBroadcast: async (data: { subject: string; message: string; target?: string }): Promise<{ success: boolean; message: string; broadcast: NewsletterBroadcast }> => {
    const res = await fetch('/api/admin/newsletter/broadcast', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to send broadcast');
    return result;
  },

  // ==========================================
  // CERTIFICATES (Public & Admin)
  // ==========================================
  getCertificates: async (q?: string): Promise<Certificate[]> => {
    const url = q ? `/api/certificates?q=${encodeURIComponent(q)}` : '/api/certificates';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load certificates');
    return res.json();
  },

  verifyCertificate: async (code: string): Promise<{ valid: boolean; certificate?: Certificate; verification_time: string; verified_by: string; error?: string }> => {
    const res = await fetch(`/api/certificates/verify/${encodeURIComponent(code)}`);
    const result = await res.json();
    if (!res.ok && !result.error) throw new Error('Failed to verify certificate');
    return result;
  },

  adminGetCertificates: async (): Promise<Certificate[]> => {
    const res = await fetch('/api/admin/certificates', { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to load certificates');
    return res.json();
  },

  adminCreateCertificate: async (data: Partial<Certificate>): Promise<Certificate> => {
    const res = await fetch('/api/admin/certificates', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create certificate');
    return result;
  },

  adminBatchCreateCertificates: async (data: {
    event_id?: string;
    event_title: string;
    certificate_type: string;
    issue_date: string;
    issued_by?: string;
    designation?: string;
    students: Array<{ student_name: string; student_roll_no: string; student_email: string; department?: string; notes?: string }>;
  }): Promise<{ success: boolean; message: string; certificates: Certificate[] }> => {
    const res = await fetch('/api/admin/certificates/batch', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to batch generate certificates');
    return result;
  },

  adminUpdateCertificate: async (id: string, data: Partial<Certificate>): Promise<Certificate> => {
    const res = await fetch(`/api/admin/certificates/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update certificate');
    return result;
  },

  adminDeleteCertificate: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`/api/admin/certificates/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete certificate');
    return res.json();
  },

  // ==========================================
  // ATTENDANCE & CHECK-IN (Admin)
  // ==========================================
  adminGetCheckins: async (eventId?: string): Promise<AttendanceRecord[]> => {
    const url = eventId ? `/api/admin/checkins?event_id=${encodeURIComponent(eventId)}` : '/api/admin/checkins';
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error('Failed to load check-ins');
    return res.json();
  },

  adminCheckinParticipant: async (data: {
    code?: string;
    event_id?: string;
    registration_id?: string;
    roll_number?: string;
    email?: string;
    method?: string;
  }): Promise<{ success: boolean; message: string; record: AttendanceRecord }> => {
    const res = await fetch('/api/admin/checkin', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Check-in failed');
    return result;
  },

  adminDeleteCheckin: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`/api/admin/checkins/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete check-in record');
    return res.json();
  },

  // ==========================================
  // LEARNING RESOURCES (Public & Admin)
  // ==========================================
  getResources: async (category?: string): Promise<LearningResource[]> => {
    const url = category && category !== 'All' ? `/api/resources?category=${encodeURIComponent(category)}` : '/api/resources';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load resources');
    return res.json();
  },

  adminCreateResource: async (data: Partial<LearningResource>): Promise<LearningResource> => {
    const res = await fetch('/api/admin/resources', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create resource');
    return result;
  },

  adminUpdateResource: async (id: string, data: Partial<LearningResource>): Promise<LearningResource> => {
    const res = await fetch(`/api/admin/resources/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update resource');
    return result;
  },

  adminDeleteResource: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`/api/admin/resources/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete resource');
    return res.json();
  },

  // ==========================================
  // AUDIT LOGS & DATABASE BACKUPS (Admin)
  // ==========================================
  adminGetAuditLogs: async (): Promise<AuditLog[]> => {
    const res = await fetch('/api/admin/audit-logs', {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to load audit logs');
    return res.json();
  },

  adminExportBackup: async (): Promise<any> => {
    const res = await fetch('/api/admin/backup/export', {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to export database backup');
    return res.json();
  },

  adminRestoreBackup: async (data: any): Promise<{ success: boolean; message: string }> => {
    const res = await fetch('/api/admin/backup/restore', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to restore database');
    return result;
  },
};

