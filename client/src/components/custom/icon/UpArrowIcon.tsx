import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function UpArrowIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' viewBox='0 96 960 960' fill='currentColor'>
          <path d='m283 699-43-43 240-240 240 240-43 43-197-197-197 197Z' />
        </svg>
      )}
    />
  );
}
