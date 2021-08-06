//? Rule 3
export const applyCouponDiscountRule = (orderObject, riskScoreObject) => {
  // Any coupon of discount other than Compre Junto will score positively
  if (
    orderObject.coupon > " " &&
    orderObject.coupon.indexOf("Compre Junto") == -1
  ) {
    riskScoreObject.final -= 15;
    riskScoreObject.couponDiscount.score = -15;
  }
  return riskScoreObject;
};
