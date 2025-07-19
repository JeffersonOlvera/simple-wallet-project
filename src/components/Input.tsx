import React from 'react'

type InputProps = {
  id?: string
  label: string
  placeholder?: string
  type?: string
  block?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({
  id,
  label,
  placeholder,
  type = 'text',
  block = false,
  className = '',
  ...props
}: InputProps) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div
      className={`${block ? 'flex flex-col gap-2' : 'flex items-center gap-2'} ${className}`}
    >
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md p-2 w-full transition-colors focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
        {...props}
      />
    </div>
  )
}

export default Input
