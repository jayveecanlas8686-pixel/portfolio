import { useEffect } from 'react'

const SITE = 'Jayvee Canlas'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} | Automation, Data & AI`
  }, [title])
}
