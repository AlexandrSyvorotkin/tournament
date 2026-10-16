import { Link } from '@tanstack/react-router'
import banner from '@/shared/assets/logo2.png'

export function FeaturedBanner() {
  return (
    <Link
      to="/tournaments/$tournamentId"
      params={{ tournamentId: 'aim-vip' }}
      className="block overflow-hidden rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.5)] ring-1 ring-black/40"
    >
      <img src={banner} alt="Киберклуб" className="h-auto w-full" />
    </Link>
  )
}
