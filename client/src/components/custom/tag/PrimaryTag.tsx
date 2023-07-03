import { tw } from '../../../utils/classUtil';
import { Tag, Typography, type TagProps } from 'antd';
import _ from 'lodash';
import React from 'react';
import PrimaryTooltip, { type PrimaryTooltipProps } from '../tooltip/PrimaryTooltip';

const { Text } = Typography;

type Variant = 'more' | 'in-card' | 'hashtag-active' | 'hashtag-normal';

export interface PrimaryTagProps extends TagProps {
  maxItems?: number;
  variant?: Variant;
  typographyClassName?: string;
  textClassName?: string;
  tooltipProps?: PrimaryTooltipProps;
}

export default React.forwardRef(function PrimaryTag(props: PrimaryTagProps, ref: React.Ref<HTMLElement> | null) {
  const {
    variant,
    maxItems,
    className,
    typographyClassName,
    textClassName,
    tooltipProps,
    color,
    children,
    ...restProps
  } = props;
  let tagClassNameByColor = '';
  let textClassNameByColor = '';
  const tagClassName = maxItems === 1 ? '' : 'mr-1 w-auto max-w-[130px]';

  switch (color) {
    case 'default': {
      tagClassNameByColor = 'bg-light-11';
      textClassNameByColor = 'text-dark-7';
      break;
    }
    case 'warning': {
      tagClassNameByColor = 'bg-orange-4';
      textClassNameByColor = 'text-orange-1';
      break;
    }
    case 'success': {
      tagClassNameByColor = 'bg-green-5';
      textClassNameByColor = 'text-green-4';
      break;
    }
    case 'processing': {
      tagClassNameByColor = 'bg-blue-4';
      textClassNameByColor = 'text-blue-5';
      break;
    }
    case 'error': {
      tagClassNameByColor = 'bg-red-2';
      textClassNameByColor = 'text-red-3';
      break;
    }
    default:
      break;
  }

  switch (variant) {
    case 'more':
      return (
        <PrimaryTooltip
          overlayStyle={{ maxWidth: 600 }}
          {...{ hidden: !_.size(tooltipProps), ...tooltipProps }}
          placement='right'
        >
          <Tag
            ref={ref}
            className={tw('rounded-full border-blue-12 bg-blue-12 px-3 py-1', tagClassNameByColor, className)}
            {...{ color, ...restProps }}
          >
            <Typography className={tw('flex ', typographyClassName)}>
              <Text ellipsis className={tw('text-xs text-blue-11', textClassName)}>
                {children}
              </Text>
            </Typography>
          </Tag>
        </PrimaryTooltip>
      );
    case 'hashtag-active':
      return (
        <PrimaryTooltip>
          <Tag
            ref={ref}
            className={tw(
              ' flex cursor-pointer items-center rounded-full border-none border-blue-12 bg-blue-12 px-3 pb-1.5 pt-1',
              tagClassNameByColor,
              className
            )}
            {...{ color, ...restProps }}
          >
            <Typography className={tw('flex items-center ', typographyClassName)}>
              <Text ellipsis className={tw('text-xs text-blue-11', textClassName)}>
                {children}
              </Text>
            </Typography>
          </Tag>
        </PrimaryTooltip>
      );
    case 'hashtag-normal':
      return (
        <PrimaryTooltip>
          <Tag
            ref={ref}
            className={tw(
              ' flex cursor-pointer items-center rounded-full border-none px-3 pb-1.5 pt-1 text-blue-12',
              tagClassNameByColor,
              className
            )}
            {...{ color, ...restProps }}
          >
            <Typography className={tw('flex items-center ', typographyClassName)}>
              <Text ellipsis className={tw('text-xs text-blue-11', textClassName)}>
                {children}
              </Text>
            </Typography>
          </Tag>
        </PrimaryTooltip>
      );
    case 'in-card':
      return (
        <PrimaryTooltip {...{ hidden: !_.size(tooltipProps), ...tooltipProps }}>
          <Tag
            ref={ref}
            className={tw('rounded-full bg-white px-3 py-1 ', tagClassNameByColor, className)}
            {...{ color, ...restProps }}
          >
            <Typography className={tw('flex', typographyClassName)}>
              <Text ellipsis className={tw('text-xs ', textClassName)}>
                {children}
              </Text>
            </Typography>
          </Tag>
        </PrimaryTooltip>
      );
    default: {
      return (
        <PrimaryTooltip {...{ hidden: !_.size(tooltipProps), ...tooltipProps }}>
          <Tag
            ref={ref}
            className={tw('rounded-full px-3 py-1 ', tagClassNameByColor, tagClassName, className)}
            {...{ color, ...restProps }}
          >
            <Typography className={tw('flex ', typographyClassName)}>
              <Text ellipsis className={tw(' text-xs', textClassNameByColor, textClassName)}>
                {children}
              </Text>
            </Typography>
          </Tag>
        </PrimaryTooltip>
      );
    }
  }
});
