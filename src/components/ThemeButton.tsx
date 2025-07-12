import React from 'react'

const handleChangeTheme: React.MouseEventHandler<HTMLButtonElement> = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', newTheme)
  console.log(`Theme changed to: ${newTheme}`)
  localStorage.setItem('theme', newTheme)
}

export const ThemeButton = () => {
  return (
    <div>
      <button
        className="px-2 py-2 rounded-full bg-gray-800 hover:bg-gray-300 transition-colors"
        onClick={handleChangeTheme}
      >
        🌙
      </button>
    </div>
  )
}

export default ThemeButton