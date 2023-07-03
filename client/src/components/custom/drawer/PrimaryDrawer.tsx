import { Drawer, type DrawerProps } from 'antd';
import { tw } from '../../../utils/classUtil';

type Variant = 'no-style';

interface PrimaryDrawerProps extends DrawerProps {
  variant?: Variant;
}

export default function PrimaryDrawer(props: PrimaryDrawerProps) {
  const { className, variant, ...restProps } = props;

  switch (variant) {
    case 'no-style': {
      return (
        <Drawer
          className={tw(
            `
              [&_.ant-drawer-body]:p-0
            `,
            className
          )}
          {...restProps}
        />
      );
    }
    default: {
      return <Drawer className={tw('', className)} {...restProps} />;
    }
  }
}
