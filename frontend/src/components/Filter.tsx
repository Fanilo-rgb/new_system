type filterProps = {
  text: string;
}

const Filter = ({ text }: filterProps) => {
  return (
    <li className="hidden md:inline-block">
      <button className="text-gray-700 text-sm bg-white/80 hover:bg-white h-6 px-2 flex items-center rounded-md transition-all">
        {text}
      </button>
    </li>
  )
}
export default Filter
