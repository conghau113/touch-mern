import { Checkbox, type CheckboxProps } from 'antd';
import React from 'react';
import { tw } from '../../../utils/classUtil';

interface PrimaryCheckboxProps extends CheckboxProps {}

export default React.forwardRef(function PrimaryCheckbox(
  props: PrimaryCheckboxProps,
  ref: React.Ref<HTMLInputElement> | null
) {
  const { className, ...restProps } = props;

  return <Checkbox ref={ref} className={tw(className)} {...restProps} />;
});
