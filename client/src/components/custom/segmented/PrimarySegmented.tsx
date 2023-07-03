import { tw } from '../../../utils/classUtil';
import { Segmented, type SegmentedProps } from 'antd';
import React from 'react';

type Variant = 'default';

interface PrimarySegmentedProps extends SegmentedProps {
  variant?: Variant;
}

export default React.forwardRef(function PrimarySegmented(
  props: PrimarySegmentedProps,
  ref: React.Ref<HTMLDivElement> | undefined | any
) {
  const { className, variant, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return <Segmented ref={ref} className={tw(className)} {...restProps} />;
    }
    default: {
      return <Segmented ref={ref} className={tw(className)} {...restProps} />;
    }
  }
});
