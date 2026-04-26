import { NextResponse } from 'next/server';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'v1shay';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchGitHubData() {
  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        login
        avatarUrl
        bio
        followers {
          totalCount
        }
        repositories(first: 20, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            stargazerCount
            forkCount
            languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
              }
            }
            updatedAt
            url
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch GitHub data: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }
  return data.data.user;
}

export async function GET() {
  try {
    if (!GITHUB_TOKEN) {
      // Fallback or error? The user asked for live data.
      // I'll return an error so the UI shows the error state as requested.
      return NextResponse.json({ error: 'GITHUB_TOKEN is not configured' }, { status: 500 });
    }
    const user = await fetchGitHubData();
    
    // Calculate streak
    const calendar = user.contributionsCollection.contributionCalendar;
    const allDays = calendar.weeks.flatMap((w: any) => w.contributionDays).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (const day of allDays) {
      if (day.contributionCount > 0) {
        currentStreak++;
      } else {
        // If it's today and 0, we continue checking from yesterday
        if (day.date === today) continue;
        break;
      }
    }

    return NextResponse.json({
      username: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      followers: user.followers.totalCount,
      repoCount: user.repositories.totalCount,
      totalContributions: calendar.totalContributions,
      currentStreak,
      recentRepos: user.repositories.nodes.slice(0, 6).map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.languages.nodes[0]?.name || 'N/A',
        updatedAt: repo.updatedAt,
        url: repo.url
      })),
      contributionCalendar: calendar.weeks.map((w: any) => w.contributionDays.map((d: any) => ({
        count: d.contributionCount,
        date: d.date
      })))
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
