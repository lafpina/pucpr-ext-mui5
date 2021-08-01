import styles from "../../styles/Home.module.css";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = (props) => (
  <>
    <Header />
    <div className="mainlayout container">{props.children}</div>
    <Footer />
  </>
);

export default MainLayout;
