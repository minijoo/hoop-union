import { fetchLeagueGames, fetchLeagueInfo } from "@/app/actions";
import League from "@/app/components/league";
import { Metadata } from "next";
import { cache } from "react";

const getLeagueInfo = cache(fetchLeagueInfo);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const leagueInfo = await getLeagueInfo(slug);

  return {
    title: `${leagueInfo.name} — ${leagueInfo.location}`,
    description: 'View league info and games'
  }
}

export default async function LeaguePage({ params, searchParams }: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { slug } = await params;
  const leagueInfo = await getLeagueInfo(slug);

  const { tags } = await searchParams;

  const gamesResult = await fetchLeagueGames(slug, tags || '');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-start px-3 md:px-16 bg-white sm:items-start pb-5 pt-5">
        <League
          distinctTags={gamesResult.distinct_tags}
          initGames={gamesResult.games}
          league={leagueInfo}
          totalCount={gamesResult.total_count}
          tagsParam={tags || ''}
        />
      </main>
    </div>
  );
}
