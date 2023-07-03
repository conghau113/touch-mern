import { type ERoleCode } from '@/enums/roleEnum'
import _ from 'lodash'
import { type User } from '@/models/User'

export const getUserRoleCodes = (user: User): ERoleCode[] => {
  const { usersRoles } = user || {}
  return _.compact(
    _.map(usersRoles, (userRole) => {
      const { isActive, role } = userRole
      if (isActive) {
        return role?.code
      }
    }),
  ) as ERoleCode[]
}
