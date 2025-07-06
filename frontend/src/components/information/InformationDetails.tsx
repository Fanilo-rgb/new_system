import React from 'react'

type informationDetailsProps = {
  children: React.ReactNode;
  title: string;
}

const InformationDetails = ({ children, title }: informationDetailsProps) => {
  return (
    <div className="flex flex-col items-start gap-1 min-w-60">
      <span className="text-gray-400 text-xs font-semibold">{title}</span>
      <ul className="flex flex-col items-start text-sm text-gray-700">
        {children}
      </ul>
    </div>
  )
}
export default InformationDetails
