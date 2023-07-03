import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function CircleFileUploadImageIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clipPath='url(#clip0_444_130050)'>
            <rect width='56' height='56' rx='28' fill='#EDEDFD' />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M20.4173 15.9688C18.7662 15.9688 17.4277 17.3072 17.4277 18.9583V35.7875C17.4277 37.4386 18.7662 38.7771 20.4173 38.7771H35.584C37.2351 38.7771 38.5736 37.4386 38.5736 35.7875V22.1667C38.5736 21.5626 39.0633 21.0729 39.6673 21.0729C40.2714 21.0729 40.7611 21.5626 40.7611 22.1667V35.7875C40.7611 38.6467 38.4432 40.9646 35.584 40.9646H20.4173C17.5581 40.9646 15.2402 38.6467 15.2402 35.7875V18.9583C15.2402 16.0991 17.5581 13.7812 20.4173 13.7812H32.3757C32.9797 13.7812 33.4694 14.2709 33.4694 14.875C33.4694 15.4791 32.9797 15.9688 32.3757 15.9688H20.4173Z'
              fill='#464FEB'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M31.2812 15.3542C31.2812 13.9539 32.9742 13.2527 33.9644 14.2428L40.2991 20.5775C41.2892 21.5677 40.588 23.2607 39.1877 23.2607H32.853C31.9849 23.2607 31.2812 22.557 31.2812 21.6889V15.3542ZM33.4687 16.8407V21.0732H37.7012L33.4687 16.8407Z'
              fill='#464FEB'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M23.9902 30.9121C23.9902 30.308 24.4799 29.8184 25.084 29.8184L30.9173 29.8184C31.5214 29.8184 32.0111 30.308 32.0111 30.9121C32.0111 31.5162 31.5214 32.0059 30.9173 32.0059L25.084 32.0059C24.4799 32.0059 23.9902 31.5162 23.9902 30.9121Z'
              fill='#464FEB'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M28.0592 26.9064C28.6632 26.9153 29.1456 27.4121 29.1367 28.0161L29.0507 33.8489C29.0418 34.4529 28.5449 34.9353 27.9409 34.9264C27.3369 34.9174 26.8545 34.4206 26.8634 33.8166L26.9494 27.9839C26.9583 27.3799 27.4552 26.8975 28.0592 26.9064Z'
              fill='#464FEB'
            />
          </g>
          <defs>
            <clipPath id='clip0_444_130050'>
              <rect width='56' height='56' rx='8' fill='white' />
            </clipPath>
          </defs>
        </svg>
      )}
    />
  );
}
