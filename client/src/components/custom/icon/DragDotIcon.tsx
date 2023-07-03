import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function DragDotIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M8.33268 3.75008C8.33268 4.89591 7.39518 5.83342 6.24935 5.83342C5.10352 5.83342 4.16602 4.89591 4.16602 3.75008C4.16602 2.60425 5.10352 1.66675 6.24935 1.66675C7.39518 1.66675 8.33268 2.60425 8.33268 3.75008Z'
            fill='currentColor'
            fillOpacity='0.2'
            contentStyleType='mix-blend-mode:multiply'
          />
          <path
            d='M4.16602 10.0001C4.16602 8.85425 5.10352 7.91675 6.24935 7.91675C7.39518 7.91675 8.33268 8.85425 8.33268 10.0001C8.33268 11.1459 7.39518 12.0834 6.24935 12.0834C5.10352 12.0834 4.16602 11.1459 4.16602 10.0001Z'
            fill='currentColor'
            fillOpacity='0.2'
            contentStyleType='mix-blend-mode:multiply'
          />
          <path
            d='M4.16602 16.2501C4.16602 15.1042 5.10352 14.1667 6.24935 14.1667C7.39518 14.1667 8.33268 15.1042 8.33268 16.2501C8.33268 17.3959 7.39518 18.3334 6.24935 18.3334C5.10352 18.3334 4.16602 17.3959 4.16602 16.2501Z'
            fill='currentColor'
            fillOpacity='0.2'
            contentStyleType='mix-blend-mode:multiply'
          />
          <path
            d='M15.8327 3.75008C15.8327 4.89591 14.8952 5.83342 13.7493 5.83342C12.6035 5.83342 11.666 4.89591 11.666 3.75008C11.666 2.60425 12.6035 1.66675 13.7493 1.66675C14.8952 1.66675 15.8327 2.60425 15.8327 3.75008Z'
            fill='currentColor'
            fillOpacity='0.2'
            contentStyleType='mix-blend-mode:multiply'
          />
          <path
            d='M11.666 10.0001C11.666 8.85425 12.6035 7.91675 13.7493 7.91675C14.8952 7.91675 15.8327 8.85425 15.8327 10.0001C15.8327 11.1459 14.8952 12.0834 13.7493 12.0834C12.6035 12.0834 11.666 11.1459 11.666 10.0001Z'
            fill='currentColor'
            fillOpacity='0.2'
            contentStyleType='mix-blend-mode:multiply'
          />
          <path
            d='M11.666 16.2501C11.666 15.1042 12.6035 14.1667 13.7493 14.1667C14.8952 14.1667 15.8327 15.1042 15.8327 16.2501C15.8327 17.3959 14.8952 18.3334 13.7493 18.3334C12.6035 18.3334 11.666 17.3959 11.666 16.2501Z'
            fill='currentColor'
            fillOpacity='0.2'
            contentStyleType='mix-blend-mode:multiply'
          />
        </svg>
      )}
    />
  );
}
