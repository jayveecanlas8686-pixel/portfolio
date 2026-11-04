// One motion vocabulary for the whole site: short fade-ups on a soft ease-out, small stagger.
// No loops, no bouncing, no moving backgrounds. Reduced motion turns all of it off.
export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export const stagger = (step = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})
