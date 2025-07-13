import { Link } from '@tanstack/react-router'
import { ThemeButton, ProfileIcon } from '@/components'

export const Header = () => {
  return (
    <header className="p-2  flex gap-2 bg-white text-black shadow">
      <nav className="flex flex-row w-screen justify-between">
        <div className="px-2 py-2 font-bold">
          <Link to="/">Walletfy2</Link>
        </div>
        <ThemeButton />

        <ProfileIcon />
      </nav>
    </header>
  )
}
