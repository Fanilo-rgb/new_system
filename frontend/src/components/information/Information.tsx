type informationProps = {
  text: string;
}

const Information = ({text}: informationProps) => {
  return (
    <li>{text}</li>
  )
}
export default Information
