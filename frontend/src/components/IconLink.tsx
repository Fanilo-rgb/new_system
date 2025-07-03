import {Link} from "react-router-dom";
import type {JSX} from "react";

type iconLinkProps = {
  icon: JSX.Element;
  placeholder: string;
  to: string;
}

const IconLink = ({icon, placeholder, to}: iconLinkProps) => {
  return (
    <Link className="flex items-center gap-2 h-10 px-2 link" to={to}>
      {icon}
      <span>{placeholder}</span>
    </Link>
  )
}
export default IconLink
