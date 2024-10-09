export function isPalindrome(num: number, digits: number = 0): boolean {
  const numStr = num.toString();

  if (digits > 0 && numStr.length !== digits) {
    return false;
  }
  
  for (let i = 0; i < Math.floor(numStr.length / 2); i++) {
    if (numStr[i] !== numStr[numStr.length - 1 - i]) {
      return false;
    }
  }
  return true;
}