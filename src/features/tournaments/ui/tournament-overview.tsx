import { useState, type ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import type {
  Tournament,
  TournamentMode,
} from '@/features/tournaments/model/tournaments'
import { RegionFlag } from './region-flag'
import { RegistrationDialog } from './registration-dialog'

const modeText: Record<TournamentMode, string> = {
  '1v1': 'Игроки выступают по одному и встречаются в дуэлях.',
  '2v2': 'В матче играют команды из двух участников.',
  '5v5': 'В матче играют команды из пяти участников.',
}

export function TournamentOverview({ tournament }: { tournament: Tournament }) {
  const [joined, setJoined] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const open =
    tournament.status === 'upcoming' && tournament.players < tournament.capacity
  const filled =
    tournament.capacity === 0
      ? 0
      : Math.min(100, Math.round((tournament.players / tournament.capacity) * 100))

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex flex-col gap-3">
        <section className="grid gap-3 sm:grid-cols-2">
          <Fact label="Начало" value={tournament.start} />
          <Fact label="Режим" value={tournament.mode} />
          <Fact
            label="Регион"
            value={
              <span className="inline-flex items-center gap-2">
                <RegionFlag region={tournament.region} />
                <span>
                  {tournament.region} + {tournament.regionExtra}
                </span>
              </span>
            }
          />
          <Fact label="Организатор" value={tournament.organizer} />
        </section>

        <section className="rounded-xl bg-[#171a22] px-5 py-4">
          <h2 className="text-sm font-medium text-zinc-400">О турнире</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-100">
            {tournament.organizer} проводит {tournament.name}. Старт —{' '}
            {tournament.start}. Сейчас зарегистрировано {tournament.players} из{' '}
            {tournament.capacity}. Призовой фонд — {tournament.prize}.
          </p>
        </section>

        <section className="rounded-xl bg-[#171a22] px-5 py-4">
          <h2 className="text-sm font-medium text-zinc-400">Формат</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-100">
            {modeText[tournament.mode]}
          </p>
        </section>
      </div>

      <aside className="flex h-fit flex-col gap-3 rounded-xl bg-[#171a22] p-5">
        <div>
          <div className="text-[11px] text-zinc-500">Призовой фонд</div>
          <div className="mt-1 text-2xl font-semibold">{tournament.prize}</div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-500">
            <span>Участники</span>
            <span>
              {tournament.players} / {tournament.capacity}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#e24a1b]"
              style={{ width: `${filled}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          disabled={!open || joined}
          onClick={() => setRegistrationOpen(true)}
          className={cn(
            'mt-1 h-11 rounded-lg text-sm font-semibold transition-colors',
            open && !joined
              ? 'bg-[#e24a1b] text-white hover:bg-[#f25a28]'
              : 'bg-[#3a3f4b] text-zinc-300',
          )}
        >
          {joinLabel(tournament, joined)}
        </button>
        {open ? (
          <RegistrationDialog
            open={registrationOpen}
            tournament={tournament}
            onOpenChange={setRegistrationOpen}
            onRegistered={() => setJoined(true)}
          />
        ) : null}
        <p className="text-center text-xs text-zinc-500">
          {joinHint(tournament, joined)}
        </p>
      </aside>
    </div>
  )
}

function Fact({
  label,
  value,
}: {
  label: string
  value: ReactNode
}) {
  return (
    <div className="rounded-xl bg-[#171a22] px-5 py-4">
      <div className="text-[11px] text-zinc-500">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  )
}

function joinLabel(tournament: Tournament, joined: boolean) {
  if (joined) return 'Вы зарегистрированы'
  if (tournament.status === 'past') return 'Турнир завершён'
  if (tournament.status === 'active') return 'Идёт сейчас'
  if (tournament.players >= tournament.capacity) return 'Мест нет'
  return 'Зарегистрироваться'
}

function joinHint(tournament: Tournament, joined: boolean) {
  if (joined) return 'Вы записаны на этот турнир'
  if (tournament.status === 'past') return 'Регистрация закрыта'
  if (tournament.status === 'active') return 'Матчи уже идут'
  if (tournament.players >= tournament.capacity) return 'Все места заняты'
  return 'Регистрация открыта'
}
