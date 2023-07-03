import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.locale('vi')
dayjs.extend(updateLocale)
dayjs.extend(relativeTime)
dayjs.updateLocale('vi', {
  relativeTime: {
    future: '%s tới',
    past: '%s trước',
    s: '%d giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm',
  },
})

export const showTimeFromNowWithAgo = (date?: null | Date | string) => {
  if (date) {
    const seconds = Math.abs(dayjs().diff(dayjs(date), 'seconds'))
    if (seconds < 60) {
      return 'Vừa xong'
    }
    return dayjs(date).fromNow()
  }
  return ''
}

export const showTimeFromNow = (date?: null | Date | string) => {
  if (date) {
    return dayjs(date).fromNow(true)
  }
  return ''
}
