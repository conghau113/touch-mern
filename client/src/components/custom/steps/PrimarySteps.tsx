import { tw } from '../../../utils/classUtil';
import { Steps, type StepsProps } from 'antd';

type Variant = 'default';

interface PrimaryStepsProps extends StepsProps {
  variant?: Variant;
}

export default function PrimarySteps(props: PrimaryStepsProps) {
  const { variant, className, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return <Steps {...restProps} />;
    }

    default: {
      return <Steps className={tw('border-4 border-green-4 bg-red-600', className)} {...restProps} />;
    }
  }
}
