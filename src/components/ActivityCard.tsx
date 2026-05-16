import React from 'react';
import { Clock, Gamepad2, Code, Music, Tv, Trophy } from 'lucide-react';

interface ActivityCardProps {
  activity: {
    name: string;
    type: number;
    details?: string;
    state?: string;
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
  };
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const getActivityIcon = (type: number, name: string) => {
    if (name.toLowerCase().includes('spotify')) return Music;
    if (name.toLowerCase().includes('code') || name.toLowerCase().includes('visual studio')) return Code;
    if (type === 0) return Gamepad2; // Playing
    if (type === 1) return Tv; // Streaming
    if (type === 2) return Music; // Listening
    if (type === 3) return Tv; // Watching
    if (type === 5) return Trophy; // Competing
    return Gamepad2;
  };

  const getActivityTypeText = (type: number) => {
    switch (type) {
      case 0: return 'Jogando';
      case 1: return 'Transmitindo';
      case 2: return 'Ouvindo';
      case 3: return 'Assistindo';
      case 5: return 'Competindo';
      default: return 'Atividade';
    }
  };

  const getActivityColor = (type: number, name: string) => {
    if (name.toLowerCase().includes('spotify')) return 'green';
    if (name.toLowerCase().includes('code') || name.toLowerCase().includes('visual studio')) return 'blue';
    if (type === 0) return 'purple'; // Playing
    if (type === 1) return 'red'; // Streaming
    if (type === 2) return 'green'; // Listening
    if (type === 3) return 'orange'; // Watching
    if (type === 5) return 'yellow'; // Competing
    return 'purple';
  };

  const formatElapsedTime = (startTimestamp?: number) => {
    if (!startTimestamp) return null;
    
    const elapsed = Date.now() - startTimestamp;
    const minutes = Math.floor(elapsed / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}min`;
    }
    return `${minutes}min`;
  };

  const getAssetUrl = (asset?: string) => {
    if (!asset) return null;
    if (asset.startsWith('http')) return asset;
    
    // Handle mp:external/ assets from Lanyard
    if (asset.startsWith('mp:external/')) {
      try {
        const encodedUrl = asset.replace('mp:external/', '');
        const decodedUrl = atob(encodedUrl);
        return decodedUrl;
      } catch (error) {
        console.warn('Failed to decode external asset:', asset);
        return null;
      }
    }
    
    // Handle Discord CDN assets
    if (activity.application_id) {
      return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${asset}.png`;
    }
    
    return null;
  };

  const Icon = getActivityIcon(activity.type, activity.name);
  const largeImageUrl = getAssetUrl(activity.assets?.large_image);
  const elapsedTime = formatElapsedTime(activity.timestamps?.start);
  const color = getActivityColor(activity.type, activity.name);
  const typeText = getActivityTypeText(activity.type);

  const colorClasses = {
    green: 'text-green-400 border-green-400/30',
    blue: 'text-blue-400 border-blue-400/30',
    purple: 'text-purple-400 border-purple-400/30',
    red: 'text-red-400 border-red-400/30',
    orange: 'text-orange-400 border-orange-400/30',
    yellow: 'text-yellow-400 border-yellow-400/30',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className={`w-3 h-3 ${colorClasses[color as keyof typeof colorClasses]?.split(' ')[0] || 'text-purple-400'}`} />
        <span>{typeText} {activity.name}</span>
        <div className="flex-1 border-t border-border/30" />
        {elapsedTime && (
          <div className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold h-5 text-xs ${colorClasses[color as keyof typeof colorClasses] || 'text-purple-400 border-purple-400/30'}`}>
            <Clock className="w-2.5 h-2.5 mr-1" />
            {elapsedTime}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          {largeImageUrl ? (
            <img
              alt={activity.assets?.large_text || activity.name}
              className="w-12 h-12 rounded-lg object-cover border border-border/20"
              src={largeImageUrl}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`${largeImageUrl ? 'hidden' : ''} w-12 h-12 rounded-lg bg-muted/20 border border-border/20 flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-muted-foreground/50" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-card-foreground truncate">
            {activity.details || activity.name}
          </p>
          {activity.state && (
            <p className="text-xs text-muted-foreground truncate">
              {activity.state}
            </p>
          )}
          {activity.assets?.large_text && activity.assets.large_text !== activity.name && (
            <p className="text-xs text-muted-foreground/70 truncate">
              {activity.assets.large_text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;