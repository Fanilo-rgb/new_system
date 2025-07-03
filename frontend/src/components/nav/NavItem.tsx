import {Link} from "react-router-dom";

type navItemProps = {
  placeholder: string,
  to: string,
}

const NavItem = ({ placeholder, to }: navItemProps) => {
  return (
    <li className="w-32 flex">
      <Link className="h-10 grid place-items-center link" to={to}>
        {placeholder}
      </Link>
    </li>
  )
}
export default NavItem
