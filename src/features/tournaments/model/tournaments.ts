export type TournamentStatus = 'upcoming' | 'active' | 'past'
export type TournamentMode = '1v1' | '2v2' | '5v5'

export type Tournament = {
  id: string
  name: string
  organizer: string
  start: string
  mode: TournamentMode
  region: string
  regionExtra: number
  players: number
  capacity: number
  prize: string
  premium: boolean
  status: TournamentStatus
  mark: string
  markClass: string
}

export const tournaments: Tournament[] = [
  {
    id: 'aim-vip',
    name: 'WINLINE AIM VIP',
    organizer: 'WINLINE',
    start: 'завтра в 20:00',
    mode: '1v1',
    region: 'RU',
    regionExtra: 1,
    players: 15,
    capacity: 256,
    prize: '$300 + 10800₽',
    premium: false,
    status: 'upcoming',
    mark: 'AIM\nVIP',
    markClass: 'bg-orange-600',
  },
  {
    id: 'aim-mini',
    name: 'WINLINE AIM Mini',
    organizer: 'WINLINE',
    start: 'через 42 минуты',
    mode: '1v1',
    region: 'RU',
    regionExtra: 1,
    players: 36,
    capacity: 1024,
    prize: '1900₽',
    premium: false,
    status: 'upcoming',
    mark: 'AIM\nMINI',
    markClass: 'bg-amber-700',
  },
  {
    id: 'pistol-king',
    name: 'Pistol King Cup',
    organizer: 'FASTCUP',
    start: 'сегодня в 17:00',
    mode: '1v1',
    region: 'RU',
    regionExtra: 3,
    players: 70,
    capacity: 1024,
    prize: '$10',
    premium: false,
    status: 'upcoming',
    mark: 'PST',
    markClass: 'bg-rose-700',
  },
  {
    id: 'gift-practice',
    name: 'GIFT Practice Cup',
    organizer: 'FASTCUP',
    start: 'сегодня в 18:00',
    mode: '5v5',
    region: 'RU',
    regionExtra: 3,
    players: 15,
    capacity: 512,
    prize: '$10',
    premium: false,
    status: 'upcoming',
    mark: 'GIFT',
    markClass: 'bg-fuchsia-700',
  },
  {
    id: 'random-2v2',
    name: 'Random 2v2 AIM Cup',
    organizer: 'FASTCUP',
    start: 'сегодня в 19:00',
    mode: '2v2',
    region: 'RU',
    regionExtra: 3,
    players: 37,
    capacity: 1024,
    prize: '$20',
    premium: false,
    status: 'upcoming',
    mark: '2v2',
    markClass: 'bg-yellow-700',
  },
  {
    id: 'aimasters',
    name: 'AIMasters',
    organizer: 'FASTCUP',
    start: 'сегодня в 21:00',
    mode: '1v1',
    region: 'EU',
    regionExtra: 3,
    players: 8,
    capacity: 512,
    prize: '$50',
    premium: true,
    status: 'upcoming',
    mark: 'AIM',
    markClass: 'bg-orange-800',
  },
  {
    id: 'elite-snipers',
    name: 'Elite Snipers Cup',
    organizer: 'FASTCUP',
    start: 'сегодня в 21:00',
    mode: '1v1',
    region: 'RU',
    regionExtra: 3,
    players: 19,
    capacity: 1024,
    prize: '$10',
    premium: false,
    status: 'upcoming',
    mark: 'SNP',
    markClass: 'bg-red-800',
  },
  {
    id: 'midnight',
    name: 'Midnight Wingman',
    organizer: 'FASTCUP',
    start: 'сегодня в 23:00',
    mode: '2v2',
    region: 'RU',
    regionExtra: 3,
    players: 11,
    capacity: 1024,
    prize: '$20',
    premium: false,
    status: 'upcoming',
    mark: 'WNG',
    markClass: 'bg-indigo-800',
  },
  {
    id: 'headhunters',
    name: 'HeadHunters',
    organizer: 'FASTCUP',
    start: 'завтра в 01:00',
    mode: '1v1',
    region: 'RU',
    regionExtra: 3,
    players: 5,
    capacity: 1024,
    prize: '$10',
    premium: false,
    status: 'upcoming',
    mark: 'HH',
    markClass: 'bg-zinc-700',
  },
  {
    id: 'live-clash',
    name: 'Night Clash',
    organizer: 'FASTCUP',
    start: 'идёт сейчас',
    mode: '5v5',
    region: 'EU',
    regionExtra: 2,
    players: 10,
    capacity: 10,
    prize: '$40',
    premium: false,
    status: 'active',
    mark: 'LIVE',
    markClass: 'bg-emerald-700',
  },
  {
    id: 'past-cup',
    name: 'Sunday Aim Cup',
    organizer: 'WINLINE',
    start: 'вчера в 19:00',
    mode: '1v1',
    region: 'RU',
    regionExtra: 1,
    players: 128,
    capacity: 128,
    prize: '5000₽',
    premium: true,
    status: 'past',
    mark: 'SUN',
    markClass: 'bg-slate-600',
  },
]

export const statusTabs: { id: TournamentStatus; label: string }[] = [
  { id: 'upcoming', label: 'Будущие' },
  { id: 'active', label: 'Активные' },
  { id: 'past', label: 'Прошедшие' },
]

export const modes: TournamentMode[] = ['1v1', '2v2', '5v5']
export const regions = ['RU', 'EU']

export function getTournamentById(id: string) {
  return tournaments.find((tournament) => tournament.id === id)
}
