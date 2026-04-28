import { validateLuhn } from './luhnValidator'; 

describe('Luhn Algorithm Validation', () => {
  
  test('should return true for a valid Visa card (4242...)', () => {
    const validCard = "4242424242424242";
    expect(validateLuhn(validCard)).toBe(true);
  });

  test('should return false for a card with an incorrect checksum', () => {
    const invalidCard = "4242424242424241"; // Last digit changed
    expect(validateLuhn(invalidCard)).toBe(false);
  });

  test('should return false for an empty string or non-numeric input', () => {
    expect(validateLuhn("")).toBe(false);
    expect(validateLuhn("abc")).toBe(false);
  });

});