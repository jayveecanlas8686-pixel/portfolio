import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'

// After a deploy, an open tab may ask for page files that no longer exist: reload to get the new version.
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()
  window.location.reload()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Framer Motion follows the visitor's reduced-motion setting everywhere. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
