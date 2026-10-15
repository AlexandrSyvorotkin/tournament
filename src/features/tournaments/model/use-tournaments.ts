import { useEffect, useState } from 'react'
import { loadTournaments, type Tournament } from './tournaments'

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    loadTournaments()
      .then((list) => {
        if (active) setTournaments(list)
      })
      .catch(() => {
        if (active) setError(true)
      })
    return () => {
      active = false
    }
  }, [])

  return { tournaments, error }
}
