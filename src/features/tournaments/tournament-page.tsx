import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { getTournamentById } from '@/features/tournaments/model/tournaments'
import { TournamentHero } from './ui/tournament-hero'
import { TournamentOverview } from './ui/tournament-overview'

export function TournamentPage({ tournamentId }: { tournamentId: string }) {
  const tournament = getTournamentById(tournamentId)

  return (
    <div className="min-h-svh bg-[#0c0e13] text-white">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-4 py-6">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ChevronLeft className="size-4" />
          К турнирам
        </Link>

        {tournament ? (
          <>
            <TournamentHero tournament={tournament} />
            <TournamentOverview key={tournament.id} tournament={tournament} />
          </>
        ) : (
          <div className="rounded-xl bg-[#171a22] px-6 py-16 text-center">
            <p className="text-lg font-semibold">Турнир не найден</p>
            <p className="mt-2 text-sm text-zinc-400">
              Такой страницы нет в списке турниров.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
