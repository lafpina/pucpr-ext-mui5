export function buildCarrier(vCarrier) {
  if (vCarrier === "PAC" || vCarrier === "Sedex") return vCarrier;
  if (vCarrier.substr(0, 7) === "Entrega") return "Expressa";
  if (vCarrier.substr(0, 8) === "Retirada") return "Retirada";
  if (vCarrier.substr(0, 14) === "Não contribuir") return "";
}
