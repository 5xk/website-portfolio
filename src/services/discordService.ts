const DISCORD_USER_ID = import.meta.env.VITE_DISCORD_USER_ID;
const API_URL = `https://api.cee.bio/discord/user/${DISCORD_USER_ID}`;

export interface DiscordBadge {
  id: string;
  description: string;
  icon?: string;
  link?: string;
}

export interface NitroInfo {
  badge: string;
  next_badge: string;
  level: string;
  started_at: string;
  next_level_at: string;
  days_remaining: number;
  days_total: number;
  remaining_formatted?: string;
  total_formatted?: string;
  current_badge?: string;
  current_date?: string;
  next_badge_name?: string;
  next_date?: string;
}

export interface BoostInfo {
  badge: string;
  next_badge: string;
  level: string;
  started_at: string;
  next_level_at: string;
  days_remaining: number;
  days_total: number;
  remaining_formatted?: string;
  total_formatted?: string;
  current_level?: string;
  current_date?: string;
  next_level?: string;
  next_date?: string;
}

export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

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

export interface DiscordPresence {
  status: DiscordStatus;
  activities: DiscordActivity[];
  client_status?: {
    desktop?: DiscordStatus;
    mobile?: DiscordStatus;
    web?: DiscordStatus;
  };
}

export interface DiscordProfile {
  user: {
    id: string;
    username: string;
    global_name?: string;
    discriminator: string;
    avatar: string;
    avatar_decoration_data?: any;
    banner?: string;
    banner_color?: string;
    bio?: string;
    accent_color?: number;
    public_flags?: number;
    flags?: number;
    created_at?: number;
    avatar_url?: string;
    primary_guild?: {
      identity_guild_id: string;
      identity_enabled: boolean;
      tag: string;
      badge: string;
    };
    clan?: {
      identity_guild_id: string;
      identity_enabled: boolean;
      tag: string;
      badge: string;
    };
  };
  badges?: DiscordBadge[];
  guild_badges?: DiscordBadge[];
  nitro?: NitroInfo;
  boost?: BoostInfo;
  connected_accounts?: Array<{
    type: string;
    id: string;
    name: string;
    verified: boolean;
  }>;
  premium_since?: string;
  premium_type?: number;
  premium_guild_since?: string;
  user_profile?: {
    bio?: string;
    accent_color?: number;
    pronouns?: string;
    profile_effect?: any;
    banner?: string;
    theme_colors?: number[];
    popout_animation_particle_type?: any;
    emoji?: any;
  };
  presence?: DiscordPresence;
}

export interface ProcessedBadge {
  id: string;
  name: string;
  icon: string;
  alt: string;
}


const mapActivity = (act: any): DiscordActivity => ({
  name: act.name,
  type: act.type,
  state: act.state || undefined,
  details: act.details || undefined,
  application_id: act.applicationId || undefined,
  timestamps: act.startTimestamp ? {
    start: act.startTimestamp,
    end: act.endTimestamp || undefined,
  } : undefined,
  assets: act.assets ? {
    large_image: act.assets.largeImageURL || undefined,
    large_text: act.assets.largeText || undefined,
    small_image: act.assets.smallImageURL || undefined,
    small_text: act.assets.smallText || undefined,
  } : undefined,
});

