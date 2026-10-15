import { Link } from '@tanstack/react-router'
import banner from '@/shared/assets/logo2.png'

export function FeaturedBanner() {
  return (
    <Link
      to="/tournaments/$tournamentId"
      params={{ tournamentId: 'aim-vip' }}
      className="block overflow-hidden rounded-xl"
    >
      <img src={banner} alt="Киберклуб" className="h-auto w-full" />
    </Link>
  )
}
