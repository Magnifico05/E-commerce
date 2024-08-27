import { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "./global.css";
import { UserProvider } from '../context/UserContext';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/layout'; // Adjust the import path as needed


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>E-commerce</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      
      <UserProvider>
        <CartProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
      </CartProvider>
      </UserProvider>
    
    </Fragment> 
  );
} 

export default MyApp;
