import { cn } from '@/lib/utils'
import React from 'react'

type ButtonVariant = 'solid' | 'outline' | 'ghost'
type ButtonColor = 'purple' | 'blue' | 'red' | 'gray'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  className?: string
  variant?: ButtonVariant
  color?: ButtonColor
}

const colorMap = {
  purple: {
    solid:
      'bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600',
    outline:
      'border border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-900/20',
    ghost:
      'bg-transparent text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20',
  },
  blue: {
    solid:
      'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600',
    outline:
      'border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20',
    ghost:
      'bg-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20',
  },
  red: {
    solid:
      'bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600',
    outline:
      'border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20',
    ghost:
      'bg-transparent text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20',
  },
  gray: {
    solid:
      'bg-gray-600 dark:bg-gray-500 text-white hover:bg-gray-700 dark:hover:bg-gray-600',
    outline:
      'border border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50',
    ghost:
      'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50',
  },
} as const

export const Button = ({
  label,
  className,
  variant = 'solid',
  color = 'purple',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'py-2 px-4 rounded text-sm font-medium transition-all duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
  const variantClasses = colorMap[color]?.[variant] ?? colorMap.purple.solid

  return (
    <button className={cn(baseClasses, variantClasses, className)} {...props}>
      {label}
      {props.children}
    </button>
  )
}
