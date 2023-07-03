import { tw } from '../../../utils/classUtil';
import { Typography } from 'antd';
import { type TypographyProps } from 'antd/es/typography/Typography';
import React from 'react';

interface PrimaryTypographyProps extends TypographyProps<any> {
  className?: string;
}

export default React.forwardRef(function PrimaryTypography(
  props: PrimaryTypographyProps,
  ref: React.Ref<HTMLElement> | null
) {
  const { className, children, ...restProps } = props;

  return (
    <Typography ref={ref} className={tw('whitespace-pre-line', className)} {...restProps}>
      {children}
    </Typography>
  );
});
