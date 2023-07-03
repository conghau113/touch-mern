import { type EPagePath } from '@/enums/pageEnum'
import { type ERoleCode } from '@/enums/roleEnum'
import rootRoutes from '@/routes'
import { type ExtraRoleCodes, type ExtraRoleCodesAnd, type ExtraRoleCodesOr } from '@/types/roleType'
import type Routes from '@/types/routesType'
import _ from 'lodash'
import { type User } from '@/models/User'
import React from 'react'
import { getUserRoleCodes } from './userUtil'
import { isExtraRoleCodesAnd, isExtraRoleCodesOr } from './validationUtil'

export const getKeyByPathname = (pathname: string, routes: Routes) => {
  return _.find(routes, (route) => route?.path === pathname)?.key
}

export const getParamsByPagePath = (pagePath: EPagePath): Record<string, any> => {
  let params = {}
  if (pagePath) {
    const parts = `${pagePath}`.split('/')
    for (const part of parts) {
      if (_.includes(part, ':')) {
        params = _.assign(params, { [part.replaceAll(':', '')]: null })
      }
    }
  }
  return params
}

export const parsePagePathParams = (pagePath: EPagePath, params: Record<string, any>) => {
  let path = `${pagePath}`
  if (path) {
    if (_.size(params)) {
      for (const key in params) {
        path = path.replace(`:${key}`, params[key])
      }
    }
  }
  return path
}

export const hasRouteByUserRoleAndRouteRole = (userRoleCodes: ERoleCode[] = [], routeRoles: ExtraRoleCodes = []) => {
  try {
    let verify = false

    if (!routeRoles) {
      verify = true
    } else {
      // routeRoles is ERoleCode[]
      if (_.isArray(routeRoles)) {
        if (!_.size(routeRoles)) {
          verify = true
        } else {
          verify = verifyExtraRoleOr(userRoleCodes, routeRoles)
        }
      }

      // routeRoles is ExtraRoleCodesOr || ExtraRoleCodesAnd
      if (_.isPlainObject(routeRoles) && _.size(routeRoles)) {
        if (isExtraRoleCodesOr(routeRoles)) {
          verify = verifyExtraRoleOr(userRoleCodes, routeRoles['$or'])
        }
        if (isExtraRoleCodesAnd(routeRoles)) {
          verify = verifyExtraRoleAnd(userRoleCodes, routeRoles['$and'])
        }
      }
    }

    return verify
  } catch (error) {
    return false
  }
}

export const hasRouteByUserRoleAndRoutePath = (userRoleCodes: ERoleCode[] = [], routePath: string, routes: Routes) => {
  try {
    let verify = false

    // Tìm route dựa vào routePath
    const route = _.find(routes, { path: routePath })

    if (route) {
      const { roles: routeRoles } = route

      verify = hasRouteByUserRoleAndRouteRole(userRoleCodes, routeRoles)
    }

    return verify
  } catch (error) {
    return false
  }
}

const verifyExtraRoleOr = (userRoleCodes: ERoleCode[] = [], routeRolesOr: ExtraRoleCodesOr['$or'] = []) => {
  try {
    let verify = false

    if (_.isArray(routeRolesOr)) {
      _.each(routeRolesOr, (item) => {
        if (_.isString(item) && _.includes(userRoleCodes, item)) {
          verify = true
          return false // return của _.some
        }

        if (isExtraRoleCodesAnd(item as ExtraRoleCodesAnd)) {
          verify = verifyExtraRoleAnd(userRoleCodes, (item as ExtraRoleCodesAnd)['$and'])
          if (verify) {
            return false // return của _.some
          }
        }
        return true // return của _.some
      })
    }

    return verify
  } catch (error) {
    return false
  }
}

const verifyExtraRoleAnd = (userRoleCodes: ERoleCode[] = [], routeRolesAnd: ExtraRoleCodesAnd['$and'] = []) => {
  try {
    let verify = false

    if (_.isArray(routeRolesAnd)) {
      verify = !_.size(_.difference(routeRolesAnd, userRoleCodes))
    }

    return verify
  } catch (error) {
    return false
  }
}

export const hasRouteByRouteKey = (user: User, key: string) => {
  try {
    const userRoleCodes = getUserRoleCodes(user)
    const route = _.find(rootRoutes, { key })

    return hasRouteByUserRoleAndRouteRole(userRoleCodes, route?.roles)
  } catch (error) {
    return false
  }
}

export const lazyReload: typeof React.lazy = (importer: any) => {
  const reloadImport = async () => {
    try {
      return importer()
    } catch (error) {
      if (
        (error as TypeError)?.message?.includes('Failed to fetch dynamically imported module') ||
        (error as TypeError)?.message?.includes('Importing a module script failed')
      ) {
        window.location.reload()
        return await new Promise((resolve: (value: any) => void) => {
          setTimeout(() => {
            resolve({
              default: null,
            })
          }, 2000)
        })
      } else {
        throw error
      }
    }
  }
  return React.lazy(reloadImport)
}
