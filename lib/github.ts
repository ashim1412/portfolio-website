export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  homepage: string | null;
}

export interface UserStats {
  public_repos: number;
  followers: number;
  total_stars: number;
}

export interface LanguageStat {
  language: string;
  /** repo count for this language */
  bytes: number;
  percentage: number;
}

// ── Caches ─────────────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const repoCache = new Map<string, { data: GitHubRepo[]; fetchedAt: number }>();
const userStatsCache = new Map<string, { data: UserStats; fetchedAt: number }>();
const langStatsCache = new Map<string, { data: LanguageStat[]; fetchedAt: number }>();

/**
 * In-flight promise deduplication: if two callers request the same username
 * before the first request resolves, they share the same Promise instead of
 * firing two HTTP requests (which would both miss the cache).
 */
const inFlight = new Map<string, Promise<GitHubRepo[]>>();

// ── fetchRepos ─────────────────────────────────────────────────────────────────

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  // Return cached result if fresh
  const cached = repoCache.get(username);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  // Deduplicate concurrent requests for the same username
  const existing = inFlight.get(username);
  if (existing) return existing;

  const promise = (async () => {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const raw: any[] = await res.json();

    const repos: GitHubRepo[] = raw
      .filter((r) => !r.fork)
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .map((r) => ({
        name: r.name,
        description: r.description ?? null,
        html_url: r.html_url,
        topics: r.topics ?? [],
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        updated_at: r.updated_at,
        language: r.language ?? null,
        homepage: r.homepage || null,
      }));

    repoCache.set(username, { data: repos, fetchedAt: Date.now() });
    return repos;
  })();

  inFlight.set(username, promise);
  // Clean up the in-flight entry once the promise settles
  promise.finally(() => inFlight.delete(username));

  return promise;
}

// ── fetchUserStats ─────────────────────────────────────────────────────────────

export async function fetchUserStats(username: string): Promise<UserStats> {
  const cached = userStatsCache.get(username);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  // Fire the user profile request and the repo list in parallel.
  // fetchRepos uses in-flight dedup so a concurrent call from fetchLanguageStats
  // won't fire a second HTTP request.
  const [userRes, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers: { Accept: "application/vnd.github+json" },
    }),
    fetchRepos(username),
  ]);

  if (!userRes.ok) {
    throw new Error(
      `GitHub user API error: ${userRes.status} ${userRes.statusText}`
    );
  }

  const user = await userRes.json();
  const total_stars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  const data: UserStats = {
    public_repos: user.public_repos,
    followers: user.followers,
    total_stars,
  };

  userStatsCache.set(username, { data, fetchedAt: Date.now() });
  return data;
}

// ── fetchLanguageStats ─────────────────────────────────────────────────────────
//
// Derives language distribution from the primary language field already present
// on every repo object — zero extra API calls, no rate-limit risk.

export async function fetchLanguageStats(
  username: string
): Promise<LanguageStat[]> {
  const cached = langStatsCache.get(username);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  // Reuses the already-cached (or in-flight) repo request — no extra HTTP call
  const repos = await fetchRepos(username);

  // Count repos per primary language
  const counts: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  const data: LanguageStat[] = Object.entries(counts)
    .map(([language, count]) => ({
      language,
      bytes: count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 5);

  langStatsCache.set(username, { data, fetchedAt: Date.now() });
  return data;
}

// ── fetchReadme ────────────────────────────────────────────────────────────────

const readmeCache = new Map<string, { data: string; fetchedAt: number }>();

export async function fetchReadme(owner: string, repo: string): Promise<string> {
  const key = `${owner}/${repo}`;
  const cached = readmeCache.get(key);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached.data;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) return "";
    const json = await res.json();
    const raw = await fetch(json.download_url);
    const text = await raw.text();
    readmeCache.set(key, { data: text, fetchedAt: Date.now() });
    return text;
  } catch {
    return "";
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Human-readable relative time from an ISO date string. */
export function daysAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}
