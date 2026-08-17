'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ cache }] = useState(() => {
    const cache = createCache({ key: 'mui', prepend: true });
    cache.compat = true;

    return { cache };
  });

  useServerInsertedHTML(() => {
    const inserted = Object.keys(cache.inserted);

    if (inserted.length === 0) {
      return null;
    }

    const styles = inserted
      .map((key) => cache.inserted[key])
      .join(' ');

    cache.inserted = {};

    return (
      <style
        data-emotion={`${cache.key} ${inserted.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
