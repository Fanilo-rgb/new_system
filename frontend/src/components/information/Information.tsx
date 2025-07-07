type informationProps = {
  text: string | null | undefined;
}

const Information = ({text}: informationProps) => {
  return (
    <li>{text}</li>
  )
}
export default Information
