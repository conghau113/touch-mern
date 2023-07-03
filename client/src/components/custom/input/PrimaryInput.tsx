import { tw } from '../../../utils/classUtil';
import { Input, type InputProps, type InputRef } from 'antd';
import React from 'react';
import SearchIcon from '../icon/SearchIcon';

type Variant = 'search-suffix' | 'search-prefix';

interface PrimaryInputProps extends InputProps {
  variant?: Variant;
}

export default React.forwardRef(function PrimaryInput(props: PrimaryInputProps, ref: React.Ref<InputRef> | null) {
  const { variant, className, ...restProps } = props;

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
          suffix={<SearchIcon className='pointer-events-none' style={{ color: '#000000', opacity: 60 }} />}
          {...restProps}
        />
      );
    }
    case 'search-prefix': {
      return (
        <Input
          ref={ref}
          className={tw('h-12 text-sm [&_.ant-input]:bg-transparent', className)}
          prefix={<SearchIcon />}
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
