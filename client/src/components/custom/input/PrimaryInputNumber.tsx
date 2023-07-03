import { tw } from '../../../utils/classUtil';
import { InputNumber, type InputNumberProps } from 'antd';
import React from 'react';

interface PrimaryInputNumberProps extends InputNumberProps {}

export default React.forwardRef(function PrimaryInputNumber(
  props: PrimaryInputNumberProps,
  ref: React.Ref<HTMLInputElement> | null
) {
  const { className, ...restProps } = props;

  return <InputNumber ref={ref} className={tw('flex h-12 w-full items-center', className)} {...restProps} />;
});
