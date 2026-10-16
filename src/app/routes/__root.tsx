import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import background from '@/shared/assets/bg.png'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <div className="relative min-h-svh text-white">
        <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
          <img
            src={background}
            alt=""
            className="h-full w-full object-cover blur-[2px]"
          />
          <div className="absolute inset-0 bg-[#0c0e13]/15" />
        </div>
        <div className="relative">
          <Outlet />
        </div>
      </div>
    </>
  )
}
