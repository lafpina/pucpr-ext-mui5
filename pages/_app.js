// Allow us to customize the body HTML document
import MainLayout from "../components/layouts/mainLayouts";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />;
    </MainLayout>
  );
}

export default MyApp;
