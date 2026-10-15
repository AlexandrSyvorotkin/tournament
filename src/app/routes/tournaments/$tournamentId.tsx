import { createFileRoute } from '@tanstack/react-router'
import { TournamentPage } from '@/features/tournaments'
import { getTournamentById } from '@/features/tournaments/model/tournaments'

export const Route = createFileRoute('/tournaments/$tournamentId')({
  component: TournamentRoute,
  head: ({ params }) => ({
    meta: [
      {
        title: getTournamentById(params.tournamentId)?.name ?? 'Турнир не найден',
      },
    ],
  }),
})

function TournamentRoute() {
  const { tournamentId } = Route.useParams()
  return <TournamentPage tournamentId={tournamentId} />
}
