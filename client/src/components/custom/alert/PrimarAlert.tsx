import { Alert, type AlertProps } from 'antd'

type Variant = 'success' | 'information' | 'warning' | 'error'

export interface PrimaryAlertProps extends AlertProps {
  variant?: Variant
}

export default function PrimaryAlert(props: PrimaryAlertProps) {
  const { variant, className, message, description, ...restProps } = props

  switch (variant) {
    case 'success': {
      return (
        <Alert
          type='success'
          message={message}
          description={description}
          className={className}
          showIcon
          {...restProps}
        />
      )
    }
    case 'information': {
      return (
        <Alert type='info' message={message} description={description} className={className} showIcon {...restProps} />
      )
    }
    case 'warning': {
      return (
        <Alert
          type='warning'
          message={message}
          description={description}
          className={className}
          showIcon
          {...restProps}
        />
      )
    }
    case 'error': {
      return (
        <Alert type='error' message={message} description={description} className={className} showIcon {...restProps} />
      )
    }
    default: {
      return <Alert message={message} description={description} className={className} {...restProps} />
    }
  }
}
