import { MantineProvider, createTheme } from '@mantine/core'
import { useEffect, useState } from 'react'

type ProviderProps = {
  children?: React.ReactNode
}

const theme = createTheme({
  primaryColor: 'violet',
})

export function Provider({ children }: ProviderProps) {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setColorScheme(isDark ? 'dark' : 'light')
  }, [])

  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme={colorScheme}
    >
      {children}
    </MantineProvider>
  )
}
