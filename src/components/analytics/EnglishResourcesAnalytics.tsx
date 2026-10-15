'use client'

import { useEffect } from 'react'

export default function EnglishResourcesAnalytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({
      event: 'english_resources_view',
      content_area: 'english-reference-library',
      resource_count: 5,
      page_path: window.location.pathname,
    })

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const control = event.target.closest<HTMLElement>('[data-resource-cta]')
      if (!control) return
      const anchor = control.closest<HTMLAnchorElement>('a[href]')
      let destination = ''
      if (anchor) {
        try { destination = new URL(anchor.href).pathname } catch { destination = '' }
      }
      window.dataLayer?.push({
        event: 'english_resource_click',
        content_area: 'english-reference-library',
        cta_id: control.dataset.resourceCta,
        resource_id: control.dataset.resourceId ?? '',
        destination,
        page_path: window.location.pathname,
      })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}
