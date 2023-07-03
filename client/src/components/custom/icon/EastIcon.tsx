import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function EastIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg xmlns='http://www.w3.org/2000/svg' height='1rem' width='1rem' fill='currentColor' viewBox='0 96 960 960'>
          <path d='m600 856-42-42 208-208H80v-60h686L558 338l42-42 280 280-280 280Z' />
        </svg>
      )}
    />
  );
}
