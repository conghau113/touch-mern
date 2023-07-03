import { tw } from '../../../utils/classUtil';
import { Switch, type SwitchProps } from 'antd';
import React from 'react';

interface PrimarySwitchProps extends SwitchProps {}

export default React.forwardRef(function PrimarySwitch(props: PrimarySwitchProps, ref: React.Ref<HTMLElement> | null) {
  const { className, ...restProps } = props;

  return <Switch ref={ref} className={tw('bg-dark-9 [&.ant-switch-checked]:bg-blue-11', className)} {...restProps} />;
});
