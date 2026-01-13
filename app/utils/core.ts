const preprocessGamesForSummary = (games : any[]) => {
  const PLAYER_LABEL = 'Player'

  games.forEach((game :any) => {
    game.leaders = [{},{}]
    game.leaders[0].pts = [0]
    game.leaders[0].ast = [0]
    game.leaders[0].reb = [0]
    game.leaders[0].def = [0,0]
    game.leaders[1].pts = [0]
    game.leaders[1].ast = [0]
    game.leaders[1].reb = [0]
    game.leaders[1].def = [0,0]
    game.lines.forEach((line :any)=> {
      const name =
        line.name ? line.name : `${PLAYER_LABEL} ${line.num}`
      if (line.side >= 2) return
      if (line.pts >= game.leaders[line.side].pts[0]) {
        game.leaders[line.side].pts = [line.pts, name]
      }
      if (line.ast >= game.leaders[line.side].ast[0]) {
        game.leaders[line.side].ast = [line.ast, name]
      }
      if (line.reb >= game.leaders[line.side].reb[0]) {
        game.leaders[line.side].reb = [line.reb, name]
      }
      if (
        line.stl + line.blk
          >= (
            game.leaders[line.side].def[0] + game.leaders[line.side].def[1]
          )
      ){
        game.leaders[line.side].def = [line.stl, line.blk, name]
      }
    })
  })
}

export { preprocessGamesForSummary }
