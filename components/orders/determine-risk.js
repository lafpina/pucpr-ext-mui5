export function determineRisk(riskScore) {
  switch (riskScore) {
    case 100:
      return "Muito Alto";
    case 95:
    case 90:
      return "Alto";
    case 85:
    case 80:
      return "Moderado";
    case 75:
    case 70:
      return "Baixo";
    default:
      return "Muito Baixo";
  }
}
