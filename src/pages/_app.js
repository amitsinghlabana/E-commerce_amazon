import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import {SessionProvider} from "next-auth/react";

import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}> 
      <Provider store={store}>
      <Head>
        <title>Amazon - Online shopping site</title>
        <link rel="icon" href="https://pngimg.com/uploads/amazon/amazon_PNG18.png" />
      
      </Head>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
   
  )
}

export default MyApp
