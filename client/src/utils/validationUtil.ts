import { type ExtraRoleCodes, type ExtraRoleCodesAnd, type ExtraRoleCodesOr } from '@/types/roleType'
import _ from 'lodash'

export const isNumeric = (value: any) => {
  try {
    return /^-?\d+$/.test(`${+value}`)
  } catch (error) {
    return false
  }
}

export const isPositiveNumeric = (value: any) => {
  try {
    return /^\d+$/.test(`${+value}`)
  } catch (error) {
    return false
  }
}

export const isJsonString = (value: string) => {
  try {
    JSON.parse(value)
  } catch (error) {
    return false
  }
  return true
}

export const isExternalUrl = (url: string) => {
  try {
    const newUrl = new URL(url)
    const newUrlOrigin = newUrl.origin
    const newUrlHref = newUrl.href
    const locationOrigin = location.origin

    if (newUrlOrigin === locationOrigin) {
      if (__APP_BASE__) {
        const appBaseNotEndWithSlash = __APP_BASE__.endsWith('/') ? __APP_BASE__.slice(0, -1) : __APP_BASE__
        return !_.includes(newUrlHref, `${locationOrigin}${appBaseNotEndWithSlash}`)
      }
      return !_.includes(newUrlHref, locationOrigin)
    }

    return true
  } catch (error) {
    return false
  }
}

export const isExtraRoleCodesOr = (extraRoleCode: ExtraRoleCodes): extraRoleCode is ExtraRoleCodesOr => {
  return !!(extraRoleCode as ExtraRoleCodesOr)?.['$or']
}

export const isExtraRoleCodesAnd = (extraRoleCode: ExtraRoleCodes): extraRoleCode is ExtraRoleCodesAnd => {
  return !!(extraRoleCode as ExtraRoleCodesAnd)?.['$and']
}
