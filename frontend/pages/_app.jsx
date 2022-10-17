import '../styles/globals.css'
import { useEffect } from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../store'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require('tw-elements')
  }, [])
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
