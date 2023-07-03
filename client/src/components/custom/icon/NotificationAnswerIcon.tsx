import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function NotificationAnswerIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-8 w-8', className)}
      {...restProps}
      component={() => (
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect width='32' height='32' rx='16' fill='#FFF7E6' />
          <path
            d='M14.1482 13.037V9.33334L7.66675 15.8148L14.1482 22.2963V18.5C18.7779 18.5 22.0186 19.9815 24.3334 23.2222C23.4075 18.5926 20.6297 13.963 14.1482 13.037Z'
            fill='#FA8C16'
          />
        </svg>
      )}
    />
  );
}
