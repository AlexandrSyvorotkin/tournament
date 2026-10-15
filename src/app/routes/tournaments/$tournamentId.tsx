import { createFileRoute } from '@tanstack/react-router'
import { TournamentPage } from '@/features/tournaments'

export const Route = createFileRoute('/tournaments/$tournamentId')({
  component: TournamentRoute,
  head: () => ({
    meta: [{ title: 'Турнир' }],
  }),
})

function TournamentRoute() {
  const { tournamentId } = Route.useParams()
  return <TournamentPage tournamentId={tournamentId} />
}
