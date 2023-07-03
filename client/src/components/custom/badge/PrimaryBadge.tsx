import { Badge, type BadgeProps } from 'antd';
import { tw } from '../../../utils/classUtil';

type Variant = 'border-dot';

interface PrimaryBadgeProps extends BadgeProps {
  variant?: Variant;
}

export default function PrimaryBadge(props: PrimaryBadgeProps) {
  const { variant, className, ...restProps } = props;

  switch (variant) {
    case 'border-dot': {
      return (
        <Badge
          className={tw(
            `
            [&_.ant-scroll-number.ant-badge-dot]:h-2.5 [&_.ant-scroll-number.ant-badge-dot]:w-2.5
            [&_.ant-scroll-number.ant-badge-dot]:border [&_.ant-scroll-number.ant-badge-dot]:border-white
            `,
            className
          )}
          {...restProps}
        />
      );
    }
    default: {
      return <Badge className={className} {...restProps} />;
    }
  }
}
