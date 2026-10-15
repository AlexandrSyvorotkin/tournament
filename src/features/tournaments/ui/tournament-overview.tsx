import { useState, type ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import {
  isTournamentPast,
  type Tournament,
  type TournamentMode,
} from '@/features/tournaments/model/tournaments'
import { RegistrationDialog } from './registration-dialog'

const modeText: Record<TournamentMode, string> = {
  '1v1': 'Игроки выступают по одному и встречаются в дуэлях.',
  '2v2': 'В матче играют команды из двух участников.',
  '5v5': 'В матче играют команды из пяти участников.',
}

export function TournamentOverview({ tournament }: { tournament: Tournament }) {
  const [joined, setJoined] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const closed = isTournamentPast(tournament.start)

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex flex-col gap-3">
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <Fact label="Начало" value={tournament.start} />
          <Fact label="Режим" value={tournament.mode} />
          <Fact
            label="Дисциплина"
            value={tournament.discipline}
            className="col-span-2 lg:col-span-1"
          />
        </section>

        <section className="rounded-xl bg-[#171a22] px-5 py-4">
          <h2 className="text-sm font-medium text-zinc-400">О турнире</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-100">
            {tournament.name}. Старт — {tournament.start}. Призовой фонд —{' '}
            {tournament.prize}.
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
          <div className="mt-1 text-xl font-semibold break-words sm:text-2xl">
            {tournament.prize}
          </div>
        </div>

        <button
          type="button"
          disabled={closed || joined}
          onClick={() => setRegistrationOpen(true)}
          className={cn(
            'mt-1 h-11 rounded-lg text-sm font-semibold transition-colors',
            !closed && !joined
              ? 'bg-[#e24a1b] text-white hover:bg-[#f25a28]'
              : 'bg-[#3a3f4b] text-zinc-300',
          )}
        >
          {joinLabel(closed, joined)}
        </button>
        {closed ? null : (
          <RegistrationDialog
            open={registrationOpen}
            tournament={tournament}
            onOpenChange={setRegistrationOpen}
            onRegistered={() => setJoined(true)}
          />
        )}
        <p className="text-center text-xs text-zinc-500">
          {joinHint(closed, joined)}
        </p>
      </aside>
    </div>
  )
}

function joinLabel(closed: boolean, joined: boolean) {
  if (joined) return 'Вы зарегистрированы'
  if (closed) return 'Турнир завершён'
  return 'Зарегистрироваться'
}

function joinHint(closed: boolean, joined: boolean) {
  if (joined) return 'Вы записаны на этот турнир'
  if (closed) return 'Регистрация закрыта'
  return 'Регистрация открыта'
}

function Fact({
  label,
  value,
  className,
}: {
  label: string
  value: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-xl bg-[#171a22] px-5 py-4', className)}>
      <div className="text-[11px] text-zinc-500">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  )
}
