import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function UserFilledIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='14' height='18' viewBox='0 0 14 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.4116 5.07571C11.4116 7.52324 9.44917 9.48576 6.99992 9.48576C4.5515 9.48576 2.58826 7.52324 2.58826 5.07571C2.58826 2.62819 4.5515 0.666504 6.99992 0.666504C9.44917 0.666504 11.4116 2.62819 11.4116 5.07571ZM6.99992 17.3332C3.38523 17.3332 0.333252 16.7457 0.333252 14.479C0.333252 12.2115 3.4044 11.6448 6.99992 11.6448C10.6154 11.6448 13.6666 12.2323 13.6666 14.499C13.6666 16.7665 10.5954 17.3332 6.99992 17.3332Z'
            fill='#150A5A'
          />
        </svg>
      )}
    />
  );
}
