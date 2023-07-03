import _ from 'lodash'

export const getEnumKeyByEnumValue = (myEnum: any, enumValue: number | string): string => {
  const key = _.find(
    _.keys(myEnum),
    (item) => myEnum[item]?.toString()?.toLowerCase()?.trim() === enumValue?.toString()?.toLowerCase()?.trim(),
  )
  if (key) {
    return myEnum[key]
  }
  return ''
}
