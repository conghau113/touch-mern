import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function DownArrowIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M3.60698 5.34073C3.35391 5.10875 2.94912 5.10875 2.69605 5.34073C2.43465 5.58035 2.43465 5.97537 2.69605 6.21499L7.54454 10.6594C7.7976 10.8914 8.2024 10.8914 8.45546 10.6594L13.3039 6.21499C13.5654 5.97537 13.5654 5.58035 13.3039 5.34073C13.0509 5.10875 12.6461 5.10875 12.393 5.34073L8 9.36767L3.60698 5.34073Z'
            fill='currentColor'
            // style='mix-blend-mode:multiply'
          />
        </svg>
      )}
    />
  );
}
