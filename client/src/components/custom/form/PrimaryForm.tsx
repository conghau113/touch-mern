import { Form, type FormInstance, type FormProps } from 'antd';
import React from 'react';
import { tw } from '../../../utils/classUtil';

interface PrimaryFormProps extends FormProps {
  children: React.ReactNode;
}

export default React.forwardRef(function PrimaryForm(
  props: PrimaryFormProps,
  ref: React.Ref<FormInstance<any>> | undefined
) {
  const { className, ...restProps } = props;

  return (
    <Form
      ref={ref}
      className={tw('[&_.ant-form-item-label]:font-medium', className)}
      scrollToFirstError={{
        behavior: 'smooth',
        block: 'center',
      }}
      {...restProps}
    />
  );
});
