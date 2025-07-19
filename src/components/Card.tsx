import React from 'react'

type CardProps = {
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={`border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-lg p-4 mb-4 transition-colors ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
