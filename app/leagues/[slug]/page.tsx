'use client';

import CollapsableDiv from "@/app/components/collapsableDiv";
import GameSummary from "../../components/gameSummary";
import { preprocessGamesForSummary } from "../../utils/core";
import TagCheckboxes from "@/app/components/tagCheckboxes";
import { fetchLeagueGames, fetchLeagueInfo } from "@/app/actions";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeaguePage({ }: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = useParams() as { slug: string };

  const tagsParam = (useSearchParams()).get('tags') || '';
  const tagSet = new Set<string>(tagsParam ? tagsParam.split(',') : []);

  const [league, setLeague] = useState<any>({});

  const [games, setGames] = useState<any[]>([]);
  const [distinctTags, setDistinctTags] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  preprocessGamesForSummary(games)

  useEffect(() => {
    const fetchData = async () => {
      setLeague(await fetchLeagueInfo(slug) as any);
      const gamesResult = await fetchLeagueGames(slug, tagsParam);
      Array.isArray(gamesResult.games) && setGames(gamesResult.games);

      setDistinctTags(gamesResult.distinct_tags);
      setTotalCount(gamesResult.total_count);

      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-start px-3 md:px-16 bg-white sm:items-start pb-5 pt-5">
        {
          isLoading
            ?
            <div>Loading...</div>
            :
            <div className="flex flex-col gap-1 w-full pb-1 rounded-md">
              <div className="font-semibold text-xl px-3 py-1 bg-blue-200 rounded-md
            justify-center flex flex-wrap gap-1.5"
              >
                <span>{league.name} (ID {league.id})</span>
                <span>{league.location ? `— ${league.location}` : ""}</span>
              </div>
              {
                distinctTags.length > 0
                &&
                <div className="bg-white border border-blue-900 rounded-lg">
                  <CollapsableDiv title="Tags">
                    <TagCheckboxes tags={distinctTags} selectedTags={tagSet} />
                  </CollapsableDiv>
                </div>
              }
              <span className="text-lg">Latest Games ({totalCount} Results)</span>
              {games.length
                ? <></>
                : <div>
                  <i>No games found in this league. Go back to&nbsp;
                    <a href="/" className="underline">home</a>.</i>
                </div>
              }
              {games.map((game: any) => (
                <GameSummary key={game.base_game_id}
                  league={game.league}
                  title={game.title}
                  submittedOn={game.submitted_on}
                  away={game.away}
                  home={game.home}
                  awayShort={game.away_short}
                  homeShort={game.home_short}
                  awayPic={game.away_pic}
                  homePic={game.home_pic}
                  leaders={game.leaders}
                  periodScores={game.period_scores}
                  baseGameId={game.base_game_id}
                  tags={game.tags}
                />
              ))}

              {
                hasMore
                &&
                <div
                  className="px-2 flex"
                  onClick={async () => {
                    const lastGame = games[games.length - 1];
                    const moreGames = await fetchLeagueGames(
                      slug, tagsParam, lastGame.submitted_on, lastGame.base_game_id
                    );
                    if (!moreGames || !moreGames.games || !moreGames.games.length) {
                      setHasMore(false);
                      return;
                    }
                    setGames(current => {
                      return [...current, ...moreGames.games];
                    });
                  }}
                >
                  <div className="text-blue-800 click-link">Load More</div>
                </div>
              }
            </div>
        }
      </main>
    </div>
  );
}