export const fetchDiscordProfile = async (): Promise<DiscordProfile> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  const data = json.data;

  const profile: DiscordProfile = {
    user: {
      id: data.user.id,
      username: data.user.username,
      global_name: data.user.global_name,
      discriminator: data.user.discriminator,
      avatar: data.user.avatar,
      avatar_decoration_data: data.user.avatar_decoration_data,
      banner: data.user.banner,
      banner_color: data.user.banner_color,
      bio: data.user.bio || data.user_profile?.bio,
      accent_color: data.user.accent_color || data.user_profile?.accent_color,
      public_flags: data.user.public_flags,
      flags: data.user.flags,
      created_at: data.user.created_at,
      avatar_url: data.user.avatar_url,
      primary_guild: data.user.primary_guild,
      clan: data.user.clan,
    },
    badges: data.badges || [],
    guild_badges: data.guild_badges || [],
    nitro: data.nitro ? (() => {
      const getNitroBadgeUrl = (badgeName: string) => {
        if (!badgeName) return '';
        const badgeType = badgeName.replace('nitro_', '');
        if (badgeType === 'nitro') return 'https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png';
        return `https://ik.imagekit.io/xys3wb0qo/badges/${badgeType}.png`;
      };

      const calcDays = (currentDate: string, nextDate: string) => {
        if (!currentDate || !nextDate) return { remaining: 0, total: 0 };
        const now = new Date();
        const next = new Date(nextDate);
        const current = new Date(currentDate);
        return {
          remaining: Math.max(0, Math.floor((next.getTime() - now.getTime()) / 86400000)),
          total: Math.max(1, Math.floor((next.getTime() - current.getTime()) / 86400000)),
        };
      };

      const days = calcDays(data.nitro.current_date, data.nitro.next_date);

      return {
        badge: getNitroBadgeUrl(data.nitro.current_badge),
        next_badge: getNitroBadgeUrl(data.nitro.next_badge),
        level: data.nitro.current_badge || '',
        started_at: data.nitro.current_date || '',
        next_level_at: data.nitro.next_date || '',
        days_remaining: days.remaining,
        days_total: days.total,
        current_badge: data.nitro.current_badge,
        current_date: data.nitro.current_date,
        next_badge_name: data.nitro.next_badge,
        next_date: data.nitro.next_date,
      };
    })() : undefined,
    boost: data.boost ? (() => {
      const getBoostBadgeUrl = (levelName: string) => {
        if (!levelName) return '';
        const level = levelName.replace('guild_booster_lvl', '');
        return `https://ik.imagekit.io/xys3wb0qo/boosts/discordboost${level}.svg`;
      };

      const calcDays = (currentDate: string, nextDate: string) => {
        if (!currentDate || !nextDate) return { remaining: 0, total: 0 };
        const now = new Date();
        const next = new Date(nextDate);
        const current = new Date(currentDate);
        return {
          remaining: Math.max(0, Math.floor((next.getTime() - now.getTime()) / 86400000)),
          total: Math.max(1, Math.floor((next.getTime() - current.getTime()) / 86400000)),
        };
      };

      const days = calcDays(data.boost.current_date, data.boost.next_date);

      return {
        badge: getBoostBadgeUrl(data.boost.current_level),
        next_badge: getBoostBadgeUrl(data.boost.next_level),
        level: data.boost.current_level || '',
        started_at: data.boost.current_date || '',
        next_level_at: data.boost.next_date || '',
        days_remaining: days.remaining,
        days_total: days.total,
        current_level: data.boost.current_level,
        current_date: data.boost.current_date,
        next_level: data.boost.next_level,
        next_date: data.boost.next_date,
      };
    })() : undefined,
    connected_accounts: data.connected_accounts || [],
    premium_since: data.premium_since,
    premium_type: data.premium_type,
    premium_guild_since: data.premium_guild_since,
    user_profile: data.user_profile,
    presence: data.presence ? {
      status: data.presence.status as DiscordStatus,
      activities: (data.presence.activities || []).map(mapActivity),
      client_status: data.presence.clientStatus,
    } : undefined,
  };

  return profile;
};

const getBadgeIconUrl = (iconHash: string): string => {
  return `https://cdn.discordapp.com/badge-icons/${iconHash}.png`;
};

export const getDiscordBadges = (badges?: DiscordBadge[]): ProcessedBadge[] => {
  if (!badges || badges.length === 0) return [];

  return badges.map((badge) => ({
    id: badge.id,
    name: badge.description || badge.id,
    icon: badge.icon ? getBadgeIconUrl(badge.icon) : '',
    alt: badge.description || badge.id
  }));
};

export const getStatusIcon = (status?: DiscordStatus): string => {
  const statusIcons: Record<DiscordStatus, string> = {
    online: 'https://cdn3.emoji.gg/emojis/6053-online.png',
    idle: 'https://cdn3.emoji.gg/emojis/6054-idle.png',
    dnd: 'https://ik.imagekit.io/4n3hscd51et/dndIcon_b40EnR7HU_2__i-p4PWgqR.png',
    offline: 'https://ik.imagekit.io/4n3hscd51et/offlineIcon_vX0M6WlhB_1__Y04pSWRK6.png'
  };

  return statusIcons[status || 'offline'];
};

export const getStatusText = (status?: DiscordStatus): string => {
  const statusTexts: Record<DiscordStatus, string> = {
    online: 'Online',
    idle: 'Ausente',
    dnd: 'Ocupado',
    offline: 'Offline'
  };

  return statusTexts[status || 'offline'];
};

