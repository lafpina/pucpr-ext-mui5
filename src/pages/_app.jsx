import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head"; // Para adicionar metadados no documento
import { ThemeProvider, CssBaseline } from "@mui/material";
import Header from "../components/includes/layoutaccessories/Header";
import "../styles/globals.css";
import theme from "../theme";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Meu Aplicativo</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
