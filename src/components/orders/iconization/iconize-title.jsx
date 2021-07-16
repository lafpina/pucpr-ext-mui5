import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ListIcon from '@material-ui/icons/List';
import HouseIcon from '@material-ui/icons/House';
import InputIcon from '@material-ui/icons/Input';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FaceIcon from '@material-ui/icons/Face';
import CreditCardTwoToneIcon from '@material-ui/icons/CreditCardTwoTone';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';


export function IconizeTitleOrder(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
        <SystemUpdateAltOutlinedIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitleDate(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
        <ScheduleIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitleClient(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
        <FaceIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitleProfile(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
        <SearchIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitlePayment(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
        <CreditCardTwoToneIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }
  
  export function IconizeTitleGift(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
        <CardGiftcardIcon 
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitlePromo(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
        <LocalOfferIcon 
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitleItems(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
      <ShoppingCartIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitleValue(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
      <MonetizationOnOutlinedIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitleDestination(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
      <HouseIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitleStatus(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
      <InputIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }

  export function IconizeTitleScore(props) {
    const classes = useIconizeTitleOrderStyles();
    return (
      <VerifiedUserIcon
          className={classes.iconizeTitle}
          fontSize={props.size}
        />
      ); 
  }




    
const useIconizeTitleOrderStyles = makeStyles({
    iconizeTitle: {
      color: "DarkGray",
    },

  });