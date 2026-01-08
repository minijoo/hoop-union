const preprocessGamesForSummary = (games : any[]) => {
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
      if (line.side >= 2) return
      if (line.pts >= game.leaders[line.side].pts[0]) {
        game.leaders[line.side].pts = [line.pts, line.num]
      }
      if (line.ast >= game.leaders[line.side].ast[0]) {
        game.leaders[line.side].ast = [line.ast, line.num]
      }
      if (line.reb >= game.leaders[line.side].reb[0]) {
        game.leaders[line.side].reb = [line.reb, line.num]
      }
      if (
        line.stl + line.blk
          >= (
            game.leaders[line.side].def[0] + game.leaders[line.side].def[1]
          )
      ){
        game.leaders[line.side].def = [line.stl, line.blk, line.num]
      }
    })
  })
}

export { preprocessGamesForSummary }
