'use client';

import { applyTheme } from '@/lib/useContent';
import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyTheme();
  }, []);

  return <>{children}</>;
}
