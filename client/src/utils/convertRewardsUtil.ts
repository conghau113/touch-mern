import { type UserReward } from '@/models/UserReward'
import dayjs from 'dayjs'
import _ from 'lodash'

export const convertRewardsUtil = (userRewards?: UserReward[] | []) => {
  const rewards = _.map(userRewards, (userReward) => {
    const children: Array<Record<string, any>> = []
    const { rmisApprovedDay, rmisAward, rmisLevel } = userReward ?? {}
    let approvedDate = ''

    if (rmisApprovedDay) {
      approvedDate = dayjs(rmisApprovedDay).format('DD/MM/YYYY')
      children.push({ content: approvedDate })
    }

    children.push({ content: rmisLevel })

    return { subtitle: rmisAward, children }
  })
  return rewards
}
