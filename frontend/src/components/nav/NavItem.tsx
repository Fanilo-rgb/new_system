import {Link} from "react-router-dom";

type navItemProps = {
  placeholder: string,
  to: string,
}

const NavItem = ({ placeholder, to }: navItemProps) => {
  return (
    <li className="w-26 md:w-32">
      <Link className="h-10 text-sm md:text-base grid place-items-center link" to={to}>
        {placeholder}
      </Link>
    </li>
  )
}
export default NavItem
