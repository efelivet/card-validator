
export const validateLuhn = (cardNumber: string): boolean => {
  
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isSecond = false;


  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i] ?? '');

    if (isSecond) {
      d = d * 2;
      if (d > 9) d = d - 9;
    }

    sum += d;
    isSecond = !isSecond;
  }

  return sum % 10 === 0;
};