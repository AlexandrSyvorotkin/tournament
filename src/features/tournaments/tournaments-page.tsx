import { useState } from 'react'
import {
  getTournamentStatus,
  type TournamentDiscipline,
  type TournamentMode,
  type TournamentStatus,
} from '@/features/tournaments/model/tournaments'
import { useTournaments } from '@/features/tournaments/model/use-tournaments'
import { Loader } from '@/shared/ui/spinner'
import { TournamentsList } from './ui/tournaments-list'
import { TournamentsSidebar } from './ui/tournaments-sidebar'

export function TournamentsPage() {
  const [status, setStatus] = useState<TournamentStatus>('upcoming')
  const [mode, setMode] = useState<TournamentMode | null>(null)
  const [discipline, setDiscipline] = useState<TournamentDiscipline | null>(null)
  const { tournaments, error } = useTournaments()

  const visible = (tournaments ?? []).filter((tournament) => {
    if (getTournamentStatus(tournament.start) !== status) return false
    if (mode && tournament.mode !== mode) return false
    if (discipline && tournament.discipline !== discipline) return false
    return true
  })

  function resetFilters() {
    setStatus('upcoming')
    setMode(null)
    setDiscipline(null)
  }

  return (
    <div className="min-h-svh bg-[#0c0e13] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 p-3 sm:p-4 lg:flex-row">
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
          <div className="flex min-w-0 flex-1 items-center justify-center rounded-xl bg-[#171a22] px-6 py-16 text-center text-sm text-zinc-400">
            Не удалось загрузить турниры.
          </div>
        ) : !tournaments ? (
          <Loader label="Загрузка" className="min-w-0 flex-1" />
        ) : (
          <TournamentsList tournaments={visible} />
        )}
      </div>
    </div>
  )
}
