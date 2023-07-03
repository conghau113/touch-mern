import React from 'react';
import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function WarningCircleIconV1(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw(className)}
      {...restProps}
      component={() => (
        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z'
            fill='#464FEB'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10 8.33333C10.4602 8.33333 10.8333 8.70643 10.8333 9.16667V14.1667C10.8333 14.6269 10.4602 15 10 15C9.53976 15 9.16667 14.6269 9.16667 14.1667V9.16667C9.16667 8.70643 9.53976 8.33333 10 8.33333Z'
            fill='#464FEB'
          />
          <path
            d='M10 6.66667C10.4602 6.66667 10.8333 6.29357 10.8333 5.83333C10.8333 5.3731 10.4602 5 10 5C9.53976 5 9.16667 5.3731 9.16667 5.83333C9.16667 6.29357 9.53976 6.66667 10 6.66667Z'
            fill='#464FEB'
          />
        </svg>
      )}
    />
  );
}
