interface Props extends React.ComponentPropsWithoutRef<'label'> {
  label: string
}

export const Label = ({ label }: Props) => {
  return <p>{label}</p>
}
