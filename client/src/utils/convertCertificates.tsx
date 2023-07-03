import { type UserCertificate } from '@/models/UserCertificate'
import _ from 'lodash'

export const convertCertificates = (userCertificates: UserCertificate) => {
  const data = _.map(userCertificates, (certificate) => {
    return certificate.rmisCertificate
  })
  return data
}
