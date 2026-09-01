export type EventStatus =
  | 'Upcoming'
  | 'Registration Open'
  | 'Registration Closed'
  | 'Ongoing'
  | 'Completed'
  | 'Cancelled';

export type EventCategory =
  | 'Workshop'
  | 'Hackathon'
  | 'Seminar'
  | 'Coding Contest'
  | 'AI Bootcamp'
  | 'Orientation'
  | 'Tech Talk'
  | 'Technical Talk'
  | 'Project Expo'
  | 'Guest Lecture';

export interface EventWinner {
  position: string;
  name: string;
  team_name?: string;
  project_title?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  event_image: string;
  banner_image?: string;
  date: string;
  time?: string;
  start_time: string;
  end_time: string;
  venue: string;
  category: EventCategory;
  speaker?: string;
  speaker_bio?: string;
  speaker_avatar?: string;
  registration_url?: string;
  registration_deadline?: string;
  maximum_participants: number;
  current_participants: number;
  status: EventStatus;
  featured: boolean;
  highlights?: string[];
  photos?: string[];
  results?: string;
  winners?: EventWinner[];
  certificates_available?: boolean;
  created_at: string;
  updated_at: string;
}

export type AnnouncementCategory =
  | 'All'
  | 'Events'
  | 'Event'
  | 'Club News'
  | 'Achievements'
  | 'Recruitment'
  | 'Workshops'
  | 'Workshop'
  | 'Hackathon'
  | 'Opportunity'
  | 'General'
  | 'Important';

export interface Announcement {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  featured_image?: string;
  category: AnnouncementCategory;
  author: string;
  author_role: string;
  published_at: string;
  published_date?: string;
  pinned?: boolean;
  featured: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export type ApplicationStatus = 'New' | 'Reviewed' | 'Accepted' | 'Rejected';

export interface JoinApplication {
  id: string;
  full_name: string;
  college_email?: string;
  email?: string;
  phone: string;
  department: string;
  year: string;
  roll_number: string;
  technical_interests?: string[];
  interested_domains?: string[];
  skills?: string;
  why_join?: string;
  reason?: string;
  github_url?: string;
  linkedin_url?: string;
  agreed_updates?: boolean;
  status: 'New' | 'Reviewed' | 'Accepted' | 'Rejected' | 'Pending' | 'Shortlisted';
  reviewer_notes?: string;
  created_at: string;
}

export type Application = JoinApplication;

export interface EventRegistration {
  id: string;
  event_id: string;
  event_title?: string;
  full_name: string;
  participant_name?: string;
  email: string;
  phone?: string;
  college?: string;
  department: string;
  year: string;
  roll_number: string;
  status: 'Confirmed' | 'Waitlisted' | 'Cancelled';
  registered_at?: string;
  created_at: string;
}

export type Registration = EventRegistration;

export type TeamCategory = 
  | 'Faculty Coordinator' 
  | 'Club Lead' 
  | 'Vice Lead' 
  | 'Technical Team' 
  | 'Design Team' 
  | 'Management Team' 
  | 'Media Team' 
  | 'Event Team';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  role?: string;
  category: TeamCategory | string;
  department?: string;
  year?: string;
  bio: string;
  photo_url: string;
  image_url?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  social_links?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
    [key: string]: any;
  };
  featured: boolean;
  order: number;
  order_index?: number;
}

export type ProjectCategory =
  | 'AI'
  | 'Machine Learning'
  | 'Web Development'
  | 'App Development'
  | 'Robotics'
  | 'Research'
  | 'Computer Vision'
  | 'NLP & LLMs'
  | 'Generative AI'
  | 'Autonomous Systems'
  | 'Healthcare AI'
  | 'Full-Stack AI'
  | 'Other';

export interface Project {
  id: string;
  name: string;
  slug?: string;
  description: string;
  short_description?: string;
  category: ProjectCategory | string;
  tech_stack?: string[];
  technologies?: string[];
  team_members?: string[];
  github_url?: string;
  demo_url?: string;
  image_url: string;
  featured: boolean;
  status: 'Completed' | 'In Progress' | 'Prototype' | 'Active Development' | 'Production' | string;
  date?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  award_rank?: string;
  organization: string;
  members: string[];
  image_url?: string;
  featured: boolean;
  proof_link?: string;
  proof_url?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  album: string;
  event_name?: string;
  image_url: string;
  caption?: string;
  date: string;
  featured: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  responded?: boolean;
  is_responded?: boolean;
  created_at: string;
}

export interface SiteStats {
  students_reached?: string | number;
  students_impacted?: string | number;
  events_conducted?: string | number;
  projects_completed?: string | number;
  workshops_held?: string | number;
  active_members?: string | number;
  hackathon_wins?: string | number;
  awards_won?: string | number;
  [key: string]: any;
}

export interface SiteSettings {
  club_name: string;
  club_sub_name?: string;
  club_tagline?: string;
  department_name: string;
  college_name: string;
  tagline?: string;
  supporting_text?: string;
  official_email?: string;
  contact_email?: string;
  phone?: string;
  contact_phone?: string;
  campus_address?: string;
  contact_address?: string;
  instagram_url?: string;
  linkedin_url?: string;
  github_url?: string;
  social_links?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    discord?: string;
    [key: string]: any;
  };
  announcement_ticker?: string;
  is_recruitment_open: boolean;
  [key: string]: any;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'editor';
}

export type CertificateType =
  | 'Participation'
  | 'Merit'
  | 'Appreciation'
  | 'Club Membership'
  | 'Hackathon Winner'
  | 'Workshop Completion'
  | 'Winner'
  | 'Runner-up'
  | 'Speaker'
  | 'Coordinator'
  | string;

export interface Certificate {
  id: string;
  certificate_code: string;
  student_name: string;
  student_email: string;
  student_roll_no: string;
  department: string;
  college_name: string;
  event_id?: string;
  event_title: string;
  certificate_type: CertificateType;
  issue_date: string;
  issued_by: string;
  designation: string;
  is_valid: boolean;
  notes?: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  department?: string;
  subscribed_at: string;
  status: 'Active' | 'Unsubscribed';
  source?: string;
}

export interface NewsletterBroadcast {
  id: string;
  subject: string;
  message: string;
  target: 'All Subscribers' | 'Active Members' | 'Workshop Attendees';
  sent_at: string;
  recipient_count: number;
}

export interface AttendanceRecord {
  id: string;
  registration_id: string;
  event_id: string;
  event_title: string;
  participant_name: string;
  roll_number: string;
  email: string;
  department: string;
  checked_in_at: string;
  checkin_method: 'QR Code' | 'Code Entry' | 'Manual';
}

export interface LearningResource {
  id: string;
  title: string;
  slug?: string;
  category: 'Roadmaps' | 'AI Models & LLMs' | 'Computer Vision' | 'Prompt Engineering' | 'Python & Data Science' | 'Cloud & MLOps' | string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  duration?: string;
  url?: string;
  link_url?: string;
  format?: string;
  tags: string[];
  modules?: {
    title: string;
    description: string;
    resources: { title: string; url: string; type: 'doc' | 'video' | 'colab' | 'github' }[];
  }[];
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  admin_email: string;
  details: string;
  timestamp: string;
  ip_address?: string;
}

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN';
export type AdminStatus = 'ACTIVE' | 'INACTIVE';

export interface AdminAccount {
  id: string;
  name: string;
  username: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  must_change_password?: boolean;
  last_login?: string;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

