// Allow us to customize the entire HTML document
//
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocuments extends Documents {
  render() {
    return (
      <Html lang="pt-br">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocuments;
