import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function LeftArrowIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='6' height='12' viewBox='0 0 6 12' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5.65943 1.60698L1.63249 6L5.65943 10.393C5.89141 10.6461 5.89141 11.0509 5.65943 11.3039C5.41981 11.5654 5.0248 11.5654 4.78518 11.3039L0.340731 6.45546C0.108754 6.20239 0.108754 5.7976 0.340731 5.54454L4.78518 0.696055C5.0248 0.434648 5.41981 0.434648 5.65943 0.696055C5.89141 0.94912 5.89141 1.35391 5.65943 1.60698Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
