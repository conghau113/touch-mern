export const getDecimalPart = (num: number) => {
  if (Number.isInteger(num)) {
    return 0
  }

  const decimalStr = num.toString().split('.')[1]
  return Number(decimalStr)
}

export const converDecimalToRoundDecimal = (num: any) => {
  const DecimalPart = getDecimalPart(parseFloat(parseFloat(num).toFixed(1))) > 1 ? 0.5 : 0

  const intNum = parseInt(parseFloat(num).toFixed(1)) + DecimalPart

  return intNum
}
