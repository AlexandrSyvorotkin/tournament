import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

function Spinner({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      role="status"
      aria-label="Загрузка"
      viewBox="0 0 48 48"
      fill="none"
      className={cn('size-4 animate-spin text-[#e24a1b]', className)}
      {...props}
    >
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-20"
      />
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="28 85"
      />
      <circle cx="24" cy="6" r="2.4" fill="currentColor" />
    </svg>
  )
}

function Loader({
  label = 'Загрузка',
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5 rounded-xl bg-[#171a22] px-6 py-20',
        className,
      )}
    >
      <div className="relative grid size-20 place-items-center">
        <span className="absolute inset-0 animate-pulse rounded-full bg-[#e24a1b]/30 blur-2xl" />
        <span className="absolute inset-0 rounded-full border border-[#e24a1b]/25" />
        <Spinner className="relative size-12" aria-hidden />
      </div>
      <p className="text-xs font-medium tracking-[0.32em] text-zinc-400 uppercase">
        {label}
      </p>
    </div>
  )
}

export { Loader, Spinner }
