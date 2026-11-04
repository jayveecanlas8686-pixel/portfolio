import { motion } from 'framer-motion'
import { useReducedMotion } from '../../lib/useReducedMotion.js'
import { fadeUp } from '../../lib/motion.js'

// Fades a block up once as it scrolls into view. With reduced motion it renders as a plain element.
export default function Reveal({ as = 'div', children, ...rest }) {
  const reduced = useReducedMotion()
  if (reduced) {
    const Tag = as
    return <Tag {...rest}>{children}</Tag>
  }
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
