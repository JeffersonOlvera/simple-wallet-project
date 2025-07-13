interface CardProps {
  children?: React.ReactNode
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="border border-gray-300 bg-white shadow-md rounded-lg p-4 mb-4">
      {children}
    </div>
  )
}
