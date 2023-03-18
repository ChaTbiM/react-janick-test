import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import GlobalLayout from '~/components/common/GlobalLayout'

/**
 * MSW implementation
 */
// require is needed here to load the mocks before any rendering happens
// eslint-disable-next-line global-require
require('~/mocks')

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalLayout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </GlobalLayout>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
