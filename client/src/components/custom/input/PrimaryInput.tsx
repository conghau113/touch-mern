import { tw } from '../../../utils/classUtil';
import { Input, Space, type InputProps, type InputRef } from 'antd';
import React from 'react';
import SearchIcon from '../icon/SearchIcon';

type Variant = 'search-suffix' | 'search-prefix';

interface PrimaryInputProps extends InputProps {
  variant?: Variant;
  onClickSearchIcon?: (e: any) => void;
}

export default React.forwardRef(function PrimaryInput(props: PrimaryInputProps, ref: React.Ref<InputRef> | null) {
  const { variant, className, onClickSearchIcon, ...restProps } = props;

  switch (variant) {
    case 'search-suffix': {
      return (
        <Input
          ref={ref}
          allowClear
          className={tw(
            ` h-12 border-blue-19 border-opacity-20 text-sm [&_.ant-input]:bg-transparent [&_input]:placeholder-dark-12`,
            className
          )}
          suffix={
            <div className='cursor-pointer hover:opacity-70' onClick={onClickSearchIcon}>
              <SearchIcon className='pointer-events-none' style={{ color: '#000000', opacity: 60 }} />
            </div>
          }
          {...restProps}
        />
      );
    }
    case 'search-prefix': {
      return (
        <Input
          onClick={onClickSearchIcon}
          ref={ref}
          className={tw('h-12 text-sm [&_.ant-input]:bg-transparent', className)}
          prefix={
            <Space onClick={onClickSearchIcon} className='cursor-pointer pr-2 border-r-2 border-r-main-blue'>
              <SearchIcon className='scale-110' />
            </Space>
          }
          {...restProps}
        />
      );
    }
    default: {
      return (
        <Input
          ref={ref}
          className={tw('h-12 text-sm [&_.ant-input]:bg-transparent [&_input]:placeholder-dark-12', className)}
          {...restProps}
        />
      );
    }
  }
});
