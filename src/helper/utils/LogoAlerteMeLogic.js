export const LogoAlerteMeLogic = (size, color) => {
  let parm = {
    logo: null,
    w: null,
    h: null,
  };

  if (color == "blue") {
    parm.logo = "/LogoAlerteMe2.png";
  } else {
    parm.logo = "/LogoAlerteMe.png";
  }

  switch (size) {
    case "small":
      parm.w = 81;
      parm.h = 35;
      break;
    case "medium":
      parm.w = 98;
      parm.h = 42;
      break;
    case "large":
      parm.w = 120;
      parm.h = 52;
      break;
    default:
      parm.w = 81;
      parm.h = 35;
  }

  return parm;
};
