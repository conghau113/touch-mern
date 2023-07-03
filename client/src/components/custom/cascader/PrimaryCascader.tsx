import { Cascader, type CascaderProps, type RefSelectProps } from 'antd';
import React from 'react';
import { tw } from '../../../utils/classUtil';
import DownArrowIcon from '../icon/DownArrowIcon';

type PrimaryCascaderProps = CascaderProps<any> & {};

export default React.forwardRef(function PrimaryCascader(
  props: PrimaryCascaderProps,
  ref: React.Ref<RefSelectProps> | null
) {
  const { className, ...restProps } = props;

  return (
    <Cascader
      ref={ref}
      className={tw(
        `
          h-12 w-full
          [&_.ant-select-selection-item]:flex [&_.ant-select-selection-item]:items-center 
          [&_.ant-select-selection-placeholder]:flex [&_.ant-select-selection-placeholder]:items-center 
          [&_.ant-select-selection-search]:flex [&_.ant-select-selection-search]:items-center 
          [&_.ant-select-selector]:h-full
        `,
        className
      )}
      suffixIcon={<DownArrowIcon />}
      {...restProps}
    />
  );
});
