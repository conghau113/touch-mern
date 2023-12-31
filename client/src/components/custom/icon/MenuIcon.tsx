import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function MenuIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9.99984 1.66675C8.86543 1.66675 7.94255 2.58966 7.94255 3.72404C7.94255 4.85841 8.86546 5.78133 9.99984 5.78133C11.1342 5.78133 12.0571 4.85845 12.0571 3.72404C12.0571 2.58963 11.1342 1.66675 9.99984 1.66675Z'
            fill='currentColor'
          />
          <path
            d='M9.99984 7.94279C8.86543 7.94279 7.94255 8.86571 7.94255 10.0001C7.94255 11.1345 8.86546 12.0574 9.99984 12.0574C11.1342 12.0574 12.0571 11.1345 12.0571 10.0001C12.0571 8.86571 11.1342 7.94279 9.99984 7.94279Z'
            fill='currentColor'
          />
          <path
            d='M9.99984 14.2188C8.86543 14.2188 7.94255 15.1417 7.94255 16.2761C7.94255 17.4105 8.86543 18.3334 9.99984 18.3334C11.1342 18.3334 12.0571 17.4105 12.0571 16.2761C12.0571 15.1417 11.1342 14.2188 9.99984 14.2188Z'
            fill='currentColor'
          />
          <path
            d='M3.7238 1.66675C2.58942 1.66675 1.6665 2.58966 1.6665 3.72404C1.6665 4.85841 2.58942 5.78133 3.7238 5.78133C4.85817 5.78133 5.78109 4.85845 5.78109 3.72404C5.78109 2.58963 4.8582 1.66675 3.7238 1.66675Z'
            fill='currentColor'
          />
          <path
            d='M3.7238 7.94279C2.58942 7.94279 1.6665 8.86567 1.6665 10.0001C1.6665 11.1345 2.58942 12.0574 3.7238 12.0574C4.85817 12.0574 5.78109 11.1345 5.78109 10.0001C5.78109 8.86571 4.8582 7.94279 3.7238 7.94279Z'
            fill='currentColor'
          />
          <path
            d='M3.7238 14.2188C2.58942 14.2188 1.6665 15.1417 1.6665 16.2761C1.6665 17.4105 2.58942 18.3334 3.7238 18.3334C4.85817 18.3334 5.78109 17.4105 5.78109 16.2761C5.78109 15.1417 4.8582 14.2188 3.7238 14.2188Z'
            fill='currentColor'
          />
          <path
            d='M16.2759 1.66675C15.1415 1.66675 14.2186 2.58966 14.2186 3.72404C14.2186 4.85841 15.1415 5.78133 16.2759 5.78133C17.4103 5.78133 18.3332 4.85845 18.3332 3.72404C18.3332 2.58963 17.4103 1.66675 16.2759 1.66675Z'
            fill='currentColor'
          />
          <path
            d='M16.2759 7.94279C15.1415 7.94279 14.2186 8.86571 14.2186 10.0001C14.2186 11.1345 15.1415 12.0574 16.2759 12.0574C17.4103 12.0574 18.3332 11.1345 18.3332 10.0001C18.3332 8.86567 17.4103 7.94279 16.2759 7.94279Z'
            fill='currentColor'
          />
          <path
            d='M16.2759 14.2188C15.1415 14.2188 14.2186 15.1417 14.2186 16.2761C14.2186 17.4105 15.1415 18.3334 16.2759 18.3334C17.4103 18.3334 18.3332 17.4105 18.3332 16.2761C18.3332 15.1417 17.4103 14.2188 16.2759 14.2188Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
