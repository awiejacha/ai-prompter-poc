import React from "react";
import Navbar from "./Navbar";
import Head from "next/head";
import Script from "next/script";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" />
      <Script
        src="https://kit.fontawesome.com/28dadcff72.js"
        crossorigin="anonymous"
      />
      <Navbar />
      {children}
    </>
  );
};
export default Layout;
