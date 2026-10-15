import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import {
  modes,
  regions,
  statusTabs,
  type TournamentMode,
  type TournamentStatus,
} from '@/features/tournaments/model/tournaments'
import { FilterSelect } from './filter-select'

type OpenFilter = 'region' | 'mode' | null

export function TournamentsSidebar({
  status,
  mode,
  region,
  premiumOnly,
  onStatusChange,
  onModeChange,
  onRegionChange,
  onPremiumChange,
  onReset,
}: {
  status: TournamentStatus
  mode: TournamentMode | null
  region: string | null
  premiumOnly: boolean
  onStatusChange: (status: TournamentStatus) => void
  onModeChange: (mode: TournamentMode) => void
  onRegionChange: (region: string) => void
  onPremiumChange: (premiumOnly: boolean) => void
  onReset: () => void
}) {
  const [openFilter, setOpenFilter] = useState<OpenFilter>(null)

  function resetFilters() {
    setOpenFilter(null)
    onReset()
  }

  return (
    <aside className="sticky top-4 flex w-[232px] shrink-0 flex-col gap-3 self-start">
      <button
        type="button"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#e24a1b] text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-[#f25a28]"
      >
        <Plus className="size-4" />
        Создать турнир
      </button>

      <div className="overflow-hidden rounded-lg bg-[#171a22]">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onStatusChange(tab.id)}
            className={cn(
              'block w-full px-4 py-3 text-left text-sm transition-colors',
              status === tab.id
                ? 'bg-[#2a3142] font-medium'
                : 'text-zinc-300 hover:bg-white/5',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-2 px-1 text-sm text-zinc-400">Фильтры</div>

      <FilterSelect
        label="Регионы"
        value={region}
        open={openFilter === 'region'}
        onToggle={() =>
          setOpenFilter((current) => (current === 'region' ? null : 'region'))
        }
        options={regions.map((item) => ({ id: item, label: item }))}
        onSelect={(value) => {
          onRegionChange(value)
          setOpenFilter(null)
        }}
      />
      <FilterSelect
        label="Режимы"
        value={mode}
        open={openFilter === 'mode'}
        onToggle={() =>
          setOpenFilter((current) => (current === 'mode' ? null : 'mode'))
        }
        options={modes.map((item) => ({ id: item, label: item }))}
        onSelect={(value) => {
          onModeChange(value as TournamentMode)
          setOpenFilter(null)
        }}
      />

      <button
        type="button"
        role="checkbox"
        aria-checked={premiumOnly}
        onClick={() => onPremiumChange(!premiumOnly)}
        className="flex items-center gap-3 rounded-lg bg-[#171a22] px-4 py-3 text-left text-sm"
      >
        <span
          className={cn(
            'grid size-4 place-items-center rounded-[3px] border',
            premiumOnly ? 'border-[#e24a1b] bg-[#e24a1b]' : 'border-zinc-500',
          )}
        >
          {premiumOnly ? (
            <span className="size-2 rounded-[1px] bg-white" />
          ) : null}
        </span>
        Premium
      </button>

      <button
        type="button"
        onClick={resetFilters}
        className="mt-1 h-11 rounded-lg bg-[#3a3f4b] text-sm font-medium text-zinc-100 transition-colors hover:bg-[#4a5060]"
      >
        Сброс
      </button>
    </aside>
  )
}
