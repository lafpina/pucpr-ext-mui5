import React from 'react';
import { styled } from '@mui/material/styles';
import {
  PaymentOutlined,
  MobileFriendlyOutlined,
  SaveAltOutlined,
  LoyaltyOutlined,
} from '@mui/icons-material';

// ✅ Estilização com `styled`
const StyledIcon = styled('div')(({ theme, color }) => ({
  color: color,
  fontSize: '1.5rem',
}));

// ✅ Componente principal
export function IconizePaymentOption(props) {
  const { payMethod, size } = props;

  const renderIconPair = (Icon1, color1, Icon2, color2) => (
    <>
      <StyledIcon as={Icon1} color={color1} fontSize={size} />
      <StyledIcon as={Icon2} color={color2} fontSize={size} />
    </>
  );

  const renderSingleIcon = (Icon, color) => (
    <StyledIcon as={Icon} color={color} fontSize={size} />
  );

  // 🔄 Lógica para determinar os ícones
  if (payMethod.giftCard && payMethod.isCreditCardHolder?.no) {
    return renderIconPair(LoyaltyOutlined, 'LightSkyBlue', PaymentOutlined, 'LightSalmon');
  }

  if (payMethod.giftCard && payMethod.isCreditCardHolder?.maybe) {
    return renderIconPair(LoyaltyOutlined, 'LightSkyBlue', PaymentOutlined, 'Gold');
  }

  if (payMethod.giftCard && payMethod.isCreditCardHolder?.yes) {
    return renderIconPair(LoyaltyOutlined, 'LightSkyBlue', PaymentOutlined, 'MediumSpringGreen');
  }

  if (payMethod.giftCard && payMethod.instantPayment) {
    return renderIconPair(LoyaltyOutlined, 'LightSkyBlue', MobileFriendlyOutlined, 'YellowGreen');
  }

  if (payMethod.instantPayment && payMethod.isCreditCardHolder?.no) {
    return renderIconPair(MobileFriendlyOutlined, 'YellowGreen', PaymentOutlined, 'LightSalmon');
  }

  if (payMethod.instantPayment && payMethod.isCreditCardHolder?.maybe) {
    return renderIconPair(MobileFriendlyOutlined, 'YellowGreen', PaymentOutlined, 'Gold');
  }

  if (payMethod.instantPayment && payMethod.isCreditCardHolder?.yes) {
    return renderIconPair(MobileFriendlyOutlined, 'YellowGreen', PaymentOutlined, 'MediumSpringGreen');
  }

  if (payMethod.promissory && payMethod.isCreditCardHolder?.no) {
    return renderIconPair(SaveAltOutlined, 'RosyBrown', PaymentOutlined, 'LightSalmon');
  }

  if (payMethod.promissory && payMethod.isCreditCardHolder?.maybe) {
    return renderIconPair(SaveAltOutlined, 'RosyBrown', PaymentOutlined, 'Gold');
  }

  if (payMethod.promissory && payMethod.isCreditCardHolder?.yes) {
    return renderIconPair(SaveAltOutlined, 'RosyBrown', PaymentOutlined, 'MediumSpringGreen');
  }

  if (payMethod.giftCard) {
    return renderSingleIcon(LoyaltyOutlined, 'LightSkyBlue');
  }

  if (payMethod.instantPayment) {
    return renderSingleIcon(MobileFriendlyOutlined, 'YellowGreen');
  }

  if (payMethod.isCreditCardHolder?.no) {
    return renderSingleIcon(PaymentOutlined, 'LightSalmon');
  }

  if (payMethod.isCreditCardHolder?.maybe) {
    return renderSingleIcon(PaymentOutlined, 'Gold');
  }

  if (payMethod.isCreditCardHolder?.yes) {
    return renderSingleIcon(PaymentOutlined, 'MediumSpringGreen');
  }

  if (payMethod.promissory) {
    return renderSingleIcon(SaveAltOutlined, 'RosyBrown');
  }

  return null;
}
