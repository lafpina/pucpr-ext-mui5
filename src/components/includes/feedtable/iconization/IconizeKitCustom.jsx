import { makeStyles } from "@material-ui/styles";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined"; // Kit Customizado

export function IconizeKitCustom(props) {
  const classes = kitCustomStyles();

  if (props.kitCustom < 0) {

    return (
      <TextsmsOutlinedIcon
        className={classes.kitCustom}
        fontSize={props.size}
      />
    );
  }

  return null;
}

const kitCustomStyles = makeStyles({
  kitCustom: {
    color: "HotPink",
  },
});
