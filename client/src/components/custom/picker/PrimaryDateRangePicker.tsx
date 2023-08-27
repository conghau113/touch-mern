import { tw } from '../../../utils/classUtil';
import { DatePicker } from 'antd';
import { type DatePickerProps, type RangePickerProps } from 'antd/es/date-picker';
import React from 'react';

const { RangePicker } = DatePicker;

type PrimaryDateRangePickerProps = Omit<DatePickerProps, 'placeholder'> &
  RangePickerProps & {
    dropdownClassName?: string;
    popupClassName?: string;
  };

export default React.forwardRef(function PrimaryDateRangePicker(
  props: PrimaryDateRangePickerProps,
  ref: React.Ref<any> | null
) {
  const { className, ...restProps } = props;

  return (
    <RangePicker
      ref={ref}
      className={tw('w-full border-main-purple py-3', className)}
      placeholder={['Chọn ngày', 'Chọn ngày']}
      format={['DD/MM/YYYY', 'DD/MM/YYYY']}
      {...restProps}
    />
  );
});
