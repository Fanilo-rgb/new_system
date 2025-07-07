import { motion } from 'motion/react'
import React from 'react'

type informationContainerProps = {
  children: React.ReactNode
}

const InformationContainer = ({children}: informationContainerProps) => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.ul>
  )
}
export default InformationContainer
