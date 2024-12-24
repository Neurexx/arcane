// pages/_app.js
"use client";
import Layout from '@/components/layout'; // Assuming Layout component is in the components folder
// import '@/styles/globals.css'; // Your global styles

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
