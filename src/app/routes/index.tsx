import { createFileRoute } from '@tanstack/react-router'
import { TournamentsPage } from '@/features/tournaments'

export const Route = createFileRoute('/')({
  component: TournamentsPage,
  head: () => ({
    meta: [{ title: 'Турниры' }],
  }),
})
