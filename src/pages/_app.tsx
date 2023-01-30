import StoreProvider, { Store } from '@/context/Store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />;
    </StoreProvider>
  );
}
