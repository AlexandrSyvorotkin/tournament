export type TournamentStatus = 'upcoming' | 'past'
export type TournamentMode = '1v1' | '2v2' | '5v5'
export type TournamentDiscipline = 'Дота' | 'CS' | 'FIFA' | 'Valorant'

export type Tournament = {
  id: string
  name: string
  start: string
  mode: TournamentMode
  discipline: TournamentDiscipline
  prize: string
}

export const statusTabs: { id: TournamentStatus; label: string }[] = [
  { id: 'upcoming', label: 'Будущие' },
  { id: 'past', label: 'Прошедшие' },
]

export const modes: TournamentMode[] = ['1v1', '2v2', '5v5']
export const disciplines: TournamentDiscipline[] = ['Дота', 'CS', 'FIFA', 'Valorant']

const tournamentsSheetUrl =
  'https://script.google.com/macros/s/AKfycbylJI5CzulAg7LstuoVLfAKt6lqil4L3jEvG9En-bBQNGEv8qg5bPJCeahoPZSF7zzX/exec'

const modeSet = new Set<string>(modes)
const disciplineSet = new Set<string>(disciplines)

export function isTournamentPast(start: string, now = new Date()) {
  const [day, month, year] = start.split('.').map(Number)
  const tournamentDay = new Date(year, month - 1, day)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return tournamentDay < today
}

export function getTournamentStatus(start: string): TournamentStatus {
  return isTournamentPast(start) ? 'past' : 'upcoming'
}

function isTournament(value: unknown): value is Tournament {
  if (!value || typeof value !== 'object') return false
  const row = value as Record<string, unknown>
  return (
    typeof row.id === 'string' &&
    row.id.trim() !== '' &&
    typeof row.name === 'string' &&
    typeof row.start === 'string' &&
    typeof row.mode === 'string' &&
    modeSet.has(row.mode) &&
    typeof row.discipline === 'string' &&
    disciplineSet.has(row.discipline) &&
    typeof row.prize === 'string'
  )
}

let tournamentsRequest: Promise<Tournament[]> | null = null

export function loadTournaments() {
  if (!tournamentsRequest) {
    tournamentsRequest = fetchTournaments().catch((error: unknown) => {
      tournamentsRequest = null
      throw error
    })
  }
  return tournamentsRequest
}

async function fetchTournaments() {
  const response = await fetch(tournamentsSheetUrl)
  if (!response.ok) throw new Error('Не удалось загрузить турниры')
  const data: unknown = await response.json()
  if (!Array.isArray(data)) throw new Error('Не удалось загрузить турниры')
  return data.filter(isTournament)
}
