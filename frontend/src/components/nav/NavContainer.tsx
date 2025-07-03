import React from "react"

type navContainerProps = {
  children: React.ReactNode,
}

const NavContainer = ({ children }: navContainerProps) => {
  return (
    <ul className="flex gap-2">
      {children}
    </ul>
  )
}
export default NavContainer
