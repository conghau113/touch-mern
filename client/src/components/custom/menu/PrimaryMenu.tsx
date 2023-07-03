import { tw } from '../../../utils/classUtil';
import { Menu, type MenuProps, type MenuRef } from 'antd';
import React from 'react';

type Variant = 'default' | 'no-style' | 'mobile-view';

export interface PrimaryMenuProps extends MenuProps {
  variant?: Variant;
}

export default React.forwardRef(function PrimaryMenu(props: PrimaryMenuProps, ref: React.Ref<MenuRef> | null) {
  const { variant, className, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return <Menu ref={ref} className={className} {...restProps} />;
    }
    case 'no-style': {
      return (
        <Menu
          ref={ref}
          className={tw(
            `
              group
              w-full
              border-none
              outline-none
              [&_.ant-menu-item.ant-menu-item-active]:text-dark-8 
              [&_.ant-menu-item.ant-menu-item-active]:after:inset-x-0 
              [&_.ant-menu-item.ant-menu-item-active]:after:border-none
              [&_.ant-menu-item.ant-menu-item-active]:hover:text-dark-8 
              [&_.ant-menu-item.ant-menu-item-active]:hover:after:inset-x-0 
              [&_.ant-menu-item.ant-menu-item-active]:hover:after:border-none
              [&_.ant-menu-item.ant-menu-item-active_.ant-typography]:text-black-1
              [&_.ant-menu-item.ant-menu-item-active_svg]:text-black-1

              [&_.ant-menu-item.ant-menu-item-selected]:text-black-1
              [&_.ant-menu-item.ant-menu-item-selected]:after:inset-x-0 
              [&_.ant-menu-item.ant-menu-item-selected]:after:border-none
              [&_.ant-menu-item.ant-menu-item-selected]:hover:text-black-1 
              [&_.ant-menu-item.ant-menu-item-selected]:hover:after:inset-x-0 
              [&_.ant-menu-item.ant-menu-item-selected]:hover:after:border-none
              [&_.ant-menu-item.ant-menu-item-selected_.ant-typography]:text-black-1
              [&_.ant-menu-item.ant-menu-item-selected_svg]:text-black-1 
              [&_.ant-menu-item]:after:inset-x-0

              [&_.ant-menu-item]:hover:text-black-1 
              [&_.ant-menu-item]:hover:after:inset-x-0
              [&_.ant-menu-item_.ant-typography]:text-dark-8
              [&_.ant-menu-item_svg]:text-dark-8 
              [&_.ant-menu-overflow-item]:after:border-none 
            `,
            className
          )}
          {...restProps}
        />
      );
    }
    case 'mobile-view': {
      return (
        <Menu
          ref={ref}
          className={tw(
            `
              group
              w-full
              outline-none
              [&_.ant-menu-item.ant-menu-item-active]:text-blue-2 
              [&_.ant-menu-item.ant-menu-item-active]:after:inset-x-0 
              [&_.ant-menu-item.ant-menu-item-active]:after:border-blue-2
              [&_.ant-menu-item.ant-menu-item-active]:hover:text-blue-2 
              [&_.ant-menu-item.ant-menu-item-active]:hover:after:inset-x-0 
              [&_.ant-menu-item.ant-menu-item-active]:hover:after:border-blue-2
              [&_.ant-menu-item.ant-menu-item-active_.ant-typography]:text-blue-2
              [&_.ant-menu-item.ant-menu-item-active_svg]:text-blue-2

              [&_.ant-menu-item.ant-menu-item-selected]:text-blue-2 
              [&_.ant-menu-item.ant-menu-item-selected]:after:inset-x-0 
              [&_.ant-menu-item.ant-menu-item-selected]:after:border-blue-2 
              [&_.ant-menu-item.ant-menu-item-selected]:hover:text-blue-2
              [&_.ant-menu-item.ant-menu-item-selected]:hover:after:inset-x-0 
              [&_.ant-menu-item.ant-menu-item-selected]:hover:after:border-blue-2 
              [&_.ant-menu-item.ant-menu-item-selected_.ant-typography]:text-blue-2
              [&_.ant-menu-item.ant-menu-item-selected_svg]:text-blue-2

              [&_.ant-menu-item]:after:inset-x-0 
              [&_.ant-menu-item]:hover:text-blue-2
              [&_.ant-menu-item]:hover:after:inset-x-0
              [&_.ant-menu-item_.ant-typography]:text-dark-8 
              [&_.ant-menu-item_svg]:text-dark-8 
            `,
            className
          )}
          {...restProps}
        />
      );
    }
    default:
      break;
  }

  return <Menu ref={ref} className={tw('', className)} {...restProps} />;
});
