export type TournamentStatus = 'upcoming' | 'past'
export type TournamentMode = '1v1' | '2v2' | '5v5'
export type TournamentDiscipline = 'Дота' | 'CS' | 'FIFA' | 'Valorant'
export type TournamentReward = 'Деньги' | 'Бонусы'

export type Tournament = {
  id: string
  name: string
  start: string
  mode: TournamentMode
  discipline: TournamentDiscipline
  prize: string
  description: string
  format: string
  reward: TournamentReward | null
}

export type TournamentListFilter = 'all' | TournamentStatus

export const statusTabs: { id: TournamentListFilter; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'upcoming', label: 'Будущие' },
  { id: 'past', label: 'Прошедшие' },
]

export const modes: TournamentMode[] = ['1v1', '2v2', '5v5']
export const disciplines: TournamentDiscipline[] = ['Дота', 'CS', 'FIFA', 'Valorant']

const tournamentsSheetUrl =
  'https://script.google.com/macros/s/AKfycbwKvPuSHRf62qXdhsrhR7Mk43YNrmfZdyQaIjqLob-_j7qVVpskffLW5SX3yv5avAu-/exec'

const modeSet = new Set<string>(modes)
const disciplineSet = new Set<string>(disciplines)
const rewardByName: Record<string, TournamentReward> = {
  деньги: 'Деньги',
  бонусы: 'Бонусы',
}

export function isTournamentPast(start: string, now = new Date()) {
  const [day, month, year] = start.split('.').map(Number)
  const tournamentDay = new Date(year, month - 1, day)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return tournamentDay < today
}

export function getTournamentStatus(start: string): TournamentStatus {
  return isTournamentPast(start) ? 'past' : 'upcoming'
}

function readText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function readReward(value: unknown): TournamentReward | null {
  if (typeof value !== 'string') return null
  return rewardByName[value.trim().toLowerCase()] ?? null
}

function toTournament(value: unknown): Tournament | null {
  if (!value || typeof value !== 'object') return null
  const row = value as Record<string, unknown>
  if (
    typeof row.id !== 'string' ||
    row.id.trim() === '' ||
    typeof row.name !== 'string' ||
    typeof row.start !== 'string' ||
    typeof row.mode !== 'string' ||
    !modeSet.has(row.mode) ||
    typeof row.discipline !== 'string' ||
    !disciplineSet.has(row.discipline) ||
    typeof row.prize !== 'string'
  ) {
    return null
  }

  return {
    id: row.id,
    name: row.name,
    start: row.start,
    mode: row.mode as TournamentMode,
    discipline: row.discipline as TournamentDiscipline,
    prize: row.prize,
    description: readText(row.description),
    format: readText(row.format),
    reward: readReward(row.reward),
  }
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
  return data.flatMap((row) => {
    const tournament = toTournament(row)
    return tournament ? [tournament] : []
  })
}
