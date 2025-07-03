import {Link} from "react-router-dom";

type menuListProps = {
  onToggle: () => void;
  link: { placeholder: string, to: string }[];
}

const MenuList = ({ onToggle, link }: menuListProps) => {
  const linkList = link.map((l) => (
    <li className="w-full flex">
      <Link
        to={l.to}
        onClick={onToggle} className=" w-full bg-transparent hover:bg-black/10 px-2 py-1 rounded-md transition-all"
      >
        {l.placeholder}
      </Link>
    </li>
  ))

  return (
    <div className="absolute right-0 top-12 bg-white/90 w-fit rounded-xl overflow-hidden text-sm">
      <ul className="p-2 flex flex-col gap-2 w-48">
        {linkList}
      </ul>
    </div>
  )
}
export default MenuList
