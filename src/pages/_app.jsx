import * as React from "react";
import PropTypes from "prop-types";
import Header from "../components/includes/layoutaccessories/Header";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/globals.css";
import theme from "../theme";
// import DateAdapter from '@mui/lab/AdapterMoment';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';


export default function MyApp(props) {

  const { Component, pageProps } = props;

  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Header />
      <ThemeProvider theme={theme}>
        {/* <LocalizationProvider dateAdapter={DateAdapter}> */}
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* <CssBaseline /> */}
        <Component {...pageProps} />
        {/* </LocalizationProvider> */}
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};


