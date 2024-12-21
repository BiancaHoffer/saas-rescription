export function maskSusCard(value: string) {
  const numericValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  let formattedSusCard = '';
  for (let i = 0; i < numericValue.length; i++) {
    if (i === 3 || i === 7 || i === 11) {
      formattedSusCard += ' '; // Adiciona um espaço após o terceiro, sétimo e décimo primeiro dígitos
    }
    formattedSusCard += numericValue[i];
  }

  return formattedSusCard;
}