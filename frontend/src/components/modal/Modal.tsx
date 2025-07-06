import { motion } from 'motion/react';
import React from 'react'

type modalProps = {
  children: React.ReactNode;
}

const Modal = ({children}: modalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 top-0 left-0 grid place-items-center bg-gradient-to-t from-black/20 to-transparent backdrop-blur-xs w-screen h-screen p-2"
    >
      {children}
    </motion.div>
  )
}
export default Modal
