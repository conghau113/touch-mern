import { EPageKey } from '@/enums/pageEnum'
import useQuestiionsBoxStore from '@/features/chatBox/hooks/useQuestiionsBoxStore'
import useModalStore from '@/hooks/useModalStore'
import useNoticeStore from '@/hooks/useNoticeStore'
import { isExternalUrl, isJsonString } from '@/utils/validationUtil'
import { notification, Typography } from 'antd'
import { type ArgsProps, type NotificationConfig } from 'antd/es/notification/interface'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton, { type PrimaryButtonProps } from '../button/PrimaryButton'
import EastIcon from '../icon/EastIcon'

export type PrimaryNotificationConfig = NotificationConfig &
  Omit<ArgsProps, 'message'> & {
    message?: React.ReactNode
    title?: React.ReactNode
    content?: React.ReactNode
    href?: string
    pageKey?: null | EPageKey
    pageParam?: null | Record<string, any> | string
    listUserChat?: any[]
    buttonProps?: PrimaryButtonProps
  }

export default function PrimaryNotification() {
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const { isOpen, config, closeNotification } = useNoticeStore()
  const { closeStaticModal } = useModalStore()
  const { onClose, message, title, content, href, listUserChat, buttonProps, pageKey, pageParam, ...restConfig } =
    config
  const { onClick: buttonOnClick, ...restButtonProps } = buttonProps ?? {}

  const { setOpenDropdownBox, setCreateQuestion } = useQuestiionsBoxStore()

  // const { refetch } = useGerUsersChat()
  const hanhdleCheckNotiBoxChat = (pageKey?: EPageKey | null) => {
    if (_.includes(EPageKey.QnA, pageKey)) {
      if (_.isString(pageParam) && isJsonString(pageParam)) {
        setCreateQuestion(true)
        setOpenDropdownBox(true)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      api.open({
        placement: 'bottomRight',
        duration: 15,
        maxCount: 1,
        message: message ?? (
          <div className='flex flex-col gap-2'>
            <Typography>{title}</Typography>
            <Typography>{content}</Typography>
          </div>
        ),
        btn: href && (
          <PrimaryButton
            type='primary'
            variant='mini-blue-primary'
            className='flex items-center justify-center'
            onClick={(event) => {
              hanhdleCheckNotiBoxChat(pageKey)
              isExternalUrl(href) ? window.open(href, '_blank') : navigate(href)
              closeStaticModal()
              closeNotification()
              buttonOnClick?.(event as React.MouseEvent<HTMLButtonElement, MouseEvent>)
              api.destroy()
            }}
            {...restButtonProps}
          >
            Xem thông tin
            <EastIcon className='relative top-[1px] ml-2 text-white' />
          </PrimaryButton>
        ),
        onClose: () => {
          onClose?.()
          closeNotification()
          api.destroy()
        },
        ...restConfig,
      })
    }
  }, [isOpen])

  return <>{contextHolder}</>
}
