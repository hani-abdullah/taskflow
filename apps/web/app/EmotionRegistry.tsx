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
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'mui', prepend: true });
    cache.compat = true;
    const originalInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }

      return originalInsert(...args);
    };

    const flush = () => {
      const names = inserted;
      inserted = [];
      return names;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const inserted = flush();

    if (inserted.length === 0) {
      return null;
    }

    const styles = inserted
      .map((key) => cache.inserted[key])
      .join(' ');

    return (
      <style
        data-emotion={`${cache.key} ${inserted.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
