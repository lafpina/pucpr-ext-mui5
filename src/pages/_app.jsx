import * as React from "react";
import PropTypes from "prop-types";
import Header from "../components/includes/layoutaccessories/Header";
import { ThemeProvider } from '@mui/material/styles';
import "../styles/globals.css";
import theme from "../theme";


export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};


