import Typography from "@mui/material/Typography";
import Link from "next/link";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...props}>
      <Link href="https://www.fraldasdipano.com.br/" color="primary">
        Dipano
      </Link>{" "}
      {new Date().getFullYear()}
      
    </Typography>
  );
};

export default Copyright;
