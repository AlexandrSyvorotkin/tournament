import { useState } from 'react'
import {
  getTournamentStatus,
  type TournamentDiscipline,
  type TournamentListFilter,
  type TournamentMode,
} from '@/features/tournaments/model/tournaments'
import { useTournaments } from '@/features/tournaments/model/use-tournaments'
import { Loader } from '@/shared/ui/spinner'
import { TournamentsList } from './ui/tournaments-list'
import { TournamentsSidebar } from './ui/tournaments-sidebar'

export function TournamentsPage() {
  const [status, setStatus] = useState<TournamentListFilter>('all')
  const [mode, setMode] = useState<TournamentMode | null>(null)
  const [discipline, setDiscipline] = useState<TournamentDiscipline | null>(null)
  const { tournaments, error } = useTournaments()

  const visible = (tournaments ?? []).filter((tournament) => {
    if (status !== 'all' && getTournamentStatus(tournament.start) !== status) return false
    if (mode && tournament.mode !== mode) return false
    if (discipline && tournament.discipline !== discipline) return false
    return true
  })

  function resetFilters() {
    setStatus('all')
    setMode(null)
    setDiscipline(null)
  }

  return (
    <div className="flex h-svh overflow-hidden">
      <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col gap-4 p-3 sm:p-4 lg:flex-row">
        <TournamentsSidebar
          status={status}
          mode={mode}
          discipline={discipline}
          onStatusChange={setStatus}
          onModeChange={setMode}
          onDisciplineChange={setDiscipline}
          onReset={resetFilters}
        />
        {error ? (
          <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center rounded-xl bg-[#171a22] px-6 py-16 text-center text-sm text-zinc-400">
            Не удалось загрузить турниры.
          </div>
        ) : !tournaments ? (
          <Loader label="Загрузка" className="min-h-0 min-w-0 flex-1" />
        ) : (
          <TournamentsList tournaments={visible} />
        )}
      </div>
    </div>
  )
}
