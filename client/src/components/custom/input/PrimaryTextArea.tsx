import { tw } from '../../../utils/classUtil';
import { Input, type InputRef } from 'antd';
import { type TextAreaProps } from 'antd/es/input';
import React from 'react';

const { TextArea } = Input;

type Variant = 'suffix';
interface PrimaryTextAreaProps extends TextAreaProps {
  variant?: Variant;
  /**
   * @description Chỉ hoạt động với variant = 'suffix'
   */
  suffix?: React.ReactNode;
}

export default React.forwardRef(function PrimaryTextArea(props: PrimaryTextAreaProps, ref: React.Ref<InputRef> | null) {
  const { className, variant, suffix, ...restProps } = props;

  switch (variant) {
    case 'suffix': {
      return (
        <div className='flex gap-1'>
          <TextArea
            ref={ref}
            autoSize={{ minRows: 2, maxRows: 10 }}
            allowClear
            className={tw('rounded-lg p-2 text-sm font-normal', className)}
            placeholder='Nhập nội dung'
            {...restProps}
          />
          <div>{suffix}</div>
        </div>
      );
    }
    default: {
      return (
        <TextArea
          ref={ref}
          className={tw(
            'border-main-purple border-opacity-60 border-dashed text-sm font-normal placeholder-black-1 scrollbar scrollbar--horizontal placeholder:text-sm placeholder:opacity-40',
            className
          )}
          placeholder='Nhập nội dung'
          {...restProps}
        />
      );
    }
  }
});
