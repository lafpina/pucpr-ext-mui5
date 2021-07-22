import Image from "next/image"
import { makeStyles } from "@material-ui/core/styles"
import { LogoAlerteMeLogic } from "./LogoAlerteMeLogic"

const logoStyle = makeStyles({
    logoMain: {
        height: 3.5,
        Margintop: 0,
        Marginbottom: 0.01
      }
})

export const LogoAlerteMe = (props) => {
    const classes = logoStyle();
    const { size, color } = props
    const parm = LogoAlerteMeLogic(size, color)
    return (
        <Image
            src={parm.logo} 
            alt="logo AlerteMe"
            className={classes.logoMain}
            width={parm.w}
            height={parm.h}
        /> 
    )
}