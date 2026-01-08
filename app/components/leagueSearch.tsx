"use client"
import { useEffect, useState, useRef } from "react";
import { FaRegCircleXmark } from "react-icons/fa6"

const parseRecentSearches = (jsonStr :any) => {
  let recents
  try {
    recents = JSON.parse(jsonStr)
    if (!Array.isArray(recents)) recents = []
  } catch {
    recents = []
  }

  return recents
}

const saveToLocalStorageThenGoToLeaguePage = (league :any) => {
  const curr = `${league.id};${league.name}`
  const path = `/leagues/${league.id}`
  const jsonStr = localStorage.getItem('league_recents')
  const recents = parseRecentSearches(jsonStr)
  const filtered = recents.filter(
    (el) => el.split(';')[0] !== league.id
  )
  if (filtered.length > 4) filtered.pop()
  filtered.unshift(curr)
  localStorage.setItem(
    'league_recents',
    JSON.stringify(filtered)
  )
  window.location.href = path
}

export default function LeagueSearch({ leagues } : { leagues : any}) {
  const [results, setResults] = useState<any[]>([])
  const search = (val :any) => {
    if (val.length < 2) {
      setResults([])
      return
    }
    const found = leagues.filter(
      (league :any) => league.name.toLowerCase().includes(val.toLowerCase())
    )
    console.log(found)
    setResults(found)
  }
  const inputRef = useRef<any>(null)
  const [recentSearches, setRecentSearches] = useState<any[]>([])

  useEffect(() => {
    const jsonStr = localStorage.getItem('league_recents')
    const recents = parseRecentSearches(jsonStr)
    setRecentSearches(recents.map((str) => {
      const split = str.split(';')
      if (!!split[0] && !!split[1])
        return { id: split[0], name: split[1] }
      return { id: 'lost', name: str }
    }))
  }, [])

  return <div className="w-full bg-blue-200 rounded-md p-2">
    <div className="relative">
      <input type="text" ref={inputRef}
        className="w-full border-1 rounded-md px-1 text-lg"
        placeholder="Search Leagues by Name/ID"
        onInput={() => {
          search(inputRef.current.value)
        }}
      />
      <div className="absolute right-2 top-0 h-full flex flex-col justify-center" 
        onClick={() => {
          inputRef.current.value = ""
          setResults([])
        }}
      >
        <FaRegCircleXmark />
      </div>
      {results.length 
        ? <div className="absolute top-full w-full">
          <div className="mx-1 bg-gray-100 flex flex-col divide-y divide-gray-200 drop-shadow-lg/50">
            {results.map((league) => (
              <div key={league.id} 
                onClick={() => {
                  saveToLocalStorageThenGoToLeaguePage(league)
                }}
                className="px-2 py-1 hover:bg-blue-100 hover:cursor-pointer active:bg-blue-100">
                ({league.id})&nbsp;
                {league.name}
                {league.location ? ` - ${league.location}` : ""}
              </div>
            ))}
          </div>
        </div>
        : <></>
      }
    </div>
    {recentSearches.length
      ? <div className="pt-2 flex gap-2 text-xs flex-wrap justify-left">
        <div className="pr-2">Recent Searches</div>
        {recentSearches.map((league, idx) => (
          <div key={league.id} 
            onClick={() => {
              saveToLocalStorageThenGoToLeaguePage(league)
            }}
            className="rounded-md bg-gray-100 px-1 py-1 flex-none hover:cursor-pointer hover:bg-blue-100 active:bg-blue-100">
            {`(${league.id}) ${league.name}`}
          </div>
        ))}
      </div>
      : <></>
    }
  </div>
}
