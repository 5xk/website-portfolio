import { useState, useRef } from "react";
import type { MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Globe } from "lucide-react";
import { Badge } from "./Badge";
import { SocialLink } from "./SocialLink";
import { ProgressCard } from "./ProgressCard";
import ActivityCard from "./ActivityCard";
import { Skeleton } from "./ui/skeleton";
import { fetchDiscordProfile, getDiscordBadges, getStatusIcon, getStatusText } from "@/services/discordService";

const CDN = 'https://cdn.cee.bio/api/file';

const ACCOUNT_ICONS: Record<string, string> = {
  github:          `${CDN}/github-7aa220b1b133267fcc76efaf4353a242.svg`,
  twitch:          `${CDN}/twitch-e758f9df2f4d761b26ac52145d34beba.svg`,
  spotify:         `${CDN}/spotify-1ad501135e108e1abab2b38a1e90a2a4.svg`,
  steam:           `${CDN}/steam-fae0d36bc435cbcf530c5dbfbe9158b3.svg`,
  youtube:         `${CDN}/youtube-15ae3f67bb1e38f10c2899487a74771a.svg`,
  twitter:         `${CDN}/twitter-f7bdd56a799ed8d81575f142bf86a480.svg`,
  x:               `${CDN}/twitter-f7bdd56a799ed8d81575f142bf86a480.svg`,
  reddit:          `${CDN}/reddit-2922fb26fee11b5599d65ec3ac4933f2.svg`,
  facebook:        `${CDN}/facebook-8515b9675156747b8a494fc0ca1733c3.svg`,
  xbox:            `${CDN}/xbox-c345ba391b66d2f02aee28d17e341052.svg`,
  playstation:     `${CDN}/playstation-19da070f62979862ea30730484a69e36.svg`,
  battlenet:       `${CDN}/battlenet-b54171fbc95708d9a66790f7e5f26a0c.svg`,
  epicgames:       `${CDN}/epicgames-5463536be62947c0c1332c70c716658a.svg`,
  roblox:          `${CDN}/roblox-082f8d6b5b8ac50ab2ea851c1fcb45a0.svg`,
  tiktok:          `${CDN}/tiktok-fb1191a0ad5dcd62bc6c915a74b57a7e.svg`,
  paypal:          `${CDN}/paypal-04c815823477f1ecdbc31c4589b973d7.svg`,
  bluesky:         `${CDN}/bluesky-8268fd4458e2faa9460dfb0e1aac9444.svg`,
  leagueoflegends: `${CDN}/leagueoflegends-3ccbca44b2b68c7e998b2b8cba7b9e19.svg`,
  riotgames:       `${CDN}/riotgames-3fc5f5a111f41f38170b490633f34291.svg`,
  amazonmusic:     `${CDN}/amazonmusic-aaf3aa8d1f4246db01b67e356f67bf7b.svg`,
  crunchyroll:     `${CDN}/crunchyroll-342843490fb460de26aa43ee23919ac1.svg`,
  ebay:            `${CDN}/ebay-6a14688d9b62839c33f72044773bf341.svg`,
  bungie:          `${CDN}/bungie-1908a7c0c2679a69c71cf9c296ad9f20.svg`,
  domain:          `${CDN}/domain-cc212167645c25348fffc5a10d7efd36.svg`,
};

