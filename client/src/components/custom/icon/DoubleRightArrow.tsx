import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function DoubleRightArrow(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M7.21499 0.696055C6.97537 0.434648 6.58035 0.434648 6.34073 0.696055C6.10875 0.94912 6.10875 1.35391 6.34073 1.60698L10.3677 6L6.34073 10.393C6.10875 10.6461 6.10875 11.0509 6.34073 11.3039C6.58035 11.5654 6.97537 11.5654 7.21499 11.3039L11.6594 6.45546C11.8914 6.2024 11.8914 5.79761 11.6594 5.54454L7.21499 0.696055Z'
            fill='black'
          />
          <path
            d='M1.21499 0.696055C0.975365 0.434648 0.580353 0.434648 0.34073 0.696055C0.108754 0.94912 0.108754 1.35391 0.34073 1.60698L4.36767 6L0.34073 10.393C0.108754 10.6461 0.108754 11.0509 0.34073 11.3039C0.580353 11.5654 0.975365 11.5654 1.21499 11.3039L5.65943 6.45546C5.89141 6.2024 5.89141 5.79761 5.65943 5.54454L1.21499 0.696055Z'
            fill='black'
          />
        </svg>
      )}
    />
  );
}
