type ButtonProps = {
  className?: string
  color?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ className, color, ...props }: ButtonProps) => {
  return (
    <button
      className={`${color ? `bg-${color}-500` : 'bg-blue-500'} text-white py-2 px-4 rounded ${className}`}
      {...props}
    >
      {props.children}
    </button>
  )
}

export default Button
