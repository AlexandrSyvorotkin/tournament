import type { Tournament } from '@/features/tournaments/model/tournaments'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { FeaturedBanner } from './featured-banner'
import { TournamentCard } from './tournament-card'

export function TournamentsList({ tournaments }: { tournaments: Tournament[] }) {
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
      <FeaturedBanner />
      {tournaments.length === 0 ? (
        <div className="rounded-xl bg-[#171a22] px-6 py-16 text-center text-sm text-zinc-400">
          Нет турниров по выбранным фильтрам.
        </div>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-3 pr-3">
            {tournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </ScrollArea>
      )}
    </main>
  )
}
