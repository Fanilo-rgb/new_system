import React from 'react'

type filterContainerProps = {
  children: React.ReactNode
}

const FilterContainer = ({ children }: filterContainerProps) => {
  return (
    <ul className="flex gap-2">
      {children}
    </ul>
  )
}
export default FilterContainer
