export default function Leaders({ leaders }: any) {
  const ptsLeaderHome = leaders[0].pts[0] > 0 ? leaders[0].pts[0] : '--'
  const ptsLeaderHomeName = leaders[0].pts[0] > 0 ? `${leaders[0].pts[1]}` : '--'
  const ptsLeaderAway = leaders[1].pts[0] > 0 ? leaders[1].pts[0] : '--'
  const ptsLeaderAwayName = leaders[1].pts[0] > 0 ? `${leaders[1].pts[1]}` : '--'
  const rebLeaderHome = leaders[0].reb[0] > 0 ? leaders[0].reb[0] : '--'
  const rebLeaderHomeName = leaders[0].reb[0] > 0 ? `${leaders[0].reb[1]}` : '--'
  const rebLeaderAway = leaders[1].reb[0] > 0 ? leaders[1].reb[0] : '--'
  const rebLeaderAwayName = leaders[1].reb[0] > 0 ? `${leaders[1].reb[1]}` : '--'
  const astLeaderHome = leaders[0].ast[0] > 0 ? leaders[0].ast[0] : '--'
  const astLeaderHomeName = leaders[0].ast[0] > 0 ? `${leaders[0].ast[1]}` : '--'
  const astLeaderAway = leaders[1].ast[0] > 0 ? leaders[1].ast[0] : '--'
  const astLeaderAwayName = leaders[1].ast[0] > 0 ? `${leaders[1].ast[1]}` : '--'
  const defStatsHome = []
  leaders[0].def[0] > 0 && defStatsHome.push(leaders[0].def[0] + ' stl')
  leaders[0].def[1] > 0 && defStatsHome.push(leaders[0].def[1] + ' blk')
  const defLeaderHome = defStatsHome.length ? defStatsHome.join(', ') : '--'
  const defLeaderHomeName = defStatsHome.length ? `${leaders[0].def[2]}` : '--'
  const defStatsAway = []
  leaders[1].def[0] > 0 && defStatsAway.push(leaders[1].def[0] + ' stl')
  leaders[1].def[1] > 0 && defStatsAway.push(leaders[1].def[1] + ' blk')
  const defLeaderAway = defStatsAway.length ? defStatsAway.join(', ') : '--'
  const defLeaderAwayName = defStatsAway.length ? `${leaders[1].def[2]}` : '--'
  return <div className="text-sm md:text-lg w-full grid grid-cols-12 divide-x divide-gray-200">
    {/* Points */}
    <div className="flex-1 flex flex-col justify-center items-center py-1 px-2 col-span-3">
      <div className="text-gray-800 text-center whitespace-nowrap w-full overflow-hidden text-ellipsis">{ptsLeaderAwayName}</div>
      <div className="font-bold text-gray-800">{ptsLeaderAway}</div>
      <div className="text-xs text-gray-500 uppercase font-semibold">PTS</div>
      <div className="font-bold text-gray-800">{ptsLeaderHome}</div>
      <div className="text-gray-800 text-center whitespace-nowrap w-full overflow-hidden text-ellipsis">{ptsLeaderHomeName}</div>
    </div>

    {/* REB */}
    <div className="flex-1 flex flex-col justify-center items-center py-1 px-2 col-span-3">
      <div className="text-gray-800 text-center whitespace-nowrap w-full overflow-hidden text-ellipsis">{rebLeaderAwayName}</div>
      <div className="font-bold text-gray-800">{rebLeaderAway}</div>
      <div className="text-xs text-gray-500 uppercase font-semibold">REB</div>
      <div className="font-bold text-gray-800">{rebLeaderHome}</div>
      <div className="text-gray-800 text-center whitespace-nowrap w-full overflow-hidden text-ellipsis">{rebLeaderHomeName}</div>
    </div>

    {/* AST */}
    <div className="md:text-lg flex-1 flex flex-col justify-center items-center py-1 px-2 col-span-3">
      <div className="text-gray-800 text-center whitespace-nowrap w-full overflow-hidden text-ellipsis">{astLeaderAwayName}</div>
      <div className="font-bold text-gray-800">{astLeaderAway}</div>
      <div className="text-xs text-gray-500 uppercase font-semibold">AST</div>
      <div className="font-bold text-gray-800">{astLeaderHome}</div>
      <div className="text-gray-800 text-center whitespace-nowrap w-full overflow-hidden text-ellipsis">{astLeaderHomeName}</div>
    </div>

    {/* DEF */}
    <div className="md:text-lg flex-1 flex flex-col justify-center items-center py-1 px-2 col-span-3">
      <div className="text-gray-800 text-center whitespace-nowrap w-full overflow-hidden text-ellipsis">{defLeaderAwayName}</div>
      <div className="font-bold text-gray-800">{defLeaderAway}</div>
      <div className="text-xs text-gray-500 uppercase font-semibold">DEF</div>
      <div className="font-bold text-gray-800">{defLeaderHome}</div>
      <div className="text-gray-800 text-center whitespace-nowrap w-full overflow-hidden text-ellipsis">{defLeaderHomeName}</div>
    </div>
  </div>

}
