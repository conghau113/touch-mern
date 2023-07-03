import { tw } from '../../../utils/classUtil';
import { TimePicker, type TimeRangePickerProps } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface PrimaryTimeRangePickerProps extends TimeRangePickerProps {}

export default React.forwardRef(function PrimaryTimeRangePicker(
  props: PrimaryTimeRangePickerProps,
  ref: React.Ref<any> | null
) {
  const id = uuidv4();
  const { className, ...restProps } = props;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    // event.preventDefault()
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const okButton = document.querySelector(
        `.time-range-picker-popup-${id} .ant-picker-time-range-wrapper .ant-picker-ok button`
      ) as HTMLElement;
      okButton?.click();
    }
  };

  return (
    <TimePicker.RangePicker
      ref={ref}
      className={tw(
        'flex w-full justify-items-start border-blue-20 py-3 [&_.ant-picker-input]:w-auto [&_.ant-picker-input_input]:text-center [&_.ant-picker-suffix]:flex [&_.ant-picker-suffix]:w-[40%] [&_.ant-picker-suffix]:justify-end',
        `time-range-picker-${id}`,
        className
      )}
      format={'HH:mm'}
      showNow={true}
      placeholder={['Giờ bắt đầu', 'Giờ kết thúc']}
      minuteStep={15}
      onBlur={(event) => handleBlur(event)}
      onOpenChange={handleOpenChange}
      popupClassName={tw('[&_.ant-picker-footer]:hidden', `time-range-picker-popup-${id}`)}
      {...restProps}
    />
  );
});
