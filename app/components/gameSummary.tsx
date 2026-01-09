export default function GameSummary({
  league, title, submittedOn, away, home, periodScores, leaders, baseGameId
} :any) {
  const PLAYER_LABEL = 'Player'
  const awayFinalScore = periodScores[3][0];
  const homeFinalScore = periodScores[3][1];
  const awayWon = awayFinalScore > homeFinalScore;
  const homeWon = homeFinalScore > awayFinalScore;

  const ptsLeaderHome = leaders[0].pts[0] > 0 ? leaders[0].pts[0] : '--'
  const ptsLeaderHomeName = leaders[0].pts[0] > 0 ? `${PLAYER_LABEL} #${leaders[0].pts[1]}` : '--'
  const ptsLeaderAway =  leaders[1].pts[0] > 0 ? leaders[1].pts[0] : '--'
  const ptsLeaderAwayName =  leaders[1].pts[0] > 0 ? `${PLAYER_LABEL} #${leaders[1].pts[1]}` : '--'
  const rebLeaderHome = leaders[0].reb[0] > 0 ? leaders[0].reb[0] : '--'
  const rebLeaderHomeName = leaders[0].reb[0] > 0 ? `${PLAYER_LABEL} #${leaders[0].reb[1]}` : '--'
  const rebLeaderAway =  leaders[1].reb[0] > 0 ? leaders[1].reb[0] : '--'
  const rebLeaderAwayName =  leaders[1].reb[0] > 0 ? `${PLAYER_LABEL} #${leaders[1].reb[1]}` : '--'
  const astLeaderHome = leaders[0].ast[0] > 0 ? leaders[0].ast[0] : '--'
  const astLeaderHomeName = leaders[0].ast[0] > 0 ? `${PLAYER_LABEL} #${leaders[0].ast[1]}` : '--'
  const astLeaderAway =  leaders[1].ast[0] > 0 ? leaders[1].ast[0] : '--'
  const astLeaderAwayName =  leaders[1].ast[0] > 0 ? `${PLAYER_LABEL} #${leaders[1].ast[1]}` : '--'
  const defStatsHome = []
  leaders[0].def[0] > 0 && defStatsHome.push(leaders[0].def[0] + ' stl')
  leaders[0].def[1] > 0 && defStatsHome.push(leaders[0].def[1] + ' blk')
  const defLeaderHome = defStatsHome.length ? defStatsHome.join(', ') : '--'
  const defLeaderHomeName = defStatsHome.length ? `${PLAYER_LABEL} #${leaders[0].def[2]}` : '--'
  const defStatsAway = []
  leaders[1].def[0] > 0 && defStatsAway.push(leaders[1].def[0] + ' stl')
  leaders[1].def[1] > 0 && defStatsAway.push(leaders[1].def[1] + ' blk')
  const defLeaderAway = defStatsAway.length ? defStatsAway.join(', ') : '--'
  const defLeaderAwayName = defStatsAway.length ? `${PLAYER_LABEL} #${leaders[1].def[2]}` : '--'

  const submittedOnText = (new Date(submittedOn)).toLocaleDateString(
    'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return (
    <a href={`/games/${baseGameId}`} className="hover:cursor-pointer">
      <div className="w-full max-w-4xl mx-auto py-1 px-2 md:px-3">
        <div className="border border-blue-900 rounded-lg overflow-hidden shadow-sm">
          {/* Header - Desktop */}
          <div className="hidden md:flex bg-blue-900 text-white px-4 py-1 items-center justify-between text-sm">
            <span className="font-semibold">{league}</span>
            <span className="flex-1 text-center">{title}</span>
            <span>{submittedOnText}</span>
          </div>

          {/* Header - Mobile */}
          <div className="md:hidden bg-blue-900 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs">
                <span className="font-semibold">{league}</span>
              </span>
              <span className="text-xs text-blue-200">{submittedOnText}</span>
              {false // to be removed
                ? <span className="text-sm font-semibold">{title}</span>
                : <></>
              }
            </div>
            <div className="flex flex-col items-end ml-3">
              <div className="flex items-center gap-2 w-full">
                <span className="w-[14.5px]"></span>
                <span className="text-lg font-semibold flex-1 pr-2">{away}</span>
                <span className={`text-lg ${awayWon ? 'font-bold' : 'font-normal'}`}>
                  {awayFinalScore}
                </span>
                {awayWon && (
                  <div 
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderRight: '8px solid white'
                    }}
                  />
                )}
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="flex-none">@</span>
                <span className="text-lg font-semibold flex-1 pr-2">{home}</span>
                <span className={`text-lg ${homeWon ? 'font-bold' : 'font-normal'}`}>
                  {homeFinalScore}
                </span>
                {homeWon && (
                  <div 
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderRight: '8px solid white'
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Leaders Divider - Mobile */}
          <div className="md:hidden flex items-center justify-center bg-blue-100 border-b border-gray-200">
            <div 
              className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Leaders
            </div>
          </div>

          {/* Stats Grid */}
          <div className="flex bg-white">
            {/* Final Score Block - Desktop*/}
            <div className="hidden md:flex flex-col justify-center px-4 py-3 bg-blue-50 border-r border-gray-200" style={{ minWidth: '140px' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">{away}</span>
                <div className="flex items-center ml-3">
                  <span className={`text-lg ${awayWon ? 'font-bold' : 'font-normal'} text-gray-800 mr-1`}>
                    {awayFinalScore}
                  </span>
                  {awayWon && (
                    <div 
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderRight: '10px solid black'
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500 italic text-center mb-2">Final</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">{home}</span>
                <div className="flex items-center ml-3">
                  <span className={`text-lg ${homeWon ? 'font-bold' : 'font-normal'} text-gray-800 mr-1`}>
                    {homeFinalScore}
                  </span>
                  {homeWon && (
                    <div 
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderRight: '10px solid black'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Leaders Divider - Desktop*/}
            <div className="hidden md:flex items-center justify-center bg-blue-100 border-r border-gray-200" style={{ width: '24px' }}>
              <div 
                className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
                style={{ 
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)'
                }}
              >
                Leaders
              </div>
            </div>

            {/* Stats Categories */}
            <div className="text-sm md:text-lg flex flex-1 divide-x divide-gray-200 flex-wrap">
              {/* Assists */}
              <div className="flex-1 flex flex-col justify-center items-center py-1">
                <div className="text-gray-800">{ptsLeaderAwayName}</div>
                <div className="font-bold text-gray-800">{ptsLeaderAway}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">PTS</div>
                <div className="font-bold text-gray-800">{ptsLeaderHome}</div>
                <div className="text-gray-800">{ptsLeaderHomeName}</div>
              </div>

              {/* REB */}
              <div className="md:text-lg flex-1 flex flex-col justify-center items-center py-3">
                <div className="text-gray-800">{rebLeaderAwayName}</div>
                <div className="font-bold text-gray-800">{rebLeaderAway}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">REB</div>
                <div className="font-bold text-gray-800">{rebLeaderHome}</div>
                <div className="text-gray-800">{rebLeaderHomeName}</div>
              </div>

              {/* AST */}
              <div className="md:text-lg flex-1 flex flex-col justify-center items-center py-3">
                <div className="text-gray-800">{astLeaderAwayName}</div>
                <div className="font-bold text-gray-800">{astLeaderAway}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">AST</div>
                <div className="font-bold text-gray-800">{astLeaderHome}</div>
                <div className="text-gray-800">{astLeaderHomeName}</div>
              </div>

              {/* DEF */}
              <div className="md:text-lg flex-1 flex flex-col justify-center items-center py-3">
                <div className="text-gray-800">{defLeaderAwayName}</div>
                <div className="font-bold text-gray-800">{defLeaderAway}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">DEF</div>
                <div className="font-bold text-gray-800">{defLeaderHome}</div>
                <div className="text-gray-800">{defLeaderHomeName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}


