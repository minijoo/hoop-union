import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Page",
  description: "",
};

const BASE_URL = process.env.NODE_ENV === 'production' ? 
  "https://demo.jordys.site" : "http://localhost:8000"

const BoxScore = ({ gameData }: {gameData: any}) => {
  // If no game data is provided, show sample data
  const defaultGameData = {
    away: "Celtics",
    home: "Lakers",
    period_scores: [[-1, -1], [-1, -1], [-1, -1], [8, 3]],
    title: "Celtics @ Lakers",
    lines: [
      { side: 1, num: 9, pts: 0, fga: 0, fgm: 0, thm: 0, tha: 0, ftm: 0, fta: 0, oreb: 0, reb: 0, blk: 0, ast: 2, tov: 0, stl: 0, fls: 0 },
      { side: 1, num: 34, pts: 5, fga: 2, fgm: 2, thm: 1, tha: 1, ftm: 0, fta: 0, oreb: 0, reb: 0, blk: 0, ast: 0, tov: 0, stl: 0, fls: 0 },
      { side: 1, num: 5, pts: 0, fga: 0, fgm: 0, thm: 0, tha: 0, ftm: 0, fta: 0, oreb: 0, reb: 1, blk: 0, ast: 0, tov: 0, stl: 1, fls: 0 },
      { side: 1, num: 24, pts: 3, fga: 1, fgm: 1, thm: 1, tha: 1, ftm: 0, fta: 0, oreb: 0, reb: 0, blk: 0, ast: 0, tov: 0, stl: 0, fls: 0 },
      { side: 1, num: 2, pts: 0, fga: 0, fgm: 0, thm: 0, tha: 0, ftm: 0, fta: 0, oreb: 0, reb: 1, blk: 0, ast: 0, tov: 0, stl: 0, fls: 0 },
      { side: 1, num: 12, pts: 0, fga: 0, fgm: 0, thm: 0, tha: 0, ftm: 0, fta: 0, oreb: 0, reb: 0, blk: 0, ast: 1, tov: 0, stl: 0, fls: 0 },
      { side: 0, num: 24, pts: 3, fga: 1, fgm: 1, thm: 1, tha: 1, ftm: 0, fta: 0, oreb: 0, reb: 0, blk: 0, ast: 0, tov: 0, stl: 0, fls: 0 },
      { side: 0, num: 34, pts: 0, fga: 0, fgm: 0, thm: 0, tha: 0, ftm: 0, fta: 0, oreb: 0, reb: 0, blk: 0, ast: 1, tov: 0, stl: 0, fls: 0 },
      { side: 0, num: 7, pts: 0, fga: 0, fgm: 0, thm: 0, tha: 0, ftm: 0, fta: 0, oreb: 0, reb: 0, blk: 0, ast: 1, tov: 0, stl: 0, fls: 0 }
    ]
  };

  const game = gameData || defaultGameData;

  // Separate players by team (side: 0 = home, 1 = away)
  const homePlayers = game.lines.filter((line: any) => line.side === 0);
  const awayPlayers = game.lines.filter((line: any) => line.side === 1);

  // Calculate totals for a team
  const calculateTotals = (players: any) => {
    return players.reduce((totals :any, player :any) => ({
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
    <div className="p-2 md:p-5 bg-gray-100 min-h-screen w-full">
      <style>{`
        td:first-child {
          position: sticky;
          left: 0;
          background-color: white;
          z-index: 5;
          box-shadow: 2px 0 4px rgba(0,0,0,0.1);
        }
        th:first-child {
          position: sticky;
          left: 0;
          z-index: 20;
          background-color: #1e3a8a;
        }
        tr.bg-gray-100 td:first-child {
          background-color: #f3f4f6;
        }
        .table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>

      <div className="text-center mb-5 md:mb-8">
        <h1 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">
          {game.title || `${game.away} @ ${game.home}`}
        </h1>
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

      {/* Away Team */}
      <div className="mb-6 md:mb-10 bg-white p-2 md:p-5 rounded-lg shadow">
        <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4 pb-2 border-b-2 border-gray-800">
          {game.away} (Away)
        </h2>
        <div className="table-wrapper">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap sticky top-0">Player</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">PTS</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">FGM-FGA</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">3PM-3PA</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">FTM-FTA</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">OREB</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">REB</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">AST</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">STL</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">BLK</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">TOV</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">PF</th>
              </tr>
            </thead>
            <tbody>
              {awayPlayers.map((player :any, idx :number) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="p-1 md:p-3 text-center font-bold whitespace-nowrap">#{player.num}</td>
                  <td className="p-1 md:p-3 text-center">{player.pts}</td>
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
                </tr>
              ))}
              <tr className="bg-gray-100 border-t-2 border-gray-800 font-bold">
                <td className="p-1 md:p-3 text-center bg-gray-100">TOTALS</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.pts}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.fgm}-{awayTotals.fga}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.thm}-{awayTotals.tha}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.ftm}-{awayTotals.fta}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.oreb}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.reb}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.ast}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.stl}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.blk}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.tov}</td>
                <td className="p-1 md:p-3 text-center">{awayTotals.fls}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Home Team */}
      <div className="bg-white p-2 md:p-5 rounded-lg shadow">
        <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4 pb-2 border-b-2 border-gray-800">
          {game.home} (Home)
        </h2>
        <div className="table-wrapper">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap sticky top-0">Player</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">PTS</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">FGM-FGA</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">3PM-3PA</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">FTM-FTA</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">OREB</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">REB</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">AST</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">STL</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">BLK</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">TOV</th>
                <th className="p-1 md:p-3 text-center text-xs whitespace-nowrap">PF</th>
              </tr>
            </thead>
            <tbody>
              {homePlayers.map((player :any, idx :number) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="p-1 md:p-3 text-center font-bold whitespace-nowrap">#{player.num}</td>
                  <td className="p-1 md:p-3 text-center">{player.pts}</td>
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
                </tr>
              ))}
              <tr className="bg-gray-100 border-t-2 border-gray-800 font-bold">
                <td className="p-1 md:p-3 text-center bg-gray-100">TOTALS</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.pts}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.fgm}-{homeTotals.fga}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.thm}-{homeTotals.tha}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.ftm}-{homeTotals.fta}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.oreb}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.reb}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.ast}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.stl}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.blk}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.tov}</td>
                <td className="p-1 md:p-3 text-center">{homeTotals.fls}</td>
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
    `${BASE_URL}/games/public/${slug}`,
    { cache: 'no-store' }
  )
  const game = await res.json()
  console.log(game)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-start bg-white sm:items-start">
        <BoxScore gameData={game} />
      </main>
    </div>
  );
}
