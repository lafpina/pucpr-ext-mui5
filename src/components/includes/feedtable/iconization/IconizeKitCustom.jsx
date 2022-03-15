import { makeStyles } from "@material-ui/styles";
import { TextsmsOutlined } from "@material-ui/icons"; // Kit Customizado

export function IconizeKitCustom(props) {
  const classes = kitCustomStyles();

  if (props.kitCustom < 0) {

    return (
      <TextsmsOutlined
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
