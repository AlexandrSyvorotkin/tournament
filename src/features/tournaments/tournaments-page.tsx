import { useState } from 'react'
import {
  tournaments,
  type TournamentMode,
  type TournamentStatus,
} from '@/features/tournaments/model/tournaments'
import { TournamentsList } from './ui/tournaments-list'
import { TournamentsSidebar } from './ui/tournaments-sidebar'

export function TournamentsPage() {
  const [status, setStatus] = useState<TournamentStatus>('upcoming')
  const [mode, setMode] = useState<TournamentMode | null>(null)
  const [region, setRegion] = useState<string | null>(null)
  const [premiumOnly, setPremiumOnly] = useState(false)

  const visible = tournaments.filter((tournament) => {
    if (tournament.status !== status) return false
    if (mode && tournament.mode !== mode) return false
    if (region && tournament.region !== region) return false
    if (premiumOnly && !tournament.premium) return false
    return true
  })

  function resetFilters() {
    setStatus('upcoming')
    setMode(null)
    setRegion(null)
    setPremiumOnly(false)
  }

  return (
    <div className="min-h-svh bg-[#0c0e13] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4 p-4">
        <TournamentsSidebar
          status={status}
          mode={mode}
          region={region}
          premiumOnly={premiumOnly}
          onStatusChange={setStatus}
          onModeChange={setMode}
          onRegionChange={setRegion}
          onPremiumChange={setPremiumOnly}
          onReset={resetFilters}
        />
        <TournamentsList tournaments={visible} />
      </div>
    </div>
  )
}
