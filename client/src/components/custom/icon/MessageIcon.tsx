import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function MessageIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-5 w-5', className)}
      {...restProps}
      component={() => (
        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clipPath='url(#clip0_7353_56971)'>
            <path
              d='M13.19 6H6.79C6.53 6 6.28 6.01 6.04 6.04C3.35 6.27 2 7.86 2 10.79V14.79C2 18.79 3.6 19.58 6.79 19.58H7.19C7.41 19.58 7.7 19.73 7.83 19.9L9.03 21.5C9.56 22.21 10.42 22.21 10.95 21.5L12.15 19.9C12.3 19.7 12.54 19.58 12.79 19.58H13.19C16.12 19.58 17.71 18.24 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.6 16.38 6 13.19 6ZM6.5 14C5.94 14 5.5 13.55 5.5 13C5.5 12.45 5.95 12 6.5 12C7.05 12 7.5 12.45 7.5 13C7.5 13.55 7.05 14 6.5 14ZM9.99 14C9.43 14 8.99 13.55 8.99 13C8.99 12.45 9.44 12 9.99 12C10.54 12 10.99 12.45 10.99 13C10.99 13.55 10.55 14 9.99 14ZM13.49 14C12.93 14 12.49 13.55 12.49 13C12.49 12.45 12.94 12 13.49 12C14.04 12 14.49 12.45 14.49 13C14.49 13.55 14.04 14 13.49 14Z'
              fill='currentColor'
            />
            <path
              d='M21.98 6.79V10.79C21.98 12.79 21.36 14.15 20.12 14.9C19.82 15.08 19.47 14.84 19.47 14.49L19.48 10.79C19.48 6.79 17.19 4.5 13.19 4.5L7.1 4.51C6.75 4.51 6.51 4.16 6.69 3.86C7.44 2.62 8.8 2 10.79 2H17.19C20.38 2 21.98 3.6 21.98 6.79Z'
              fill='currentColor'
            />
          </g>
          <defs>
            <clipPath id='clip0_7353_56971'>
              <rect width='24' height='24' rx='4' fill='white' />
            </clipPath>
          </defs>
        </svg>
      )}
    />
  );
}
