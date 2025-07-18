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
    solid: 'bg-purple-600 text-white hover:bg-purple-700',
    outline:
      'border border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-100',
  },
  blue: {
    solid: 'bg-blue-600 text-white hover:bg-blue-700',
    outline:
      'border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-100',
  },
  red: {
    solid: 'bg-red-600 text-white hover:bg-red-700',
    outline:
      'border border-red-600 text-red-600 bg-transparent hover:bg-red-50',
    ghost: 'bg-transparent text-red-600 hover:bg-red-100',
  },
  gray: {
    solid: 'bg-gray-600 text-white hover:bg-gray-700',
    outline:
      'border border-gray-600 text-gray-600 bg-transparent hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
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
