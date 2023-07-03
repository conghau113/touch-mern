import { type UserExperience } from '@/models/UserExperience'
import dayjs from 'dayjs'
import _ from 'lodash'

export const convertExperiencesUtil = (userExperiences?: UserExperience[] | []) => {
  const experiences = _.map(userExperiences, (userExperience) => {
    let date = ''
    const children: Array<Record<string, any>> = []
    const { rmisFrom, rmisTo, rmisDepartment, rmisJobTitleName } = userExperience ?? {}
    const department = rmisDepartment && `Phòng ban: ${rmisDepartment}`

    if (rmisFrom) {
      date = `${dayjs(rmisFrom).format('DD/MM/YYYY')} - Hiện nay`
      if (rmisTo) {
        date = `${dayjs(rmisFrom).format('DD/MM/YYYY')} - ${dayjs(rmisTo).format('DD/MM/YYYY')}`
      }
      children.push({ content: date })
    }
    children.push({ content: department })

    return { subtitle: rmisJobTitleName, children }
  })
  return experiences
}
