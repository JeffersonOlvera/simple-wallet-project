import React from 'react'

type CardProps = {
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={`border border-gray-300 bg-white shadow-md rounded-lg p-4 mb-4 ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
