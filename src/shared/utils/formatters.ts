export const formatNumberGroup = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .formatToParts(value)
    .map(({ type, value }) => (type === 'group' ? ' ' : value))
    .join('')
}

export const formatNumber = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  } else {
    return num?.toString()
  }
}


// convert to roman number
export const toRoman = (num: number): string => {
  const romanNumerals: { [key: number]: string } = {
      1000: 'M', 900: 'CM', 500: 'D', 400: 'CD',
      100: 'C', 90: 'XC', 50: 'L', 40: 'XL',
      10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'
  };

  let result = '';
  const keys = Object.keys(romanNumerals).map(Number).sort((a, b) => b - a);

  for (const key of keys) {
      while (num >= key) {
          result += romanNumerals[key];
          num -= key;
      }
  }

  return result;
}

