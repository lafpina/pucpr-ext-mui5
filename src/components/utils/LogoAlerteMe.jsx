import Image from "next/image"

export const LogoAlerteMe = (props) => {

    const { size, color } = props

    let logo = null
    let w = null
    let h = null

    if (color == "blue") {
        // parm.logo = "/LogoAlerteMe2.png";
        logo = "/logo/Logo1.png";
    } else {
        // parm.logo = "/LogoAlerteMe.png";
        logo = "/logo/Logo2.png";
    }
       
    switch (size) {
        case "small":
            w = 84;
            h = 38;
        break;
        case "medium":
            w = 92;
            h = 44;
        break;
        case "large":
            w = 120;
            h = 56;
        break;
        default:
            w = 81;
            h = 35;
    }

    return (
        <Image
            src={logo} 
            alt="logo AlerteMe"
            width={w}
            height={h}
        /> 
    )
}