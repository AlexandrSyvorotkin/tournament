export function RegionFlag({ region }: { region: string }) {
  if (region === 'EU') {
    return (
      <span className="inline-block h-3 w-4 rounded-[2px] bg-[#003399]" aria-hidden />
    )
  }

  return (
    <span
      className="inline-block h-3 w-4 overflow-hidden rounded-[2px] bg-white"
      aria-hidden
    >
      <span className="block h-1 bg-white" />
      <span className="block h-1 bg-[#0039a6]" />
      <span className="block h-1 bg-[#d52b1e]" />
    </span>
  )
}
