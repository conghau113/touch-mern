import { Card, Divider, type CardProps } from 'antd';
import _ from 'lodash';
import React, { isValidElement } from 'react';
import { tw } from '../../../utils/classUtil';

type Variant = 'default' | 'no-spacing' | 'no-style' | 'layout';
type LayoutPartial = {
  className?: string;
  children: React.ReactNode;
  noDivider?: boolean;
};

interface PrimaryCardProps extends Omit<CardProps, 'content'> {
  variant?: Variant;
  /**
   * @description Chỉ hoạt động với variant = 'layout'
   */
  header?: LayoutPartial | React.ReactElement | string;
  /**
   * @description Chỉ hoạt động với variant = 'layout'
   */
  content?: LayoutPartial | React.ReactElement | string;
  /**
   * @description Chỉ hoạt động với variant = 'layout'
   */
  footer?: LayoutPartial | React.ReactElement | string;
}

export default React.forwardRef(function PrimaryCard(props: PrimaryCardProps, ref: React.Ref<HTMLDivElement> | null) {
  const { variant, className, header, content, footer, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return <Card ref={ref} className={tw(className)} {...restProps} />;
    }

    case 'no-spacing': {
      return (
        <Card ref={ref} className={tw('w-full rounded-xl bg-white [&>.ant-card-body]:p-0', className)} {...restProps} />
      );
    }

    case 'no-style': {
      return (
        <Card ref={ref} className={tw('border-none bg-transparent [&>.ant-card-body]:p-0', className)} {...restProps} />
      );
    }

    case 'layout': {
      return (
        <Card ref={ref} className={tw('w-full rounded-xl bg-white [&>.ant-card-body]:p-0', className)} {...restProps}>
          {header &&
            (isValidElement(header) || _.isString(header) ? (
              <>
                <div className={tw('flex flex-col px-6 py-4')}>{header}</div>
                <Divider />
              </>
            ) : (
              <>
                <div className={tw('flex flex-col px-6 py-4', (header as LayoutPartial).className)}>
                  {(header as LayoutPartial).children}
                </div>
                {!(header as LayoutPartial).noDivider && <Divider />}
              </>
            ))}
          {content &&
            (isValidElement(content) || _.isString(content) ? (
              <div className={tw('flex flex-col px-6 py-4')}>{content}</div>
            ) : (
              <div className={tw('flex flex-col px-6 py-4', (content as LayoutPartial).className)}>
                {(content as LayoutPartial).children}
              </div>
            ))}
          {footer &&
            (isValidElement(footer) || _.isString(footer) ? (
              <>
                <Divider />
                <div className={tw('flex flex-col px-6 py-4')}>{footer}</div>
              </>
            ) : (
              <>
                {!(footer as LayoutPartial).noDivider && <Divider />}
                <div className={tw('flex flex-col px-6 py-4', (footer as LayoutPartial).className)}>
                  {(footer as LayoutPartial).children}
                </div>
              </>
            ))}
        </Card>
      );
    }
    default: {
      return (
        <Card
          ref={ref}
          className={tw('w-full rounded-xl bg-white p-4 [&>.ant-card-body]:h-full [&>.ant-card-body]:p-0', className)}
          {...restProps}
        />
      );
    }
  }
});
