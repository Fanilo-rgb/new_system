import React from "react";

type navListProps = {
  children: React.ReactNode,
  notHidden?: boolean,
}

const NavList = ({ children, notHidden }: navListProps) => {
  return (
    <li className={`${ notHidden ? "block" : "hidden lg:block" }`}>
      {children}
    </li>
  )
}
export default NavList
