import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import BouncingBasketball from "./components/bouncingBall";
import LeagueSearch from "./components/leagueSearch";
import GameSummary from "./components/gameSummary";
import { preprocessGamesForSummary } from "./utils/core";

const BASE_URL = process.env.NODE_ENV === 'production' ? 
  "https://demo.jordys.site" : "http://localhost:8000"

export default async function Home() {
  const leagues = []
  const games = []

  const resp0 = await fetch(
    `${BASE_URL}/leagues/list/all`,
    { cache: 'no-store' }
  )
  const respLeagues = await resp0.json()
  Array.isArray(respLeagues) && leagues.push(...respLeagues.reverse())
  console.log(respLeagues)

  const resp = await fetch(
    `${BASE_URL}/games/public/all`,
    { cache: 'no-store' }
  )
  const respGames = await resp.json()
  Array.isArray(respGames) && games.push(...respGames.reverse())

  preprocessGamesForSummary(games)
  
  console.log(games)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-start px-3 md:px-16 bg-white sm:items-start pb-5 pt-5">
        <div className="w-full h-60 pb-5">
          <BouncingBasketball>
            <div className="w-full h-full px-5 flex flex-col justify-center gap-2">
              <div className="font-semibold text-2xl">
                The best place for Francis stats and data
              </div>
              <div className="text-md">
                Hoop Union aggregates data from Francis and makes it publicly accessible.
              </div>
              <div className="flex flex-row gap-3 text-md">
                <a href="http://hoopfrontend-kohl.vercel.app/landing"
                  className="rounded-lg bg-white flex flex-wrap place-content-center px-3 py-2">
                  About <span className="italic pl-1 text-[#fea903]">Francis</span>
                </a>
                <a href=""
                  className="rounded-lg bg-white flex flex-wrap place-content-center px-3 py-2 items-center">
                  <span className="text-lg pr-1.5"><FaDiscord /></span> Join Discord 
                </a>
              </div>
            </div>
          </BouncingBasketball>
        </div>
        <div className="w-full pb-3">
          <LeagueSearch leagues={leagues}/>
        </div>
        <div className="flex flex-col gap-1 w-full pb-1 rounded-md">
          <div className="font-semibold text-xl">
            Recent Games Worldwide
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
}
