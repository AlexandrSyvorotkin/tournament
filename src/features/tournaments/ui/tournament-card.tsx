import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import csImage from '@/shared/assets/csgo.jpeg'
import dotaImage from '@/shared/assets/dot.jpeg'
import fifaImage from '@/shared/assets/фиф.jpg'
import valorantImage from '@/shared/assets/val.jpeg'
import { cn } from '@/shared/lib/utils'
import type {
  Tournament,
  TournamentDiscipline,
} from '@/features/tournaments/model/tournaments'

const disciplineImage: Record<TournamentDiscipline, string> = {
  CS: csImage,
  Дота: dotaImage,
  FIFA: fifaImage,
  Valorant: valorantImage,
}

export function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <Link
      to="/tournaments/$tournamentId"
      params={{ tournamentId: tournament.id }}
      className="relative flex flex-col gap-3 overflow-hidden rounded-xl bg-[#171a22] px-4 py-3 transition-colors hover:bg-[#1e222d] lg:flex-row lg:items-center lg:gap-4"
    >
      <div className="flex min-w-0 items-center gap-3 lg:contents">
        <img
          src={disciplineImage[tournament.discipline]}
          alt={tournament.discipline}
          className="h-14 w-10 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold">{tournament.name}</div>
        </div>
        <ChevronRight className="size-5 shrink-0 text-zinc-500 lg:hidden" />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:contents">
        <Meta label="Начало" className="lg:w-[132px]">
          {tournament.start}
        </Meta>
        <Meta label="Режим" className="lg:w-14">
          {tournament.mode}
        </Meta>
        <Meta label="Дисциплина" className="lg:w-24">
          {tournament.discipline}
        </Meta>
        <Meta label="Призовой фонд" className="lg:w-32">
          {tournament.prize}
        </Meta>
      </div>

      <ChevronRight className="hidden size-5 shrink-0 text-zinc-500 lg:block" />
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

