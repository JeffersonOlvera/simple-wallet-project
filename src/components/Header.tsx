import { Link } from '@tanstack/react-router'
import {
  Button,
  ThemeButton,
  // ProfileIcon
} from '@/components'

export const Header = () => {
  return (
    <header className="p-2  flex gap-2 bg-white text-black shadow">
      <nav className="flex px-5 flex-row w-screen justify-between items-center">
        <div className="px-2 py-2 font-bold">
          <Link to="/events">
            Wallet<span className="text-purple-500">fy</span>2
          </Link>
        </div>
        <div className="flex gap-2">
          {/* <Link to="/events/create/new"> */}

          <Link to="/events/create/$id" params={{ id: 'new' }}>
            <Button
              label="Crear evento"
              variant="outline"
              color="purple"
              className="hidden sm:inline-flex"
            ></Button>
          </Link>
          {/* </Link> */}
          <ThemeButton />
        </div>

        {/* <ProfileIcon /> */}
      </nav>
    </header>
  )
}
