import { ChevronDown } from 'lucide-react'

export function FilterSelect({
  label,
  value,
  open,
  options,
  onToggle,
  onSelect,
}: {
  label: string
  value: string | null
  open: boolean
  options: { id: string; label: string }[]
  onToggle: () => void
  onSelect: (value: string) => void
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg bg-[#171a22] px-4 py-3 text-sm"
      >
        <span>{value ?? label}</span>
        <ChevronDown className="size-4 text-zinc-400" />
      </button>
      {open ? (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg bg-[#222633] shadow-lg">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="block w-full px-4 py-2.5 text-left text-sm hover:bg-white/5"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
