export const initializeScore = () => {
  var riskScoreObject = {
    incompleteOrders: {
      qty: 0,
      score: 0,
    },
    couponDiscount: {
      qty: 0,
      score: 0,
    },
    carrier: {
      score: 0,
    },
    giftGuest: {
      score: 0,
    },
    paymentMethod: {
      promissory: {
        score: 0,
      },
      instantPayment: {
        score: 0,
      },
      creditCard: {
        score: 0,
      },
      giftCard: {
        score: 0,
      },
    },
    customProduct: {
      score: 0,
    },
    historyPurchase: {
      profile: {
        qty: 0,
        value: 0,
        isGiftHistory: false,
        isPromissoryHistory: false,
        isPixHistory: false,
        dateFirstBuy: " ",
      },
      score: 0,
    },
    paymentValue: {
      score: 0,
    },
    validEmail: {
      score: 0,
    },
    validCpf: {
      score: 0,
    },
    cardHolder: {
      yes: false,
      maybe: false,
      no: false,
      score: 0,
    },
    foreignCreditCard: {
      score: 0,
    },
    shippingRate: {
      score: 0,
    },
    areaCode: {
      score: 0,
    },
    shoppingTime: {
      score: 0,
    },
    firstBuying: {
      score: 0,
    },
    blackListed: {
      qty: 0,
      score: 0,
    },
    whiteListed: {
      qty: 0,
      score: 0,
    },
    alerts: {
      qty: 0,
      score: 0,
    },
    final: 100,
    description: " ",
    riskScoreLog: [],
  };

  return riskScoreObject;
};
