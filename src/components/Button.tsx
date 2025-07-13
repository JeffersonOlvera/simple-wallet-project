type ButtonProps = {
  label: string
  className?: string
  color?: string
  parentMethod?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  className,
  color,
  parentMethod,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${color ? `bg-${color}-500` : 'bg-blue-500'} text-white py-2 px-4 rounded ${className}`}
      {...props}
      onClick={parentMethod}
    >
      {label}
      {props.children}
    </button>
  )
}
