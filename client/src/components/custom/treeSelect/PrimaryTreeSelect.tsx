import { tw } from '../../../utils/classUtil';
import { TreeSelect, type RefSelectProps, type TreeSelectProps } from 'antd';
import React from 'react';
import DownArrowIcon from '../icon/DownArrowIcon';

interface PrimaryTreeSelectProps extends TreeSelectProps {}

export default React.forwardRef(function PrimaryTreeSelect(
  props: PrimaryTreeSelectProps,
  ref: React.Ref<RefSelectProps> | null
) {
  const { className, ...restProps } = props;

  return (
    <TreeSelect
      ref={ref}
      className={tw(
        `
        h-full
          w-full [&_.ant-select-clear]:mr-5 
          [&_.ant-select-selection-item]:flex [&_.ant-select-selection-item]:items-center 
          [&_.ant-select-selection-placeholder]:flex [&_.ant-select-selection-placeholder]:items-center 
          [&_.ant-select-selection-placeholder]:text-dark-12 [&_.ant-select-selection-search]:flex 
          [&_.ant-select-selection-search]:items-center
          [&_.ant-select-selector]:h-full
          [&_.ant-select-selector]:border-blue-19
          [&_.ant-select-selector]:border-opacity-20
        `,
        className
      )}
      suffixIcon={<DownArrowIcon className='pointer-events-none text-black-1 opacity-60' />}
      {...restProps}
    />
  );
});
