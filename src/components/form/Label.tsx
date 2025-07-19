interface Props extends React.ComponentPropsWithoutRef<'label'> {
  label: string
}

export const Label = ({ label }: Props) => {
  return (
    <p className="text-gray-900 dark:text-gray-100 font-medium transition-colors">
      {label}
    </p>
  )
}
