export interface User {
  id: string;
  email?: string;
  username: string;
  displayName?: string;
  avatar?: string;
  discordId?: string;
  isAdmin?: boolean;
  isPremium?: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Ticket {
  id: string;
  userId: string | {
    _id: string;
    username: string;
    displayName?: string;
    avatar?: string;
    isAdmin?: boolean;
  };
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  attachments?: Attachment[];
  createdAt: Date;
  isStaff: boolean;
}

export interface Attachment {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'file';
  size: number;
  mimeType: string;
  duration?: number; // For audio/video
  thumbnail?: string; // For video
}

export interface Icon {
  id: string;
  _id?: string;
  name: string;
  url: string;
  category: IconCategory;
  subcategory: IconSubcategory;
  type: 'static' | 'gif';
  uploadedBy: string | any;
  uploaderName: string;
  tags: string[];
  downloads: number;
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: Date;
}

export type IconCategory = 'girl' | 'boy';

export type IconSubcategory = 'grunge' | 'no face' | 'animes' | 'asian' | 'gifs';

export interface ToolFunction {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'dm' | 'server' | 'utility';
  isPremium: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Discord Types
export interface DiscordUserData {
  username: string;
  avatar: string | null;
  avatar_url: string | null;
  badges: any[];
  presence?: DiscordPresence;
  spotify?: SpotifyData;
}

export interface SpotifyData {
  track_id?: string;
  song?: string;
  artist?: string;
  album?: string;
  album_art_url?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
}

export interface DiscordPresence {
  status: string;
  activities: DiscordActivity[];
}

export interface DiscordActivity {
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
}