import { useMemo } from "react";
import { ExternalLink, Star, GitFork, Github } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/Footer";

const generateParticles = (count: number) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 0.618033988749;
    particles.push({
      size: (Math.sin(seed) * 0.5 + 0.5) * 2 + 1,
      opacity: (Math.cos(seed * 2) * 0.5 + 0.5) * 0.5 + 0.2,
      delay: (Math.sin(seed * 3) * 0.5 + 0.5) * 4,
      duration: (Math.cos(seed * 4) * 0.5 + 0.5) * 3 + 2,
      top: (Math.sin(seed * 5) * 0.5 + 0.5) * 100,
      left: (Math.cos(seed * 6) * 0.5 + 0.5) * 100,
    });
  }
  return particles;
};

const techIcons: Record<string, string> = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  NestJS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  Tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "CDN Victims": "https://victims.bio/_next/image?url=%2Flogo.png&w=1920&q=75",
  VictimsAuthTs: "https://victims.bio/_next/image?url=%2Flogo.png&w=1920&q=75",
};

const LANG_ICONS: Record<string, string> = {
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  Lua: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  Shell: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  Vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  Svelte: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  Kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  Ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  Swift: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
};

const featuredProjects = [
  {
    name: "cdn.victims.bio",
    description:
      "Sistema de CDN de alta performance para distribuição de conteúdo, construído com arquitetura escalável e cache distribuído.",
    technologies: ["NestJS", "TypeScript", "Redis"],
    url: "https://cdn.victims.bio",
    accent: "#E0234E",
  },
  {
    name: "victims.bio",
    description:
      "Plataforma completa com sistema de autenticação proprietário (VictimsAuthTs), integrando múltiplas tecnologias para uma experiência robusta.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "MongoDB", "Python", "VictimsAuthTs"],
    url: "https://victims.bio",
    accent: "#61DAFB",
  },
  {
    name: "iCord",
    description:
      "Plataforma de ícones, gifs e banners para perfil e servidor do Discord, utilizando a CDN própria da Victims para distribuição de conteúdo.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "CDN Victims", "Python"],
    url: "https://icord.pw",
    accent: "#5865F2",
  },
];

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

const fetchRepos = async (): Promise<GithubRepo[]> => {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=public`
  );
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  return res.json();
};

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return "hoje";
  if (days < 30) return `${days}d atrás`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}m atrás`;
  return `${Math.floor(months / 12)}a atrás`;
};

const RepoCard = ({ repo, delay }: { repo: GithubRepo; delay: number }) => {
  const langIcon = repo.language ? LANG_ICONS[repo.language] : undefined;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-card-enter group flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.07)] transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Github className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
          <span className="text-sm font-semibold text-white truncate group-hover:text-white/90 transition-colors">
            {repo.name}
          </span>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0 mt-0.5" />
      </div>

      {repo.description && (
        <p className="text-white/50 text-xs leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors">
          {repo.description}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 pt-1">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-[11px] text-white/50">
            {langIcon ? (
              <img
                src={langIcon}
                alt={repo.language}
                className="w-3.5 h-3.5 flex-shrink-0"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ) : (
              <span className="w-2 h-2 rounded-full flex-shrink-0 bg-white/30" />
            )}
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1 text-[11px] text-white/40">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1 text-[11px] text-white/40">
            <GitFork className="w-3 h-3" />
            {repo.forks_count}
          </span>
        )}
        <span className="ml-auto text-[10px] text-white/25">{timeAgo(repo.updated_at)}</span>
      </div>
    </a>
  );
};

const RepoSkeleton = () => (
  <div className="flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900">
    <div className="flex items-center gap-2">
      <Skeleton className="w-3.5 h-3.5 rounded bg-white/10" />
      <Skeleton className="h-4 w-28 bg-white/10" />
    </div>
    <Skeleton className="h-3 w-full bg-white/5" />
    <Skeleton className="h-3 w-3/4 bg-white/5" />
    <div className="flex gap-3 mt-auto pt-1">
      <Skeleton className="h-3 w-16 bg-white/5" />
      <Skeleton className="h-3 w-10 bg-white/5" />
    </div>
  </div>
);

