import { tw } from '../../../utils/classUtil';
import { Rate, type RateProps } from 'antd';
import React from 'react';

type Variant = 'default';

interface PrimaryRateProps extends RateProps {
  variant?: Variant;
}

export default React.forwardRef(function PrimaryRate(props: PrimaryRateProps, ref: React.Ref<HTMLElement> | null) {
  const { variant, className, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return <Rate ref={ref} className={className} {...restProps} />;
    }
    default: {
      return (
        <Rate
          ref={ref}
          className={tw(
            'flex w-fit items-start text-yellow-1 [&_.ant-rate-star-first]:flex [&_.ant-rate-star-second]:flex [&_.anticon-star]:h-4 [&_.anticon-star]:w-4',
            className
          )}
          {...restProps}
        />
      );
    }
  }
});
