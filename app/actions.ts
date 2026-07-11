'use server';

const BASE_URL = process.env.APP_ENV === 'production' ?
  "https://bucky.jordys.site" : process.env.APP_ENV === 'staging' ?
    "https://demo.jordys.site" : "http://localhost:8000"

const APIKEY = process.env.BUCKY_API_KEY || '';

export async function fetchLeagueGames(
  leagueId: string, tags: string, lastDate: string = '', lastBaseGameId: string = '', limit: number = 10
) {
  const params = [];
  tags && params.push(['tags', tags]);
  lastDate && params.push(['last_submitted_on', lastDate]);
  lastBaseGameId && params.push(['last_base_game_id', lastBaseGameId]);
  params.push(['limit', limit.toString()]);
  const searchParams = new URLSearchParams(params);

  const resp = await fetch(
    `${BASE_URL}/games/public/league/${leagueId}${searchParams.size ? '?' + searchParams.toString() : ''}`,
    { cache: 'no-store' }
  );

  return await resp.json();
}

export async function fetchLeagueInfo(leagueId: string) {
  const resp0 = await fetch(
    `${BASE_URL}/leagues/${leagueId}`,
    {
      cache: 'no-store',
      headers: {
        'x-key': APIKEY
      }
    }
  )
  return await resp0.json();
}

