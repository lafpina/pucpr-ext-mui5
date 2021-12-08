export function determineRisk(riskScore) {
  switch (riskScore) {
    case 100:
      return "Possível Fraude"
    case 95:
      return "Muito Alto";
    case 90:
    case 85:
      return "Alto";
    case 80:
    case 75:
    case 70:
    case 65:
      return "Moderado";
    case 60:
    case 55:
    case 50:
    case 45:
      return "Baixo";
    default:
      return "Muito Baixo";
  }
}
