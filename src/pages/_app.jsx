import React from "react";
import PropTypes from "prop-types";
import Header from "../components/includes/Header";
// import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../styles/globals.css";
import theme from "../theme";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// Allow us to customize the body HTML document
// import MainLayout from "../components/includes/mainLayouts";
// import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//   return (
//     // <MainLayout>
//       <Component {...pageProps} />
//     // </MainLayout>
//   );
// }

// export default MyApp;
