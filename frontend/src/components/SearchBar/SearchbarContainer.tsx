import React from "react"

type searchbarContainerProps = {
  children: React.ReactNode
}

const SearchbarContainer = ({ children }: searchbarContainerProps) => {
  return (
    <div className="flex gap-2 items-center">
      {children}
    </div>
  )
}
export default SearchbarContainer
