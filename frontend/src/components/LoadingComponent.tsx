import { motion } from "motion/react"

const LoadingComponent = () => {
  const letters = 'Endraso kely'.split('')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full grid place-items-center"
    >
      <h1 className="flex gap-5 items-center justify-center">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="animate-bounce text-gradient"
            style={{ animationDelay: `-${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </h1>
    </motion.div>
  )
}

export default LoadingComponent