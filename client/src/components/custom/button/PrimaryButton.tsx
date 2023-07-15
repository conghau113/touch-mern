import { ReloadOutlined } from '@ant-design/icons';
import { Button, Typography, type ButtonProps } from 'antd';
import React from 'react';
import { tw } from '../../../utils/classUtil';
import GoBackIcon from '../icon/GoBackIcon';
import LinkIcon from '../icon/LinkIcon';

const { Text } = Typography;

type Variant =
  | 'no-style'
  | 'large-circle'
  | 'cancel'
  | 'default'
  | 'dark'
  | 'light'
  | 'highlight'
  | 'nude'
  | 'attachment'
  | 'primary'
  | 'refuse'
  | 'rating'
  | 'go-back-home'
  | 'suffix-icon'
  | 'reload-page'
  | 'blue-primary'
  | 'ratingMentorOrCoach'
  | 'mini-red-primary'
  | 'mini-blue-primary'
  | 'large-blue-primary'
  | 'mini-cancel'
  | 'large-cancel';

export interface PrimaryButtonProps extends ButtonProps {
  variant?: Variant;
  typographyClassName?: string;
  textClassName?: string;
  isActive?: boolean;
}

export default React.forwardRef(function PrimaryButton(
  props: PrimaryButtonProps,
  ref: React.Ref<HTMLButtonElement> | null
) {
  const { variant, className, typographyClassName, textClassName, isActive, children, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return (
        <Button ref={ref} className={tw('flex w-full items-center justify-center', className)} {...restProps}>
          <Typography className={tw('text-center text-blue-1', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'large-circle': {
      return (
        <Button
          ref={ref}
          className={tw(
            'group h-32 w-32 border border-solid border-orange-8 bg-white shadow-sm hover:bg-blue-1',
            className
          )}
          shape='circle'
          {...restProps}
        >
          <Typography className={tw('text-base font-medium text-blue-1 group-hover:text-white', typographyClassName)}>
            {children}
          </Typography>
        </Button>
      );
    }
    case 'no-style': {
      return (
        <Button ref={ref} className={tw('w-full border-none shadow-none', className)} {...restProps}>
          <Typography className={tw('text-center text-blue-1', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'cancel': {
      return (
        <Button
          ref={ref}
          className={tw('flex w-full items-center justify-center border-none bg-light-11 hover:opacity-60', className)}
          {...restProps}
        >
          <Typography className={tw('text-center text-base font-medium', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'mini-cancel': {
      return (
        <Button
          ref={ref}
          className={tw(
            'flex h-10 w-full items-center justify-center border-none bg-light-11  px-4 py-[9px] hover:opacity-60',
            className
          )}
          {...restProps}
        >
          <Typography className={tw('text-center text-base font-medium', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'large-cancel': {
      return (
        <Button
          ref={ref}
          className={tw(
            'flex h-12 w-full items-center justify-center border-none bg-light-11 px-5 py-3 hover:opacity-60',
            className
          )}
          {...restProps}
        >
          <Typography className={tw('text-center text-base font-medium text-black-1', typographyClassName)}>
            {children}
          </Typography>
        </Button>
      );
    }
    case 'dark': {
      return (
        <Button
          ref={ref}
          className={tw('flex w-full items-center justify-center border-none bg-light-12 hover:opacity-60', className)}
          {...restProps}
        >
          <Typography className={tw('text-center text-base font-medium', typographyClassName)}>{children}</Typography>
        </Button>
      );
    }
    case 'light': {
      return <></>;
    }
    case 'nude': {
      return (
        <Button
          ref={ref}
          className={tw('w-full bg-orange-6 hover:border-orange-6 hover:opacity-80', className)}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw('text-base font-medium text-blue-1', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'blue-primary': {
      return (
        <Button
          ref={ref}
          className={tw('w-full bg-blue-11 px-4 py-5 hover:border-blue-11 hover:opacity-80', className)}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw('text-sm font-medium text-white', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'mini-blue-primary': {
      return (
        <Button
          ref={ref}
          className={tw('h-10 w-full bg-blue-11 px-4 py-[9px] hover:border-blue-11 hover:opacity-80', className)}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw('text-sm font-medium text-white', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'large-blue-primary': {
      return (
        <Button
          ref={ref}
          className={tw('h-12 w-full bg-blue-11 px-5 py-3 hover:border-blue-11 hover:opacity-80', className)}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw('text-base font-semibold text-white', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'mini-red-primary': {
      return (
        <Button
          ref={ref}
          className={tw('h-10 w-full bg-red-5 px-4 py-[9px] hover:border-red-5 hover:opacity-80', className)}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw('text-sm font-medium text-white', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'primary': {
      return (
        <Button
          ref={ref}
          className={tw('w-full border-none bg-main-purple hover:opacity-80', className)}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw('text-base font-medium text-white', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'refuse': {
      return (
        <Button ref={ref} className={tw('w-full border-red-400 hover:opacity-80', className)} {...restProps}>
          <Typography className={tw('flex h-full items-center justify-center', typographyClassName)}>
            <Text className={tw(' text-base font-medium  text-red-400', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'attachment': {
      return (
        <Button
          ref={ref}
          className={tw('flex h-12 w-full flex-row-reverse items-center justify-between', className)}
          icon={<LinkIcon />}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center', typographyClassName)}>
            <Text className={tw('text-dark-8', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'rating': {
      return (
        <Button
          ref={ref}
          className={tw(
            'group flex items-center justify-between rounded-lg',
            isActive ? 'bg-blue-1' : 'hover:border-dark-9 hover:bg-dark-9',
            className
          )}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center', typographyClassName)}>
            <Text className={tw(isActive ? 'text-orange-6' : 'text-dark-8', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'ratingMentorOrCoach': {
      return (
        <Button
          ref={ref}
          className={tw(
            'group flex items-center justify-between rounded-lg border-blue-15  px-3 py-[5px]',
            isActive ? 'border-blue-11' : 'bg-inherit hover:border-blue-11  ',
            className
          )}
          {...restProps}
        >
          <Typography className={tw('flex h-full items-center', typographyClassName)}>
            <Text className={tw(isActive ? 'text-blue-11' : 'text-black-8', textClassName)}>{children}</Text>
          </Typography>
        </Button>
      );
    }
    case 'go-back-home': {
      return (
        <Button
          ref={ref}
          className={tw(
            'flex w-fit rounded-full bg-orange-6 px-6 py-3 hover:border-orange-6 hover:opacity-80',
            className
          )}
          {...restProps}
        >
          <Typography className={tw('flex  h-full items-center justify-center gap-2', typographyClassName)}>
            <Text className={tw('text-base font-medium text-blue-1', textClassName)}>
              {children ?? 'Quay lại trang chủ'}
            </Text>
            <GoBackIcon />
          </Typography>
        </Button>
      );
    }
    case 'reload-page': {
      return (
        <Button
          ref={ref}
          className={tw(
            'flex w-fit rounded-full bg-orange-6 px-6 py-3 hover:border-orange-6 hover:opacity-80',
            className
          )}
          {...restProps}
        >
          <Typography className={tw('flex  h-full items-center justify-center gap-2', typographyClassName)}>
            <Text className={tw('text-base font-medium text-blue-1', textClassName)}>{children ?? 'Thử lại'}</Text>
            <ReloadOutlined />
          </Typography>
        </Button>
      );
    }
    case 'suffix-icon': {
      return (
        <Button ref={ref} className={tw('flex w-full items-center justify-center px-0', className)} {...restProps}>
          {children}
        </Button>
      );
    }
    default: {
      return (
        <Button ref={ref} className={tw(className)} {...restProps}>
          {children}
        </Button>
      );
    }
  }
});
