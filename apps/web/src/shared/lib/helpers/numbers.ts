export function generateHundred() {
  const random = Math.floor(Math.random() * 801) + 100;

  return Math.ceil(random / 100) * 100;
}
