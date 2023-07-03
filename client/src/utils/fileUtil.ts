import { ACCEPTANCE_FILE_EXTENSIONS, ACCEPTANCE_FILE_QUESTION } from '@/constants/common'
import { type RcFile } from 'antd/es/upload'

const getFileExtension = (fileName: string) => {
  const fileExtension = fileName.replace(/^.*\./, '')
  return fileExtension.toLowerCase()
}

export const isValidHttpUrl = (href?: string) => {
  if (!href) {
    return false
  }
  let url

  try {
    url = new URL(href)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const isImageFile = (fileName: string) => {
  const FILE_NAME = ['jpg', 'png', 'jpeg']
  const fileExt = getFileExtension(fileName.toLowerCase())
  return FILE_NAME.includes(fileExt)
}

export const isAcceptanceFile = (fileName: string) => {
  const fileExt = getFileExtension(fileName.toLowerCase())
  return ACCEPTANCE_FILE_EXTENSIONS.includes(fileExt)
}

export const isAcceptanceFileQuestion = (fileName: string) => {
  const fileExt = getFileExtension(fileName.toLowerCase())
  return ACCEPTANCE_FILE_QUESTION.includes(fileExt)
}

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const formatBytes = (bytes: number, decimals = 2) => {
  return `${(bytes / 1024 / 1024).toFixed(decimals)} MB`
}
