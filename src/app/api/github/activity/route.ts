import { NextResponse } from "next/server";

const GITHUB_USERNAME = "dipu59";

function getYearRange(year: number) {
  return {
    from: `${year}-01-01`,
    to: `${year}-12-31`,
  };
}

function sumContributionCounts(svg: string) {
  const matches = [...svg.matchAll(/data-count="(\d+)"/g)];
  const counts = matches.map((match) => Number(match[1] || 0));

  return {
    total: counts.reduce((sum, count) => sum + count, 0),
    activeDays: counts.filter((count) => count > 0).length,
  };
}

export async function GET() {
  const year = new Date().getFullYear();
  const { from, to } = getYearRange(year);

  try {
    const [contributionsResponse, eventsResponse] = await Promise.all([
      fetch(
        `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${from}&to=${to}`,
        {
          headers: {
            Accept: "image/svg+xml",
            "User-Agent": "portfolio-site",
          },
          next: { revalidate: 21600 },
        },
      ),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-site",
        },
        next: { revalidate: 900 },
      }),
    ]);

    if (!contributionsResponse.ok) {
      throw new Error("Unable to load GitHub contributions");
    }

    const contributionsSvg = await contributionsResponse.text();
    const contributionStats = sumContributionCounts(contributionsSvg);

    let latestPush: {
      repo: string | null;
      commitCount: number;
      createdAt: string | null;
      href: string;
    } | null = null;

    if (eventsResponse.ok) {
      const events = (await eventsResponse.json()) as Array<{
        type?: string;
        repo?: { name?: string };
        created_at?: string;
        payload?: { commits?: Array<unknown> };
      }>;

      const pushEvent = events.find((event) => event.type === "PushEvent");

      if (pushEvent) {
        latestPush = {
          repo: pushEvent.repo?.name?.split("/")[1] || null,
          commitCount: pushEvent.payload?.commits?.length || 0,
          createdAt: pushEvent.created_at || null,
          href: pushEvent.repo?.name
            ? `https://github.com/${pushEvent.repo.name}`
            : `https://github.com/${GITHUB_USERNAME}`,
        };
      }
    }

    return NextResponse.json({
      year,
      profileUrl: `https://github.com/${GITHUB_USERNAME}`,
      totalContributions: contributionStats.total,
      activeDays: contributionStats.activeDays,
      latestPush,
    });
  } catch {
    return NextResponse.json(
      {
        year,
        profileUrl: `https://github.com/${GITHUB_USERNAME}`,
        totalContributions: null,
        activeDays: null,
        latestPush: null,
      },
      { status: 200 },
    );
  }
}
