import { tw } from '../../../utils/classUtil';
import { DatePicker, type DatePickerProps } from 'antd';
import React from 'react';

type PrimaryDatePickerProps = DatePickerProps & {
  showToday?: boolean;
  showNow?: boolean;
};

export default React.forwardRef(function PrimaryDatePicker(props: PrimaryDatePickerProps, ref: React.Ref<any> | null) {
  const { className, ...restProps } = props;

  return (
    <DatePicker
      ref={ref}
      className={tw('w-full border-main-purple py-3', className)}
      placeholder='Chọn ngày'
      format='DD/MM/YYYY'
      showToday={false}
      showNow={false}
      {...restProps}
    />
  );
});
