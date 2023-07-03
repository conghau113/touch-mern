import { tw } from '../../../utils/classUtil';
import { Result, type ResultProps } from 'antd';

type Variant = 'default';

interface PrimaryResultProps extends ResultProps {
  variant?: Variant;
}

export default function PrimaryResult(props: PrimaryResultProps) {
  const { className, variant, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return <Result className={className} {...restProps} />;
    }
    default: {
      return (
        <Result
          className={tw('flex flex-col py-4 [&_.ant-result-icon]:pb-2 [&_.ant-typography]:!text-center', className)}
          {...restProps}
        />
      );
    }
  }
}
