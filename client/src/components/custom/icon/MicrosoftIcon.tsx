import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function MicrosoftIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-7 w-7', className)}
      {...restProps}
      component={() => (
        <svg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect x='17' y='17' width='10' height='10' fill='#FEBA08' />
          <rect x='5' y='17' width='10' height='10' fill='#05A6F0' />
          <rect x='17' y='5' width='10' height='10' fill='#80BC06' />
          <rect x='5' y='5' width='10' height='10' fill='#F25325' />
        </svg>
      )}
    />
  );
}
