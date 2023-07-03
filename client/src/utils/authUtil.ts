import dayjs from 'dayjs'

export const getExpiration = () => {
  const expiration = localStorage.getItem('expiresAt') ?? sessionStorage.getItem('expiresAt') ?? ''
  const expiresAt = +expiration || ''
  return dayjs(expiresAt)
}

export const isLoggedIn = () => {
  return dayjs().isBefore(getExpiration()) || false
}
