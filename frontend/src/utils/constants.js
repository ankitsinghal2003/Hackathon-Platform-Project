// API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// App Info
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'HackFlow 2025';
export const APP_TAGLINE = import.meta.env.VITE_APP_TAGLINE || 'Where Innovation Meets Intelligence';

// Hackathon Dates
export const HACKATHON_START = import.meta.env.VITE_HACKATHON_START || '2025-03-01T00:00:00Z';
export const HACKATHON_END = import.meta.env.VITE_HACKATHON_END || '2025-03-03T23:59:59Z';

// Categories
export const CATEGORIES = [
  {
    id: 'ai-social-good',
    name: 'AI for Social Good',
    icon: '🤖',
    color: '#6366f1',
    description: 'Build AI solutions that address social challenges',
    prize: 5000,
  },
  {
    id: 'fintech',
    name: 'FinTech Revolution',
    icon: '💰',
    color: '#8b5cf6',
    description: 'Innovative financial technology solutions',
    prize: 4000,
  },
  {
    id: 'climate-tech',
    name: 'Climate Tech & Sustainability',
    icon: '🌍',
    color: '#10b981',
    description: 'Technology solutions for environmental challenges',
    prize: 4000,
  },
  {
    id: 'gaming',
    name: 'Gaming & Metaverse',
    icon: '🎮',
    color: '#ec4899',
    description: 'Next-gen gaming experiences and virtual worlds',
    prize: 3500,
  },
  {
    id: 'healthtech',
    name: 'HealthTech Innovation',
    icon: '🏥',
    color: '#f59e0b',
    description: 'Healthcare and wellness technology',
    prize: 4500,
  },
];

// User Roles
export const ROLES = {
  PARTICIPANT: 'participant',
  JUDGE: 'judge',
  ADMIN: 'admin',
};

// Submission Status
export const SUBMISSION_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  REVIEWED: 'reviewed',
};

// Team Size Limits
export const MIN_TEAM_SIZE = 1;
export const MAX_TEAM_SIZE = 4;

// File Upload Limits
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 5;
export const MAX_SCREENSHOTS = 10;

// Allowed File Types
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/zip',
  'application/x-rar-compressed',
];

// Evaluation Criteria
export const EVALUATION_CRITERIA = [
  {
    key: 'innovation',
    name: 'Innovation',
    description: 'Originality and creativity of the solution',
    weight: 25,
  },
  {
    key: 'technical',
    name: 'Technical Complexity',
    description: 'Technical implementation and sophistication',
    weight: 25,
  },
  {
    key: 'implementation',
    name: 'Implementation Quality',
    description: 'Code quality, completeness, and functionality',
    weight: 25,
  },
  {
    key: 'impact',
    name: 'Impact & Usefulness',
    description: 'Real-world applicability and potential impact',
    weight: 25,
  },
];

// Timeline Events
export const TIMELINE = [
  {
    title: 'Registration Opens',
    date: '2025-02-01',
    icon: '📝',
  },
  {
    title: 'Registration Closes',
    date: '2025-02-28',
    icon: '🚪',
  },
  {
    title: 'Hackathon Begins',
    date: '2025-03-01',
    icon: '🚀',
  },
  {
    title: 'Submission Deadline',
    date: '2025-03-03',
    icon: '⏰',
  },
  {
    title: 'Judging Period',
    date: '2025-03-04',
    icon: '⚖️',
  },
  {
    title: 'Results Announcement',
    date: '2025-03-06',
    icon: '🏆',
  },
];

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/hackflow2025',
  linkedin: 'https://linkedin.com/company/hackflow2025',
  discord: 'https://discord.gg/hackflow2025',
  github: 'https://github.com/hackflow2025',
};

// Contact
export const CONTACT_EMAIL = 'support@hackflow2025.com';

// Pagination
export const ITEMS_PER_PAGE = 10;