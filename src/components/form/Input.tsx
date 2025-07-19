import * as React from 'react'

import { cn } from '@/lib/utils'
import { useField } from '@/hooks/form'

type InputProps = React.ComponentProps<'input'> & {
  label?: string
  error?: string
  placeholder?: string
}

function Input({ className, type, label, ...props }: InputProps) {
  const fieldContext = useField()

  const error = props.error || fieldContext.errors[0]?.message

  const onBlur = props.onBlur || fieldContext.field?.handleBlur

  const value = props.value || fieldContext.field?.state.value

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
          {label}
        </label>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          // Base styles
          'flex min-w-0 rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-base transition-all outline-none',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-500 dark:placeholder:text-gray-400',
          'border border-gray-300 dark:border-gray-600',
          'shadow-sm dark:shadow-lg',
          // Focus states
          'focus:border-purple-500 dark:focus:border-purple-400',
          'focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20',
          // Error states
          error &&
            'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400',
          error && 'focus:ring-red-500/20 dark:focus:ring-red-400/20',
          // Disabled states
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'disabled:bg-gray-50 dark:disabled:bg-gray-800',
          // File input styles
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'file:text-gray-700 dark:file:text-gray-300',
          // Height for non-checkbox inputs
          type !== 'checkbox' && 'h-10',
          // Selection styles
          'selection:bg-purple-500 selection:text-white',
          className,
        )}
        {...props}
        value={value as string}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e)
          } else if (fieldContext.field?.handleChange) {
            fieldContext.field.handleChange(e.target.value)
          }
        }}
        onBlur={onBlur}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 transition-colors">
          {error}
        </p>
      )}
    </div>
  )
}

export { Input }
