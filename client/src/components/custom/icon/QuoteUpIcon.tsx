import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function QuoteUpIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='48' height='48' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M8.09 11.63H3.4C3.48 6.95997 4.4 6.18997 7.27 4.48997C7.6 4.28997 7.71 3.86997 7.51 3.52997C7.32 3.19997 6.89 3.08997 6.56 3.28997C3.18 5.28997 2 6.50997 2 12.32V17.71C2 19.42 3.39 20.8 5.09 20.8H8.09C9.85 20.8 11.18 19.47 11.18 17.71V14.71C11.18 12.96 9.85 11.63 8.09 11.63Z'
            fill='currentColor'
          />
          <path
            d='M18.9101 11.63H14.2201C14.3001 6.95997 15.2201 6.18997 18.0901 4.48997C18.4201 4.28997 18.5301 3.86997 18.3301 3.52997C18.1301 3.19997 17.7101 3.08997 17.3701 3.28997C13.9901 5.28997 12.8101 6.50997 12.8101 12.33V17.72C12.8101 19.43 14.2001 20.81 15.9001 20.81H18.9001C20.6601 20.81 21.9901 19.48 21.9901 17.72V14.72C22.0001 12.96 20.6701 11.63 18.9101 11.63Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
