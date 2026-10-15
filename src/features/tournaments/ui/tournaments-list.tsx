import type { Tournament } from '@/features/tournaments/model/tournaments'
import { FeaturedBanner } from './featured-banner'
import { TournamentCard } from './tournament-card'

export function TournamentsList({ tournaments }: { tournaments: Tournament[] }) {
  return (
    <main className="flex min-w-0 flex-1 flex-col gap-3">
      <FeaturedBanner />
      {tournaments.length === 0 ? (
        <div className="rounded-xl bg-[#171a22] px-6 py-16 text-center text-sm text-zinc-400">
          Нет турниров по выбранным фильтрам.
        </div>
      ) : (
        tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))
      )}
    </main>
  )
}
