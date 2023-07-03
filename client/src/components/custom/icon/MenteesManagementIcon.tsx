import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function MenteesManagementIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M14.025 13.0333C14.5833 12.6667 15.3167 13.0667 15.3167 13.7333V14.8083C15.3167 15.8667 14.4917 17 13.5 17.3333L10.8417 18.2167C10.375 18.375 9.61668 18.375 9.15835 18.2167L6.50002 17.3333C5.50002 17 4.68335 15.8667 4.68335 14.8083V13.725C4.68335 13.0667 5.41668 12.6667 5.96668 13.025L7.68335 14.1417C8.34168 14.5833 9.17502 14.8 10.0083 14.8C10.8417 14.8 11.675 14.5833 12.3333 14.1417L14.025 13.0333Z'
            fill='currentColor'
          />
          <path
            d='M16.65 5.38333L11.6583 2.10833C10.7583 1.51666 9.27502 1.51666 8.37502 2.10833L3.35835 5.38333C1.75002 6.425 1.75002 8.78333 3.35835 9.83333L4.69168 10.7L8.37502 13.1C9.27502 13.6917 10.7583 13.6917 11.6583 13.1L15.3167 10.7L16.4583 9.95V12.5C16.4583 12.8417 16.7417 13.125 17.0833 13.125C17.425 13.125 17.7083 12.8417 17.7083 12.5V8.4C18.0417 7.325 17.7 6.075 16.65 5.38333Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
