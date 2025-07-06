import React from 'react'

type informationContainerProps = {
  children: React.ReactNode
}

const InformationContainer = ({children}: informationContainerProps) => {
  return (
    <ul>
      {children}
    </ul>
  )
}
export default InformationContainer
