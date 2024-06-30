import { AnimatePresence, motion } from 'framer-motion'
import { FunctionComponent } from 'react'

type Props = {
  initial?: boolean
  isVisible: boolean
}

const AnimatedCheckIcon: FunctionComponent<Props> = ({
  initial = true,
  isVisible,
}) => {
  return (
    <AnimatePresence initial={initial}>
      {isVisible && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="CheckIcon"
          color="#3DF110"
          width={40}
          height={40}
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0 }}
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: isVisible ? 'easeOut' : 'easeIn',
            }}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      )}
    </AnimatePresence>
  )
}

export default AnimatedCheckIcon
