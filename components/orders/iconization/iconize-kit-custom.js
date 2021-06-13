import { makeStyles } from "@material-ui/core/styles";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined"; // Kit Customizado

export function IconizeKitCustom(props) {
  const classes = kitCustomStyles();

  if (props.kitCustom > " ") {
    return (
      <TextsmsOutlinedIcon
        className={classes.kitCustom}
        fontSize={props.size}
      />
    );
  } else {
    return " ";
  }
}

const kitCustomStyles = makeStyles({
  kitCustom: {
    color: "HotPink",
  },
});
