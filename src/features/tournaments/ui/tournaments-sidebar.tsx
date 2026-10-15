import { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import {
  disciplines,
  modes,
  statusTabs,
  type TournamentDiscipline,
  type TournamentMode,
  type TournamentStatus,
} from '@/features/tournaments/model/tournaments'
import { FilterSelect } from './filter-select'

type OpenFilter = 'discipline' | 'mode' | null

export function TournamentsSidebar({
  status,
  mode,
  discipline,
  onStatusChange,
  onModeChange,
  onDisciplineChange,
  onReset,
}: {
  status: TournamentStatus
  mode: TournamentMode | null
  discipline: TournamentDiscipline | null
  onStatusChange: (status: TournamentStatus) => void
  onModeChange: (mode: TournamentMode) => void
  onDisciplineChange: (discipline: TournamentDiscipline) => void
  onReset: () => void
}) {
  const [openFilter, setOpenFilter] = useState<OpenFilter>(null)

  function resetFilters() {
    setOpenFilter(null)
    onReset()
  }

  return (
    <aside className="flex w-full shrink-0 flex-col gap-3 lg:sticky lg:top-4 lg:w-[232px] lg:self-start">
      <div className="flex overflow-hidden rounded-lg bg-[#171a22] lg:flex-col">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onStatusChange(tab.id)}
            className={cn(
              'flex-1 px-3 py-3 text-center text-sm transition-colors lg:w-full lg:px-4 lg:text-left',
              status === tab.id
                ? 'bg-[#2a3142] font-medium'
                : 'text-zinc-300 hover:bg-white/5',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-1 px-1 text-sm text-zinc-400 lg:mt-2">Фильтры</div>

      <div className="relative z-10 grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
        <FilterSelect
          label="Дисциплины"
          value={discipline}
          open={openFilter === 'discipline'}
          onToggle={() =>
            setOpenFilter((current) =>
              current === 'discipline' ? null : 'discipline',
            )
          }
          options={disciplines.map((item) => ({ id: item, label: item }))}
          onSelect={(value) => {
            onDisciplineChange(value as TournamentDiscipline)
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
      </div>

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
