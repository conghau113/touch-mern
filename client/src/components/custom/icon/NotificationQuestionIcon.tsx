import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function NotificationQuestionIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-8 w-8', className)}
      {...restProps}
      component={() => (
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect width='32' height='32' rx='16' fill='#EEF2FD' />
          <path
            d='M16.0001 7.66667C11.4049 7.66667 7.66675 11.4049 7.66675 16C7.66675 20.5951 11.4049 24.3333 16.0001 24.3333C20.5952 24.3333 24.3334 20.5951 24.3334 16C24.3334 11.4049 20.5952 7.66667 16.0001 7.66667ZM15.6529 20.8611C15.0779 20.8611 14.6112 20.3945 14.6112 19.8195C14.6112 19.2444 15.0779 18.7778 15.6529 18.7778C16.2279 18.7778 16.6945 19.2444 16.6945 19.8195C16.6945 20.3945 16.2279 20.8611 15.6529 20.8611ZM18.6466 14.6993C18.432 15.0431 18.0244 15.4292 17.423 15.8583C16.4501 16.5778 16.4765 16.7375 16.4765 17.3889H14.7702C14.7702 16.8799 14.7591 16.4889 15.0341 16.0132C15.2098 15.7083 15.532 15.384 16.0001 15.041C16.5619 14.6396 17.1077 14.2528 17.1077 13.5792C17.1077 12.9479 16.5674 12.7229 15.9362 12.7229C15.2924 12.7229 14.5584 12.9333 13.7341 13.3542L13.032 11.9444C14.5299 11.1049 16.8938 10.725 18.1862 11.7771C19.1348 12.55 19.1404 13.909 18.6466 14.6993Z'
            fill='#1890FF'
          />
        </svg>
      )}
    />
  );
}
