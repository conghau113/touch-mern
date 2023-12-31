import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function UserManualIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M13 1H3C2.72344 1 2.5 1.22344 2.5 1.5V14.5C2.5 14.7766 2.72344 15 3 15H13C13.2766 15 13.5 14.7766 13.5 14.5V1.5C13.5 1.22344 13.2766 1 13 1ZM8.9375 2.125H10.4375V5.40469L9.71094 4.875L8.9375 5.42812V2.125ZM12.375 13.875H3.625V2.125H8V6.76406C8 6.81562 8.01562 6.86719 8.04688 6.90938C8.06584 6.93619 8.08994 6.95898 8.11778 6.97642C8.14561 6.99386 8.17663 7.00561 8.20903 7.01099C8.24143 7.01636 8.27458 7.01526 8.30656 7.00774C8.33853 7.00022 8.3687 6.98644 8.39531 6.96719L9.70469 6.03125L10.9766 6.95937C11.0188 6.99062 11.0703 7.00781 11.1234 7.00781C11.2609 7.00781 11.3734 6.89531 11.3734 6.75781V2.125H12.3734V13.875H12.375Z'
            fill='#262626'
          />
        </svg>
      )}
    />
  );
}
