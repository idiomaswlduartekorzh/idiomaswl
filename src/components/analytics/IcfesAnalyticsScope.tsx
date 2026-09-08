'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackIcfesEvent } from '@/lib/analytics/icfes';

type ViewKind = 'exam-hub' | 'learning-cluster';

export default function IcfesAnalyticsScope({
  viewKind,
  resourceCount,
  modeCount,
}: {
  viewKind: ViewKind;
  resourceCount?: number;
  modeCount?: number;
}) {
  const pathname = usePathname();

  useEffect(() => {
    trackIcfesEvent(viewKind === 'exam-hub' ? 'icfes_hub_view' : 'icfes_learning_page_view', {
      resource_count: resourceCount,
      available_mode_count: modeCount,
      content_area: viewKind,
    });
  }, [modeCount, pathname, resourceCount, viewKind]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest<HTMLElement>('[data-icfes-cta]');
      if (!control) return;
      const anchor = control.closest<HTMLAnchorElement>('a[href]');
      let destination = control.dataset.icfesDestination ?? '';
      if (!destination && anchor) {
        try { destination = new URL(anchor.href).pathname; } catch { destination = ''; }
      }
      trackIcfesEvent('icfes_cta_click', {
        cta_id: control.dataset.icfesCta,
        destination,
        mode: control.dataset.icfesMode,
        resource_id: control.dataset.icfesResourceId,
        resource_kind: control.dataset.icfesResourceKind,
        surface: control.dataset.icfesSurface ?? viewKind,
      });
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [viewKind]);

  return null;
}
