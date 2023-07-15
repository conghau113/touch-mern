import { Avatar, Typography, type AvatarProps } from 'antd';
import _ from 'lodash';
import React from 'react';
import { tw } from '../../../utils/classUtil';
import { convertFullNameToImageName } from '../../../utils/convertUtil';

type Variant = 'name' | 'avatar-qna' | 'image';

interface PrimaryAvatarProps extends AvatarProps {
  variant?: Variant;
  name?: string;
  textClassName?: string;
  username?: string;
}

export default React.forwardRef(function PrimaryAvatar(
  props: PrimaryAvatarProps,
  ref: React.Ref<HTMLSpanElement> | null
) {
  const { variant, name, className, username, textClassName, children, ...restProps } = props;

  switch (variant) {
    case 'name': {
      return (
        <Avatar
          className={tw(
            'flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded-full bg-gradient-to-tl from-main-pink to-main-purple',
            className
          )}
          {...restProps}
        >
          <Typography className={tw('flex items-center justify-center text-base font-medium text-white', className)}>
            {_.isString(children) ? convertFullNameToImageName(children ?? '') : children}
          </Typography>
        </Avatar>
      );
    }
    case 'image': {
      return (
        <Avatar
          className={tw(
            'flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded-full bg-gray-50',
            className
          )}
          src={`https://robohash.org/${username}`}
          {...restProps}
        />
      );
    }
    default: {
      return (
        <Avatar ref={ref} className={tw(' h-12 w-12 cursor-pointer select-none', className)} {...restProps}>
          {children}
        </Avatar>
      );
    }
  }
});
