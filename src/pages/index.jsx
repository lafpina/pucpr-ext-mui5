// import MainLayout from "../components/layouts/mainLayouts";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import FaceIcon from "@material-ui/icons/Face";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import { LogoAlerteMe } from "../components/includes/LogoAlerteMe";

// import { DisplayAlert } from "../components/lib/utils/alerts";

const useMainMenuStyles = makeStyles({
  settingIcon: {
    color: "SteelBlue",
  },
});

export default function HomePage() {
  const classes = useMainMenuStyles();
  return (
    <div className={styles.container}>
      {/* <MainLayout> */}
      <main className={styles.main}>
        <LogoAlerteMe size={"large"} color={"blue"} />

        {/* <DisplayAlert type="error" msg="Mensagem de Erro de teste" /> */}

        <div className={styles.grid}>
          {/* <Link href="/"> */}
            <Link href="/orders">
            <a className={styles.card}>
              <VerifiedUserIcon
                className={classes.settingIcon}
                fontSize="large"
              ></VerifiedUserIcon>
              <h3>Análise de Risco</h3>
              <p>Analisar e Gerir Riscos de Fraude</p>
            </a>
          </Link>

          <Link href="/chargeback">
            <a className={styles.card}>
              <AnnouncementOutlinedIcon
                className={classes.settingIcon}
                fontSize="large"
              ></AnnouncementOutlinedIcon>
              <h3>Chargeback</h3>
              <p>Consultar Chargebacks Reportados</p>
            </a>
          </Link>

          <Link href="/client">
            <a className={styles.card}>
              <FaceIcon
                className={classes.settingIcon}
                fontSize="large"
              ></FaceIcon>
              <h3>Perfil</h3>
              <p>Analisar Perfil do Cliente</p>
            </a>
          </Link>

          <Link href="/rules">
            <a className={styles.card}>
              <SettingsIcon
                className={classes.settingIcon}
                fontSize="large"
              ></SettingsIcon>
              <h3>Configuração</h3>
              <p>Definir Perfis e Regras</p>
            </a>
          </Link>
        </div>
      </main>
      {/* </MainLayout> */}
    </div>
  );
}
