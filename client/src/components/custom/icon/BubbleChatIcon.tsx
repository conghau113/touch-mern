import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function BubbleChatIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M15.166 7.55556C15.166 4.37159 12.0852 2 8.49935 2C4.91346 2 1.83268 4.37159 1.83268 7.55556C1.83268 8.8623 2.38834 10.0347 3.25086 10.9735L2.83995 14.5347L6.81066 12.9195C7.36805 13.064 7.9207 13.1111 8.49935 13.1111C12.0852 13.1111 15.166 10.7395 15.166 7.55556ZM8.49935 3.11111C11.6912 3.11111 14.0549 5.18396 14.0549 7.55556C14.0549 9.92715 11.6912 12 8.49935 12C7.92254 12 7.4245 11.9475 6.93676 11.8012L6.74919 11.7449L4.15874 12.7987L4.41535 10.5748L4.22552 10.3849C3.41723 9.57665 2.94379 8.60013 2.94379 7.55556C2.94379 5.18396 5.30746 3.11111 8.49935 3.11111Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
