export function determineRisk(riskScore) {
  switch (riskScore) {
    case 100:
    case 95:
      return "Muito Alto";
    case 90:
    case 85:
      return "Alto";
    case 80:
    case 75:
      return "Moderado";
    case 70:
      return "Baixo";
    default:
      return "Muito Baixo";
  }
}
