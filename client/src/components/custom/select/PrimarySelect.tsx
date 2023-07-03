import { tw } from '../../../utils/classUtil';
import { SearchOutlined } from '@ant-design/icons';
import { Select, Typography, type RefSelectProps, type SelectProps } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import DownArrowIcon from '../icon/DownArrowIcon';

type variant = 'option' | 'dafault' | 'normal';
export interface PrimarySelectProps extends SelectProps {
  variant?: variant;
  iconClassName?: string;
}

export default React.forwardRef(function PrimarySelect(
  props: PrimarySelectProps,
  ref: React.Ref<RefSelectProps> | null
) {
  const {
    className,
    variant,
    open,
    mode,
    showSearch,
    defaultOpen,
    onDropdownVisibleChange,
    options,
    iconClassName,
    ...restProps
  } = props;
  const [isOpen, setOpen] = useState<boolean>(defaultOpen ?? open ?? false);

  switch (variant) {
    case 'option': {
      return (
        <Select
          maxLength={1500}
          ref={ref}
          className={tw(
            `
              h-12
              w-full [&_.ant-select-selection-item]:flex
              [&_.ant-select-selection-item]:items-center [&_.ant-select-selection-placeholder]:flex 
              [&_.ant-select-selection-placeholder]:items-center [&_.ant-select-selection-placeholder]:text-dark-12  
              [&_.ant-select-selection-search-input]:pr-5 [&_.ant-select-selection-search]:flex
              [&_.ant-select-selection-search]:items-center        
              [&_.ant-select-selector]:h-full       
              [&_.ant-select-selector]:border-blue-20 
            `,
            className
          )}
          suffixIcon={
            isOpen && ((mode === 'multiple' && (showSearch === undefined || showSearch)) ?? showSearch) ? (
              <SearchOutlined className={tw('pointer-events-none  text-black-1 opacity-60', iconClassName)} />
            ) : (
              <DownArrowIcon className={tw('pointer-events-none  text-black-1 opacity-60', iconClassName)} />
            )
          }
          onDropdownVisibleChange={(open) => {
            onDropdownVisibleChange?.(open);
            setOpen(open);
          }}
          options={_.map(options, (option) => ({
            label: (
              <div>
                <Typography className='text-base text-black-1'>{option?.label}</Typography>
                <Typography className='text-xs text-dark-1'>
                  {`${option?.rmisAccount}@fpt.com.vn`.charAt(0).toUpperCase() +
                    `${option?.rmisAccount}@fpt.com.vn`.slice(1)}
                </Typography>
              </div>
            ),
            value: `${option?.value}`,
          }))}
          {...{ open, defaultOpen, showSearch, mode, ...restProps }}
        />
      );
    }
    case 'normal': {
      return (
        <Select
          ref={ref}
          maxLength={1500}
          className={tw(
            `

          h-12 w-full border-blue-20
           [&_.ant-select-selection-item]:flex 
          [&_.ant-select-selection-item]:items-center [&_.ant-select-selection-placeholder]:flex 
          [&_.ant-select-selection-placeholder]:items-center 
          [&_.ant-select-selection-placeholder]:text-dark-12
          [&_.ant-select-selection-search-input]:pr-5
          [&_.ant-select-selection-search]:flex
          [&_.ant-select-selection-search]:items-center
          [&_.ant-select-selector]:h-full
          [&_.ant-select-selector]:border-blue-19
          [&_.ant-select-selector]:border-opacity-20
          
        `,
            className
          )}
          options={options}
          onDropdownVisibleChange={(open) => {
            onDropdownVisibleChange?.(open);
            setOpen(open);
          }}
          {...{ open, defaultOpen, showSearch, mode, ...restProps }}
        />
      );
    }

    default: {
      return (
        <Select
          ref={ref}
          maxLength={1500}
          className={tw(
            `
            h-12
              w-full border-blue-20 [&_.ant-select-clear]:mr-5
               [&_.ant-select-selection-item]:flex 
              [&_.ant-select-selection-item]:items-center [&_.ant-select-selection-placeholder]:flex 
              [&_.ant-select-selection-placeholder]:items-center 
              [&_.ant-select-selection-placeholder]:text-dark-12
              [&_.ant-select-selection-search-input]:pr-5
              [&_.ant-select-selection-search]:flex
              [&_.ant-select-selection-search]:items-center
              [&_.ant-select-selector]:h-full
              [&_.ant-select-selector]:border-blue-19
              [&_.ant-select-selector]:border-opacity-20
            `,
            className
          )}
          suffixIcon={
            isOpen && ((mode === 'multiple' && (showSearch === undefined || showSearch)) ?? showSearch) ? (
              <SearchOutlined className={tw('pointer-events-none  text-black-1 opacity-60', iconClassName)} />
            ) : (
              <DownArrowIcon className={tw('pointer-events-none  text-black-1 opacity-60', iconClassName)} />
            )
          }
          options={options}
          onDropdownVisibleChange={(open) => {
            onDropdownVisibleChange?.(open);
            setOpen(open);
          }}
          {...{ open, defaultOpen, showSearch, mode, ...restProps }}
        />
      );
    }
  }
});