const FeaturedCard = ({
  project,
  delay,
}: {
  project: (typeof featuredProjects)[0];
  delay: number;
}) => (
  <div
    className="animate-card-enter group relative flex flex-col gap-4 p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 hover:border-white/20 transition-all duration-300 overflow-hidden"
    style={{
      animationDelay: `${delay}ms`,
      boxShadow: `0 0 0 0 ${project.accent}00`,
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${project.accent}18`;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${project.accent}00`;
    }}
  >
    {/* Accent glow line at top */}
    <div
      className="absolute top-0 left-0 right-0 h-px opacity-60"
      style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
    />

    <div className="flex items-start justify-between">
      <div>
        <div
          className="w-1.5 h-1.5 rounded-full mb-2"
          style={{ backgroundColor: project.accent }}
        />
        <h3 className="text-lg font-bold text-white">{project.name}</h3>
      </div>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>

    <p className="text-white/60 text-sm leading-relaxed flex-1">{project.description}</p>

    <div className="flex flex-wrap gap-1.5">
      {project.technologies.map((tech) => {
        const icon = techIcons[tech];
        return (
          <span
            key={tech}
            className="px-2 py-1 text-[11px] font-medium text-white/70 bg-white/5 rounded-md border border-white/10 flex items-center gap-1.5 hover:bg-white/8 transition-colors"
          >
            {icon && (
              <img
                src={icon}
                alt={tech}
                className="w-3 h-3"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            {tech}
          </span>
        );
      })}
    </div>
  </div>
);

const Projetos = () => {
  const particles = useMemo(() => generateParticles(30), []);

  const { data: repos, isLoading: reposLoading } = useQuery({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: fetchRepos,
    staleTime: 10 * 60 * 1000,
    enabled: !!GITHUB_USERNAME,
  });

  const displayRepos = useMemo(
    () =>
      repos
        ?.filter((r) => !r.fork && r.name !== GITHUB_USERNAME)
        .slice(0, 9) ?? [],
    [repos]
  );

  return (
    <div className="min-h-screen w-screen bg-black relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {particles.map((particle, i) => (
          <div
            key={`p-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              opacity: particle.opacity * 0.6,
              animation: `pulse ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255,255,255,${particle.opacity * 0.4})`,
            }}
          />
        ))}
        <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-3xl animate-float opacity-20" />
        <div
          className="absolute bottom-[25%] right-[8%] w-[450px] h-[450px] bg-white/[0.015] rounded-full blur-3xl animate-float opacity-[0.18]"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20 pb-20 md:pt-12 px-4 md:pl-32 md:pr-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-14 max-w-xl">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3 animate-card-enter" style={{ animationDelay: "0ms" }}>
              portfólio
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-4 animate-title-reveal"
              style={{ animationDelay: "80ms" }}
            >
              Projetos
            </h1>
            <p
              className="text-white/40 text-base leading-relaxed animate-card-enter"
              style={{ animationDelay: "200ms" }}
            >
              Coisas que construí — de plataformas completas a experimentos open source.
            </p>
          </div>

          {/* Featured */}
          <section className="mb-14">
            <div
              className="flex items-center gap-3 mb-6 animate-card-enter"
              style={{ animationDelay: "300ms" }}
            >
              <span className="text-white/20 text-xs uppercase tracking-[0.25em]">✦ destacados</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProjects.map((project, i) => (
                <FeaturedCard key={project.name} project={project} delay={360 + i * 80} />
              ))}
            </div>
          </section>

          {/* GitHub Repos */}
          {GITHUB_USERNAME && (
            <section>
              <div
                className="flex items-center gap-3 mb-6 animate-card-enter"
                style={{ animationDelay: "600ms" }}
              >
                <span className="text-white/20 text-xs uppercase tracking-[0.25em]">
                  ✦ open source · {GITHUB_USERNAME}
                </span>
                <div className="flex-1 h-px bg-white/5" />
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors"
                >
                  <Github className="w-3 h-3" />
                  ver mais
                </a>
              </div>

              {reposLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <RepoSkeleton key={i} />
                  ))}
                </div>
              ) : displayRepos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {displayRepos.map((repo, i) => (
                    <RepoCard key={repo.id} repo={repo} delay={660 + i * 60} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-white/20 text-sm">
                  Nenhum repositório público encontrado.
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projetos;
