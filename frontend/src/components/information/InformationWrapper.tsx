import React from 'react'

type informationWrapperProps = {
  children: React.ReactNode;
  title: string;
}

const InformationWrapper = ({ children, title }: informationWrapperProps) => {
  return (
    <div className="flex-1 min-w-72 flex flex-col gap-4">
      <h2 className="text-left text-xl text-gray-800">{title}</h2>
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-row">
        {children}
      </div>
    </div>
  )
}
export default InformationWrapper
