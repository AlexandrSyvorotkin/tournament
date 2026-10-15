import { cn } from '@/shared/lib/utils'
import type { Tournament, TournamentStatus } from '@/features/tournaments/model/tournaments'

const statusLabel: Record<TournamentStatus, string> = {
  upcoming: 'Предстоящий',
  active: 'Идёт сейчас',
  past: 'Завершён',
}

const statusClass: Record<TournamentStatus, string> = {
  upcoming: 'bg-white/10 text-zinc-100',
  active: 'bg-emerald-500/20 text-emerald-300',
  past: 'bg-white/10 text-zinc-400',
}

export function TournamentHero({ tournament }: { tournament: Tournament }) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-black">
      <div className="absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(115deg,#ff7a18_0%,#ff3d00_42%,transparent_72%)]" />
      <div className="absolute inset-y-0 right-0 w-[38%] bg-[linear-gradient(245deg,#ff7a18_0%,#ff3d00_42%,transparent_72%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_28px,rgba(0,0,0,0.28)_28px_36px)]" />
      <div className="relative flex items-center gap-5 px-6 py-8">
        <div
          className={cn(
            'grid size-20 shrink-0 place-items-center rounded-lg text-center text-xs leading-tight font-black whitespace-pre-line',
            tournament.markClass,
          )}
        >
          {tournament.mark}
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-semibold tracking-[0.32em] text-orange-400">
            {tournament.organizer}
          </div>
          <h1 className="mt-1 text-3xl font-black tracking-tight italic sm:text-4xl">
            {tournament.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-[11px] tracking-wide',
                statusClass[tournament.status],
              )}
            >
              {statusLabel[tournament.status]}
            </span>
            {tournament.premium ? (
              <span className="rounded-full bg-[#e24a1b] px-3 py-1 text-[11px] font-semibold tracking-wide">
                PREMIUM
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
