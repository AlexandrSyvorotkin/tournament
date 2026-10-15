import type { Tournament } from '@/features/tournaments/model/tournaments'

export function TournamentHero({ tournament }: { tournament: Tournament }) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-black">
      <div className="absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(115deg,#ff7a18_0%,#ff3d00_42%,transparent_72%)]" />
      <div className="absolute inset-y-0 right-0 w-[38%] bg-[linear-gradient(245deg,#ff7a18_0%,#ff3d00_42%,transparent_72%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_28px,rgba(0,0,0,0.28)_28px_36px)]" />
      <div className="relative px-6 py-8">
        <h1 className="text-3xl font-black tracking-tight italic sm:text-4xl">
          {tournament.name}
        </h1>
      </div>
    </section>
  )
}
