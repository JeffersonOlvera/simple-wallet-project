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
      {/* <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}
      </label> */}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 bg-white rounded-md p-2 w-full"
        {...props}
      />
    </div>
  )
}

export default Input
