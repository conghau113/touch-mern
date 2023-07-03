import { type EPageKey } from '@/enums/pageEnum'
import rootRoutes from '@/routes'
import _ from 'lodash'
import queryString from 'query-string'
import { isJsonString } from './validationUtil'
import config from '@/config'
import { ERoleCode } from '@/enums/roleEnum'
import {
  AVATAR_FEMALE_PATH,
  AVATAR_MALE_PATH,
  AVATAR_MENTEE_FEMALE_PATH,
  AVATAR_MENTEE_MALE_PATH,
} from '@/config/default'

export const getNotificationHref = ({
  pageKey,
  pageParam,
  pageQuery,
}: {
  pageKey?: null | EPageKey
  pageParam?: null | Record<string, any> | string
  pageQuery?: null | Record<string, any> | string
}) => {
  let href = ''
  if (pageKey) {
    const route = _.find(rootRoutes, { key: pageKey })
    if (route) {
      href = `${href}${route.path}`

      if (pageParam && _.size(pageParam)) {
        let params = pageParam
        if (_.isString(params) && isJsonString(params)) {
          params = JSON.parse(params)
        }
        if (_.isPlainObject(params)) {
          for (const key in params as Record<string, any>) {
            href = href.replace(`:${key}`, (params as Record<string, any>)[key])
          }
        }
      }

      if (pageQuery && _.size(pageQuery)) {
        let queries = pageQuery
        if (_.isString(queries) && isJsonString(queries)) {
          queries = JSON.parse(queries)
        }
        if (_.isPlainObject(queries)) {
          href = `${href}?${queryString.stringify(queries as Record<string, any>)}`
        }
      }
    }
  }
  return href
}

export const openLink = (url: string) => {
  const link = document.createElement('a')
  link.target = `_blank`
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const openDownload = (url: string, name: string) => {
  const link = document.createElement('a')
  link.target = `_blank`
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const DEFAULT_FALLBACK_IMG = (gender: string, roleName: string) => {
  return `${config.system.API_URL}${
    _.includes(gender, 'Nam')
      ? _.includes([ERoleCode.Mentor, ERoleCode.Coach], roleName?.toLowerCase())
        ? AVATAR_MALE_PATH
        : AVATAR_MENTEE_MALE_PATH
      : _.includes([ERoleCode.Mentor, ERoleCode.Coach], roleName?.toLowerCase())
      ? AVATAR_FEMALE_PATH
      : AVATAR_MENTEE_FEMALE_PATH
  }`
}
