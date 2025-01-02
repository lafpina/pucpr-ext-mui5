import React from 'react';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SearchIcon from '@mui/icons-material/Search';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HouseIcon from '@mui/icons-material/House';
import InputIcon from '@mui/icons-material/Input';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FaceIcon from '@mui/icons-material/Face';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';

// ✅ Estilização com `styled`
const StyledIcon = styled('div')(() => ({
  color: 'DarkGray',
  fontSize: '1.5rem',
}));

// ✅ Função reutilizável para ícones
function RenderIcon({ Icon, size }) {
  return <StyledIcon as={Icon} fontSize={size} />;
}

// ✅ Componentes Individuais
export function IconizeTitleOrder(props) {
  return <RenderIcon Icon={SystemUpdateAltOutlinedIcon} size={props.size} />;
}

export function IconizeTitleDate(props) {
  return <RenderIcon Icon={ScheduleIcon} size={props.size} />;
}

export function IconizeTitleClient(props) {
  return <RenderIcon Icon={FaceIcon} size={props.size} />;
}

export function IconizeTitleProfile(props) {
  return <RenderIcon Icon={SearchIcon} size={props.size} />;
}

export function IconizeTitlePayment(props) {
  return <RenderIcon Icon={CreditCardTwoToneIcon} size={props.size} />;
}

export function IconizeTitleGift(props) {
  return <RenderIcon Icon={CardGiftcardIcon} size={props.size} />;
}

export function IconizeTitlePromo(props) {
  return <RenderIcon Icon={LocalOfferIcon} size={props.size} />;
}

export function IconizeTitleItems(props) {
  return <RenderIcon Icon={ShoppingCartIcon} size={props.size} />;
}

export function IconizeTitleValue(props) {
  return <RenderIcon Icon={MonetizationOnOutlinedIcon} size={props.size} />;
}

export function IconizeTitleDestination(props) {
  return <RenderIcon Icon={HouseIcon} size={props.size} />;
}

export function IconizeTitleStatus(props) {
  return <RenderIcon Icon={InputIcon} size={props.size} />;
}

export function IconizeTitleScore(props) {
  return <RenderIcon Icon={VerifiedUserIcon} size={props.size} />;
}
