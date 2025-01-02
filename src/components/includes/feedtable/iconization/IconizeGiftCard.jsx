import { styled } from "@mui/material/styles";
import CardGiftcardOutlined from "@mui/icons-material/CardGiftcardOutlined";

// Estilização usando styled
const StyledGiftCardIcon = styled(CardGiftcardOutlined)(({ theme }) => ({
  color: "LightSkyBlue",
}));

export function IconizeGiftCard(props) {
  if (props.giftId > " ") {
    return (
      <StyledGiftCardIcon fontSize={props.size || "default"} />
    );
  } else {
    return " ";
  }
}
