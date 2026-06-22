import CollapsableDiv from "@/app/components/collapsableDiv";
import Leaders from "@/app/components/leaders";
import { preprocessGamesForSummary } from "@/app/utils/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Page",
  description: "",
};

const BASE_URL = process.env.APP_ENV === 'production' ?
  "https://francis.jordys.site" : process.env.APP_ENV === 'staging' ?
    "https://demo.jordys.site" : "http://localhost:8000"

const printPercentage = (mades: number, attempts: number) => {
  return (attempts ? (Math.round((mades / attempts) * 1000) / 10.0).toString() + '%'
    : '-'
  );


}

const BoxScore = ({ gameData }: { gameData: any }) => {
  const game = gameData;

  preprocessGamesForSummary([game])

  const publishedDateText =
    (new Date(game.submitted_on)).toLocaleDateString(
      'en-US', { month: 'long', day: 'numeric', year: 'numeric' }
    );

  // Separate players by team (side: 0 = home, 1 = away)
  const homePlayers = game.lines.filter((line: any) => line.side === 0).sort((a: any, b: any) => b.pts - a.pts);
  const awayPlayers = game.lines.filter((line: any) => line.side === 1).sort((a: any, b: any) => b.pts - a.pts);

  // Calculate totals for a team
  const calculateTotals = (players: any) => {
    return players.reduce((totals: any, player: any) => ({
      pts: totals.pts + player.pts,
      fgm: totals.fgm + player.fgm,
      fga: totals.fga + player.fga,
      thm: totals.thm + player.thm,
      tha: totals.tha + player.tha,
      ftm: totals.ftm + player.ftm,
      fta: totals.fta + player.fta,
      oreb: totals.oreb + player.oreb,
      reb: totals.reb + player.reb,
      ast: totals.ast + player.ast,
      stl: totals.stl + player.stl,
      blk: totals.blk + player.blk,
      tov: totals.tov + player.tov,
      fls: totals.fls + player.fls
    }), {
      pts: 0, fgm: 0, fga: 0, thm: 0, tha: 0, ftm: 0, fta: 0,
      oreb: 0, reb: 0, ast: 0, stl: 0, blk: 0, tov: 0, fls: 0
    });
  };

  const awayTotals = calculateTotals(awayPlayers);
  const homeTotals = calculateTotals(homePlayers);

  awayTotals.fgp = printPercentage(awayTotals.fgm, awayTotals.fga);
  awayTotals.thp = printPercentage(awayTotals.thm, awayTotals.tha);
  awayTotals.ftp = printPercentage(awayTotals.ftm, awayTotals.fta);
  homeTotals.fgp = printPercentage(homeTotals.fgm, homeTotals.fga);
  homeTotals.thp = printPercentage(homeTotals.thm, homeTotals.tha);
  homeTotals.ftp = printPercentage(homeTotals.ftm, homeTotals.fta);

  // Get final score from period_scores
  //game.period_scores=[[12,22],[16,31],[44,55]]
  const finalScore = game.period_scores[game.period_scores.length - 1];
  const awayScore = finalScore[0];
  const homeScore = finalScore[1];

  // Process period scores
  const processPeriodScores = () => {
    const periods = [];
    let periodNumber = 1;
    let prevAwayPts = 0, prevHomePts = 0;

    for (let i = 0; i < game.period_scores.length; i++) {
      const [awayPts, homePts] = game.period_scores[i];

      // Skip if both are -1
      if (awayPts === -1 && homePts === -1) {
        continue;
      }

      // Calculate points for this period
      let awayPeriodPts, homePeriodPts;

      if (i === 0) {
        // First period, use the values directly
        awayPeriodPts = awayPts;
        homePeriodPts = homePts;
        prevAwayPts = awayPts;
        prevHomePts = homePts;
      } else {
        // Subtract previous period's cumulative score
        //const [prevAwayPts, prevHomePts] = game.period_scores[i - 1];
        awayPeriodPts = awayPts - prevAwayPts;
        homePeriodPts = homePts - prevHomePts;
        prevAwayPts = awayPts;
        prevHomePts = homePts;
      }

      periods.push({
        label: `P${periodNumber}`,
        away: awayPeriodPts,
        home: homePeriodPts
      });

      periodNumber++;
    }

    return periods;
  };

  const periods = processPeriodScores();

  return (
    <div className="p-2 md:p-5 bg-gray-100 min-h-screen w-full pb-5">
      <div className="flex justify-between px-2 md:px-5 pt-1">
        <div className="flex flex-col pl-1 mb-3">
          <h1 className="text-lg md:text-2xl font-bold">
            {game.title || `${game.away} @ ${game.home}`}
          </h1>
          <h1 className="text-lg md:text-2xl italic">
            <a className="click-link text-blue-700" href={`/leagues/${game.league_id}`}>{game.league}</a>
          </h1>
          <h2 className="text-md md:text-lg mb-1 md:mb-2">
            {publishedDateText}
          </h2>
        </div>
        {/* Period Scores Table */}
        <div className="flex justify-center mb-4">
          <table className="border-collapse border border-gray-300 text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-3 md:px-4 py-2 font-bold">Team</th>
                {periods.map((period, idx) => (
                  <th key={idx} className="border border-gray-300 px-3 md:px-4 py-2 font-bold">
                    {period.label}
                  </th>
                ))}
                <th className="border border-gray-300 px-3 md:px-4 py-2 font-bold bg-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 md:px-4 py-2 font-semibold">{game.away}</td>
                {periods.map((period, idx) => (
                  <td key={idx} className="border border-gray-300 px-3 md:px-4 py-2 text-center">
                    {period.away}
                  </td>
                ))}
                <td className="border border-gray-300 px-3 md:px-4 py-2 text-center font-bold bg-gray-100">
                  {awayScore}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 md:px-4 py-2 font-semibold">{game.home}</td>
                {periods.map((period, idx) => (
                  <td key={idx} className="border border-gray-300 px-3 md:px-4 py-2 text-center">
                    {period.home}
                  </td>
                ))}
                <td className="border border-gray-300 px-3 md:px-4 py-2 text-center font-bold bg-gray-100">
                  {homeScore}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4 bg-white rounded-lg shadow">
        <CollapsableDiv title="Leaders">
          <div className="">
            <Leaders leaders={game.leaders} />
          </div>
        </CollapsableDiv>
      </div>

      {/* Away Team */}
      <div className="mb-6 md:mb-10 bg-white p-2 md:p-5 rounded-lg shadow">
        <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4 border-gray-800">
          {game.away} (Away)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-1 px-2 md:p-3 text-left text-xs whitespace-nowrap sticky left-0 bg-blue-900">
                  Player
                </th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">FGs</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">3PTs</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">FTs</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">OREB</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">REB</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">AST</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">STL</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">BLK</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">TOV</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">PF</th>
                <th className="py-1 px-2 md:p-3 text-right text-xs whitespace-nowrap sticky right-0 bg-blue-900">
                  PTS
                </th>
              </tr>
            </thead>
            <tbody>
              {awayPlayers.map((player: any, idx: number) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-1 px-1.5 md:p-3 text-left font-bold whitespace-nowrap sticky left-0 bg-gray-100 max-w-24 md:max-w-30 overflow-hidden text-ellipsis"
                    title={player.name ? player.name : `#${player.num}`}>
                    {player.name ? player.name : `#${player.num}`}
                  </td>
                  <td className="p-1 md:p-3 text-center">{player.fgm}-{player.fga}</td>
                  <td className="p-1 md:p-3 text-center">{player.thm}-{player.tha}</td>
                  <td className="p-1 md:p-3 text-center">{player.ftm}-{player.fta}</td>
                  <td className="p-1 md:p-3 text-center">{player.oreb}</td>
                  <td className="p-1 md:p-3 text-center">{player.reb}</td>
                  <td className="p-1 md:p-3 text-center">{player.ast}</td>
                  <td className="p-1 md:p-3 text-center">{player.stl}</td>
                  <td className="p-1 md:p-3 text-center">{player.blk}</td>
                  <td className="p-1 md:p-3 text-center">{player.tov}</td>
                  <td className="p-1 md:p-3 text-center">{player.fls}</td>
                  <td className="py-1 px-2 md:p-3 text-right font-bold sticky right-0 bg-gray-100">
                    {player.pts}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 border-t-2 border-gray-800 font-bold">
                <td className="p-1 md:p-3 text-center bg-gray-100 sticky left-0">TOTALS</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.fgp}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.thp}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.ftp}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.oreb}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.reb}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.ast}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.stl}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.blk}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.tov}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.fls}</td>
                <td className="py-1 px-2 md:p-3 text-right sticky right-0 bg-gray-100">
                  {awayTotals.pts}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Home Team */}
      <div className="bg-white p-2 md:p-5 rounded-lg shadow">
        <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4 border-gray-800">
          {game.home} (Home)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-1 px-2 md:p-3 text-left text-xs whitespace-nowrap sticky left-0 bg-blue-900">
                  Player
                </th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">FGs</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">3PTs</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">FTs</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">OREB</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">REB</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">AST</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">STL</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">BLK</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">TOV</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">PF</th>
                <th className="py-1 px-2 md:p-3 text-right text-xs whitespace-nowrap sticky right-0 bg-blue-900">
                  PTS
                </th>
              </tr>
            </thead>
            <tbody>
              {homePlayers.map((player: any, idx: number) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-1 px-1.5 md:p-3 text-left font-bold whitespace-nowrap sticky left-0 bg-gray-100 max-w-24 md:max-w-30 overflow-hidden text-ellipsis"
                    title={player.name ? player.name : `#${player.num}`}>
                    {player.name ? player.name : `#${player.num}`}
                  </td>
                  <td className="p-1 md:p-3 text-center">{player.fgm}-{player.fga}</td>
                  <td className="p-1 md:p-3 text-center">{player.thm}-{player.tha}</td>
                  <td className="p-1 md:p-3 text-center">{player.ftm}-{player.fta}</td>
                  <td className="p-1 md:p-3 text-center">{player.oreb}</td>
                  <td className="p-1 md:p-3 text-center">{player.reb}</td>
                  <td className="p-1 md:p-3 text-center">{player.ast}</td>
                  <td className="p-1 md:p-3 text-center">{player.stl}</td>
                  <td className="p-1 md:p-3 text-center">{player.blk}</td>
                  <td className="p-1 md:p-3 text-center">{player.tov}</td>
                  <td className="p-1 md:p-3 text-center">{player.fls}</td>
                  <td className="py-1 px-2 md:p-3 text-right font-bold sticky right-0 bg-gray-100">
                    {player.pts}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 border-t-2 border-gray-800 font-bold">
                <td className="p-1 md:p-3 text-center bg-gray-100 sticky left-0">TOTALS</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.fgp}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.thp}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.ftp}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.oreb}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.reb}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.ast}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.stl}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.blk}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.tov}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.fls}</td>
                <td className="py-1 px-2 md:p-3 text-right sticky right-0 bg-gray-100">
                  {homeTotals.pts}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default async function Game({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const res = await fetch(
    `${BASE_URL}/games/public/id/${slug}`,
    { cache: 'no-store' }
  )
  const game = await res.json()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-start bg-white sm:items-start">
        <BoxScore gameData={game} />
      </main>
    </div>
  );
}
