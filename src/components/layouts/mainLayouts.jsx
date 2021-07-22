import styles from "../../styles/Home.module.css";
import Header from "../includes/Header";
import Footer from "../includes/Footer";

const MainLayout = (props) => (
  <>
    <Header />
    <div className="mainlayout container">{props.children}</div>
    <Footer />
  </>
);

export default MainLayout;
