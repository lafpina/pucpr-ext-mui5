import Brightness5Icon from "@mui/icons-material/Brightness5"; // Ícone alternativo para Flare
import getOption from "./getOption";
import getURL from "./getURL";

// Função principal para buscar histórico de compras
export async function lookForPurchaseHistory(query) {
  let historyPurchaseProfile = {
    qty: 0,
    value: 0,
    isGT90History: false,
    isGT60History: false,
    isGT40History: false,
    isGiftHistory: false,
    isGT999valHistory: false,
    isPromissoryHistory: false,
    isPixHistory: false,
    dateFirstBuy: "N/A",
  };

  let qtyPurchase = 0;
  let qtyInvoiced = 0;

  const options = getOption("order");
  const url = getURL("query", query);

  try {
    const res = await fetch(url, options);

    if (res.ok) {
      const data = await res.json();
      const clientOrders = JSON.parse(JSON.stringify(data));
      qtyPurchase = clientOrders.list.length;

      // Garante que a data de compra não será nula
      historyPurchaseProfile.dateFirstBuy =
        clientOrders.list[qtyPurchase - 1]?.creationDate || "N/A";

      // Loop para verificar cada pedido
      for (let i = 0; i < qtyPurchase; ++i) {
        const order = clientOrders.list[i];

        if (order.status === "invoiced") {
          qtyInvoiced += 1;
          historyPurchaseProfile.qty += 1;
          historyPurchaseProfile.value += order.totalValue || 0;

          // Verifica histórico de vale
          if (order.paymentNames?.includes("Vale")) {
            historyPurchaseProfile.isGiftHistory = true;
          }

          // Verifica histórico de pagamentos promissórios
          if (
            order.paymentNames?.includes("Depósito") ||
            order.paymentNames?.includes("Boleto Bancário")
          ) {
            historyPurchaseProfile.isPromissoryHistory = true;
          }

          // Verifica histórico de pagamentos via Pix
          if (order.paymentNames?.includes("Pix")) {
            historyPurchaseProfile.isPixHistory = true;
          }
        }
      }
    } else {
      console.error("Erro ao buscar histórico de compras:", query, res);
      throw new Error(`Erro no servidor: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Erro ao buscar histórico de compras:", error);
    historyPurchaseProfile.qty = 0;
    historyPurchaseProfile.value = 0;
    historyPurchaseProfile.isGiftHistory = false;
    historyPurchaseProfile.isPromissoryHistory = false;
    historyPurchaseProfile.isPixHistory = false;
  }

  return historyPurchaseProfile;
}

// Exportação do ícone para utilização em outros componentes
export const PurchaseHistoryIcon = Brightness5Icon;