const ACCOUNT_URLS: Record<string, (name: string) => string> = {
  bluesky:         (n) => `https://bsky.app/profile/${n}`,
  reddit:          (n) => `https://reddit.com/user/${n}`,
  steam:           (n) => `https://steamcommunity.com/profiles/${n}`,
  twitter:         (n) => `https://x.com/${n}`,
  x:               (n) => `https://x.com/${n}`,
  tiktok:          (n) => `https://tiktok.com/@${n}`,
  ebay:            (n) => `https://www.ebay.com/usr/${n}`,
  crunchyroll:     (n) => `https://www.crunchyroll.com/user/${n}`,
  playstation:     (n) => `https://psnprofiles.com/${n}`,
  xbox:            (n) => `https://xboxgamertag.com/search/${n}`,
  amazonmusic:     (n) => `https://music.amazon.com/profile/${n}`,
  battlenet:       (_) => `https://battle.net/account/management/`,
  bungie:          (n) => `https://www.bungie.net/7/en/User/Profile/${n}`,
  domain:          (n) => `https://${n}`,
  epicgames:       (_) => `https://www.epicgames.com/account/personal`,
  facebook:        (n) => `https://facebook.com/${n}`,
  leagueoflegends: (n) => `https://www.op.gg/summoners/${n}`,
  riotgames:       (_) => `https://www.riotgames.com/`,
  roblox:          (n) => `https://www.roblox.com/users/${n}/profile`,
  twitch:          (n) => `https://twitch.tv/${n}`,
  paypal:          (_) => `https://paypal.com/`,
  spotify:         (n) => `https://open.spotify.com/user/${n}`,
  github:          (n) => `https://github.com/${n}`,
  youtube:         (n) => `https://youtube.com/@${n}`,
};

