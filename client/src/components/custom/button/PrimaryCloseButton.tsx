import { CloseOutlined } from '@ant-design/icons'
import PrimaryButton, { type PrimaryButtonProps } from './PrimaryButton'

interface PrimaryCloseButtonProps extends PrimaryButtonProps {}

export default function PrimaryCloseButton(props: PrimaryCloseButtonProps) {
  return (
    <PrimaryButton
      icon={<CloseOutlined className='mr-2 group-hover:text-white' />}
      variant='no-style'
      className='group flex w-fit items-center justify-between bg-inherit hover:bg-red-100 '
      typographyClassName='text-sm group-hover:text-white'
      {...props}
    >
      Hủy
    </PrimaryButton>
  )
}
