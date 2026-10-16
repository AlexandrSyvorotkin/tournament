import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useTournaments } from '@/features/tournaments/model/use-tournaments'
// import { TournamentHero } from './ui/tournament-hero'
import { Loader } from '@/shared/ui/spinner'
import { TournamentOverview } from './ui/tournament-overview'
import banner from '@/shared/assets/logo2.png'

const Banner = () => {
  return (
    <img src={banner} alt="Киберклуб" className="h-auto w-full" />
  )
}

export function TournamentPage({ tournamentId }: { tournamentId: string }) {
  const { tournaments, error } = useTournaments()
  const tournament = tournaments?.find((item) => item.id === tournamentId)

  useEffect(() => {
    if (tournament) document.title = tournament.name
  }, [tournament])

  return (
    <div className="min-h-svh">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-3 py-4 sm:px-4 sm:py-6">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-[#101218] px-3 py-2 text-sm text-zinc-100 shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-colors hover:bg-[#171a22]"
        >
          <ChevronLeft className="size-4" />
          К турнирам
        </Link>

        {error ? (
          <div className="rounded-xl bg-[#171a22] px-6 py-16 text-center text-sm text-zinc-400">
            Не удалось загрузить турнир.
          </div>
        ) : !tournaments ? (
          <Loader label="Загрузка" />
        ) : tournament ? (
          <>
            <Banner/>
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
