import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function EyeIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M6.68759 8C6.68759 8.46413 6.87196 8.90925 7.20015 9.23744C7.52834 9.56563 7.97346 9.75 8.43759 9.75C8.90172 9.75 9.34684 9.56563 9.67503 9.23744C10.0032 8.90925 10.1876 8.46413 10.1876 8C10.1876 7.53587 10.0032 7.09075 9.67503 6.76256C9.34684 6.43437 8.90172 6.25 8.43759 6.25C7.97346 6.25 7.52834 6.43437 7.20015 6.76256C6.87196 7.09075 6.68759 7.53587 6.68759 8ZM15.222 7.59688C13.7407 4.47656 11.5017 2.90625 8.50009 2.90625C5.49697 2.90625 3.25947 4.47656 1.77822 7.59844C1.7188 7.72425 1.68799 7.86165 1.68799 8.00078C1.68799 8.13991 1.7188 8.27732 1.77822 8.40312C3.25947 11.5234 5.49853 13.0938 8.50009 13.0938C11.5032 13.0938 13.7407 11.5234 15.222 8.40156C15.3423 8.14844 15.3423 7.85469 15.222 7.59688ZM8.43759 10.75C6.91884 10.75 5.68759 9.51875 5.68759 8C5.68759 6.48125 6.91884 5.25 8.43759 5.25C9.95634 5.25 11.1876 6.48125 11.1876 8C11.1876 9.51875 9.95634 10.75 8.43759 10.75Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
