import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function ReplyIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M4.75325 3.79329L10.0866 3.7933C11.9266 3.7933 13.4199 5.28663 13.4199 7.12663C13.4199 8.96663 11.9266 10.46 10.0866 10.46L2.75325 10.46'
            stroke='#595959'
            strokeWidth='1.5'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M4.28711 8.79321L2.58044 10.4999L4.28711 12.2065'
            stroke='#595959'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    />
  );
}
