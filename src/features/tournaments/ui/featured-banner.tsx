import { Link } from '@tanstack/react-router'

export function FeaturedBanner() {
  return (
    <Link
      to="/tournaments/$tournamentId"
      params={{ tournamentId: 'aim-vip' }}
      className="relative block h-[132px] overflow-hidden rounded-xl bg-black"
    >
      <div className="absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(115deg,#ff7a18_0%,#ff3d00_42%,transparent_72%)]" />
      <div className="absolute inset-y-0 right-0 w-[38%] bg-[linear-gradient(245deg,#ff7a18_0%,#ff3d00_42%,transparent_72%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_28px,rgba(0,0,0,0.28)_28px_36px)]" />
      <div className="relative flex h-full flex-col items-center justify-center gap-3">
        <div className="text-center leading-none">
          <div className="text-[11px] font-semibold tracking-[0.42em] text-orange-400">
            WINLINE
          </div>
          <div className="text-[40px] font-black tracking-tight italic">
            AIM VIP
          </div>
        </div>
        <div className="rounded-full bg-black/70 px-4 py-1 text-[11px] tracking-wide text-zinc-100">
          • ФОРМАТ 1X1 • ПРИЗОВОЙ ФОНД 36 000 ₽ •
        </div>
      </div>
    </Link>
  )
}
