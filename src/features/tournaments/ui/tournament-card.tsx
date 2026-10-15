import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { Tournament } from '@/features/tournaments/model/tournaments'
import { RegionFlag } from './region-flag'

export function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <Link
      to="/tournaments/$tournamentId"
      params={{ tournamentId: tournament.id }}
      className={cn(
        'relative flex items-center gap-4 overflow-hidden rounded-xl bg-[#171a22] px-4 py-3 transition-colors hover:bg-[#1e222d]',
        tournament.premium && 'pl-8',
      )}
    >
      {tournament.premium ? (
        <span className="absolute inset-y-0 left-0 flex w-6 items-center justify-center bg-[#e24a1b] text-[9px] font-bold tracking-[0.18em] text-white [writing-mode:vertical-rl] rotate-180">
          PREMIUM
        </span>
      ) : null}

      <div
        className={cn(
          'grid size-14 shrink-0 place-items-center rounded-md text-center text-[10px] leading-tight font-black whitespace-pre-line',
          tournament.markClass,
        )}
      >
        {tournament.mark}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold">{tournament.name}</div>
        <div className="text-xs tracking-wide text-zinc-500">
          {tournament.organizer}
        </div>
      </div>

      <Meta label="Начало" className="w-[132px]">
        {tournament.start}
      </Meta>
      <Meta label="Режим" className="w-14">
        {tournament.mode}
      </Meta>
      <Meta label="Регионы" className="w-20">
        <span className="inline-flex items-center gap-1.5">
          <RegionFlag region={tournament.region} />
          <span>+ {tournament.regionExtra}</span>
        </span>
      </Meta>
      <Meta label="Участники" className="w-24">
        {tournament.players} / {tournament.capacity}
      </Meta>
      <Meta label="Призовой фонд" className="w-32">
        {tournament.prize}
      </Meta>

      <ChevronRight className="size-5 shrink-0 text-zinc-500" />
    </Link>
  )
}

function Meta({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('shrink-0', className)}>
      <div className="text-[11px] text-zinc-500">{label}</div>
      <div className="mt-0.5 text-sm">{children}</div>
    </div>
  )
}