export const ProfileCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { data: victimsData, isLoading, error } = useQuery({
    queryKey: ['discordProfile'],
    queryFn: fetchDiscordProfile,
    staleTime: 0,
    refetchInterval: 30_000,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    setTilt({ x: tiltX, y: tiltY });
    setGlarePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const getAvatarUrl = (userId: string, avatar: string) => {
    if (avatar?.startsWith('a_')) {
      return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.gif?size=4096`;
    }
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png?size=4096`;
  };

  const getAccentColor = (color?: number) => {
    if (!color) return undefined;
    return `#${color.toString(16).padStart(6, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-xl relative z-10">
        <div className="relative group">
          <div className="relative">
            <div className="text-white overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 shadow-2xl rounded-2xl relative backdrop-blur-sm">
              {/* Banner skeleton */}
              <Skeleton className="h-16 w-full bg-white/5" />
              
              <div className="p-4 relative -mt-6">
                <div className="flex items-end gap-3 mb-4">
                  {/* Avatar skeleton */}
                  <Skeleton className="w-16 h-16 rounded-full bg-white/10" />
                  
                  <div className="flex-1 min-w-0">
                    {/* Username skeleton */}
                    <Skeleton className="h-5 w-32 mb-1 bg-white/10" />
                    {/* Status skeleton */}
                    <Skeleton className="h-3 w-20 bg-white/5" />
                  </div>
                  
                  {/* Status icon skeleton */}
                  <Skeleton className="w-4 h-4 rounded-full bg-white/10" />
                </div>

                {/* Bio skeleton */}
                <div className="mb-4">
                  <Skeleton className="h-3 w-full mb-1 bg-white/5" />
                  <Skeleton className="h-3 w-3/4 bg-white/5" />
                </div>

                {/* Badges skeleton */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <Skeleton className="w-6 h-6 rounded bg-white/10" />
                  <Skeleton className="w-6 h-6 rounded bg-white/10" />
                  <Skeleton className="w-6 h-6 rounded bg-white/10" />
                </div>

                {/* Social links skeleton */}
                <div className="flex gap-2 mb-4">
                  <Skeleton className="w-8 h-8 rounded-lg bg-white/10" />
                  <Skeleton className="w-8 h-8 rounded-lg bg-white/10" />
                </div>

                {/* Progress cards skeleton */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                    <Skeleton className="h-3 w-16 mb-2 bg-white/10" />
                    <Skeleton className="h-4 w-12 bg-white/10" />
                  </div>
                  <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                    <Skeleton className="h-3 w-16 mb-2 bg-white/10" />
                    <Skeleton className="h-4 w-12 bg-white/10" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xl relative z-10 flex items-center justify-center min-h-[400px]">
        <div className="text-center p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive font-semibold mb-1">Erro ao carregar dados</p>
          <p className="text-xs text-muted-foreground">{error instanceof Error ? error.message : 'Erro desconhecido'}</p>
        </div>
      </div>
    );
  }

  // Extract data from Victims.bio API (static data)
  const user = victimsData?.user;
  const userId = user?.id || '1111729007050891295';
  const username = user?.username || 'Usuário';
  const discriminator = user?.discriminator || '0000';
  const avatar = user?.avatar 
    ? getAvatarUrl(userId, user.avatar) 
    : `https://cdn.discordapp.com/embed/avatars/${(parseInt(userId) % 5)}.png`;
  const banner = user?.banner 
    ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}.${user.banner.startsWith('a_') ? 'gif' : 'png'}?size=1024` 
    : undefined;
  const bio = user?.bio || '';
  const accentColor = getAccentColor(user?.accent_color);
  const connectedAccounts = victimsData?.connected_accounts || [];
  
  const status = victimsData?.presence?.status || 'offline';
  const statusIcon = getStatusIcon(status as any);
  const statusText = getStatusText(status as any);
  
  const discordBadges = getDiscordBadges(victimsData?.badges);
  
  const nitroBadges: Array<{ id: string; name: string; icon: string; alt: string }> = [];
  const hasNitroBadge = discordBadges.some(b => b.id.includes('nitro') || b.id.includes('premium'));
  const hasActiveNitro = victimsData?.premium_type && victimsData?.premium_since;
  if (hasActiveNitro && !hasNitroBadge) {
    if (victimsData.premium_type === 1) {
      nitroBadges.push({
        id: 'nitro_classic',
        name: 'Nitro Classic',
        icon: 'https://ik.imagekit.io/xys3wb0qo/badges/bronze.png',
        alt: 'Nitro Classic'
      });
    } else if (victimsData.premium_type === 2) {
      nitroBadges.push({
        id: 'nitro',
        name: 'Nitro',
        icon: 'https://ik.imagekit.io/xys3wb0qo/badges/silver.png',
        alt: 'Nitro'
      });
    } else if (victimsData.premium_type === 3) {
      nitroBadges.push({
        id: 'nitro_basic',
        name: 'Nitro Basic',
        icon: 'https://ik.imagekit.io/xys3wb0qo/badges/bronze.png',
        alt: 'Nitro Basic'
      });
    }
  }
  
  const allBadges = [...discordBadges, ...nitroBadges];

  const nitroInfo = victimsData?.nitro ?? null;
  const boostInfo = victimsData?.boost ?? null;

  return (
    <div className="w-full max-w-xl relative z-10">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="text-white overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 rounded-2xl relative group backdrop-blur-sm"
            style={{
              transformStyle: "preserve-3d",
              willChange: "auto",
              transition: "transform 250ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 500ms",
              transform: `perspective(1500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none z-50 rounded-2xl"
              style={{
                mixBlendMode: "overlay",
                opacity: isHovered ? 0.15 : 0,
                background: `radial-gradient(circle at ${glarePosition.x}px ${glarePosition.y}px, rgba(255, 255, 255, 0.15), transparent 70%)`,
                transition: "opacity 300ms ease-out",
              }}
            />
            <div className="absolute inset-[1px] rounded-2xl border border-white/5 pointer-events-none" />

            <div 
              className="h-16 relative overflow-hidden"
              style={{
                background: banner 
                  ? `url(${banner}) center/cover`
                  : accentColor
                  ? `linear-gradient(to right, ${accentColor}15, ${accentColor}05, ${accentColor}15)`
                  : 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.02), rgba(255,255,255,0.05))'
              }}
            >
              {!banner && (
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")`,
                  }}
                />
              )}
              <a
                href={`https://discord.com/users/${userId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/80 hover:border-white/20 hover:scale-110 transition-all duration-200"
                title="Ver perfil no Discord"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 relative -mt-6">
              <div className="flex items-end gap-3 mb-4">
                <div className="relative flex-shrink-0 group/avatar">
                  <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                  <div className="relative transform -rotate-6 group-hover/avatar:rotate-0 group-hover/avatar:scale-110 transition-all duration-500">
                    <span className="flex shrink-0 w-16 h-16 border-[3px] border-black rounded-xl relative overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent translate-y-[-100%] group-hover/avatar:translate-y-[100%] transition-transform duration-1000" />
                      <img
                        className="aspect-square h-full w-full object-cover"
                        alt={username}
                        src={avatar}
                      />
                    </span>
                    <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1 shadow-lg">
                      <img
                        alt={statusText}
                        className="w-5 h-5 rounded-full"
                        src={statusIcon}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {username}
                      </h3>
                      <p className="text-[11px] text-white/60 font-mono">
                        @{username.toLowerCase()}
                        {discriminator !== '0' && discriminator !== '0000' && `#${discriminator}`}
                      </p>
                      {bio && (
                        <p className="text-[10px] text-white/50 mt-1 line-clamp-2">
                          {bio}
                        </p>
                      )}
                    </div>
                    {allBadges.length > 0 && (
                      <div className="flex gap-1 items-center ml-2">
                        {allBadges.map((badge) => (
                          <Badge
                            key={badge.id}
                            src={badge.icon}
                            alt={badge.alt}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {connectedAccounts.length > 0 && (
                <div className="mb-3 p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50" />
                  <p className="text-[10px] font-semibold text-white/70 mb-2 uppercase tracking-wider flex items-center gap-2 relative z-10">
                    <Globe className="w-3 h-3" />
                    Contas Conectadas
                  </p>
                  <div className="flex gap-1.5 flex-wrap relative z-10">
                    {connectedAccounts.map((account, index) => {
                      const key = account.type?.toLowerCase().replace(/\s+/g, '').replace(/\./g, '') || '';
                      const iconUrl = ACCOUNT_ICONS[key] || '';
                      const accountUrl = ACCOUNT_URLS[key]?.(account.name) || '#';
                      
                      if (!account.type || !account.name) {
                        return null;
                      }

                      return (
                        <SocialLink
                          key={`${account.type}-${account.id || index}`}
                          href={accountUrl}
                          icon={iconUrl}
                          alt={account.type}
                          label={account.name}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5 mb-3">
                {boostInfo && (
                  <ProgressCard
                    title="Server Boost"
                    variant="purple"
                    currentBadge={boostInfo.badge}
                    nextBadge={boostInfo.next_badge}
                    daysRemaining={Math.max(0, boostInfo.days_remaining)}
                    totalDays={Math.max(1, boostInfo.days_total)}
                    progress={
                      boostInfo.days_total > 0
                        ? Math.max(0, Math.min(100, ((boostInfo.days_total - boostInfo.days_remaining) / boostInfo.days_total) * 100))
                        : 100
                    }
                    remainingFormatted={boostInfo.remaining_formatted}
                    totalFormatted={boostInfo.total_formatted}
                  />
                )}
                {nitroInfo && (
                  <ProgressCard
                    title="Nitro"
                    variant="blue"
                    currentBadge={nitroInfo.badge}
                    nextBadge={nitroInfo.next_badge}
                    daysRemaining={Math.max(0, nitroInfo.days_remaining)}
                    totalDays={Math.max(1, nitroInfo.days_total)}
                    progress={
                      nitroInfo.days_total > 0
                        ? Math.max(0, Math.min(100, ((nitroInfo.days_total - nitroInfo.days_remaining) / nitroInfo.days_total) * 100))
                        : 100
                    }
                    remainingFormatted={nitroInfo.remaining_formatted}
                    totalFormatted={nitroInfo.total_formatted}
                  />
                )}
              </div>

              {victimsData?.presence?.activities && victimsData.presence.activities.length > 0 && (() => {
                const mainActivity = victimsData.presence.activities.find(activity => activity.type !== 4);
                return mainActivity ? (
                  <div className="mb-3">
                    <ActivityCard activity={mainActivity} />
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
