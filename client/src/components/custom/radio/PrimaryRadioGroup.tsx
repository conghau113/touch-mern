import { tw } from '../../../utils/classUtil';
import { Radio, type RadioGroupProps } from 'antd';
import _ from 'lodash';
import React from 'react';

interface PrimaryRadioProps extends RadioGroupProps {
  option: Array<{ value: any; label: string }>;
  classNameSubRadio?: string;
}

export default React.forwardRef(function PrimaryRadioGroup(
  props: PrimaryRadioProps,
  ref: React.Ref<HTMLInputElement> | null
) {
  const { className, classNameSubRadio, option, ...restProps } = props;

  return (
    <Radio.Group ref={ref} className={tw(className)} {...restProps}>
      {_.map(option, (item, index: number) => {
        const { value, label } = item;
        return (
          <Radio key={`_${index}`} className={tw(classNameSubRadio)} value={value}>
            {label}
          </Radio>
        );
      })}
    </Radio.Group>
  );
});
