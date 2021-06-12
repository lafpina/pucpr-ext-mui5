import styles from "../../styles/Home.module.css";
import Header from "../includes/header";
import Footer from "../includes/footer";

const MainLayout = (props) => (
  <>
    <Header />
    <div className="mainlayout container">{props.children}</div>
    <Footer />
  </>
);

export default MainLayout;
