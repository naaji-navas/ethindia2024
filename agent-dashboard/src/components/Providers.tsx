'use client';

import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_COINBASE_ONCHAINKIT_API_KEY}
      projectId={process.env.NEXT_PUBLIC_COINBASE_ONCHAINKIT_PROJECT_ID}
      chain={base}
    >
      {children}
    </OnchainKitProvider>
  );
} 