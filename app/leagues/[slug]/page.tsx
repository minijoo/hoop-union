import GameSummary from "../../components/gameSummary";
import { preprocessGamesForSummary } from "../../utils/core";

const BASE_URL = process.env.NODE_ENV === 'production' ? 
  "https://demo.jordys.site" : "http://localhost:8000"

export default async function LeaguePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const resp0 = await fetch(
    `${BASE_URL}/leagues/${slug}`,
    { cache: 'no-store' }
  )
  const league = await resp0.json()
  
  const games = []

  const resp = await fetch(
    `${BASE_URL}/games/public/league/${slug}`,
    { cache: 'no-store' }
  )
  const respGames = await resp.json()
  Array.isArray(respGames) && games.push(...respGames.reverse())

  preprocessGamesForSummary(games)
 
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-start px-3 md:px-16 bg-white sm:items-start pb-5 pt-5">
        <div className="flex flex-col gap-1 w-full pb-1 rounded-md">
          <div className="font-semibold text-xl">
            {league.name} (ID {league.id})
            {league.location ? ` - ${league.location}` : ""}
          </div>
          {games.map((game :any) => (
            <GameSummary key={game.base_game_id}
              league={game.league}
              title={game.title}
              submittedOn={game.submitted_on}
              away={game.away}
              home={game.home}
              leaders={game.leaders}
              periodScores={game.period_scores}
              baseGameId={game.base_game_id}
            />
          ))}
        </div>
      </main>
    </div>
  );
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  )
}
