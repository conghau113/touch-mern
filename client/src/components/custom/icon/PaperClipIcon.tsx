import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function PaperClipIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='26' height='25' viewBox='0 0 26 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M13.3437 12.6564L10.7708 15.2293C9.34375 16.6564 9.34375 18.9585 10.7708 20.3856C12.1979 21.8127 14.5 21.8127 15.9271 20.3856L19.9792 16.3335C22.8229 13.4897 22.8229 8.86475 19.9792 6.021C17.1354 3.17725 12.5104 3.17725 9.66667 6.021L5.25 10.4377C2.8125 12.8752 2.8125 16.8335 5.25 19.2814'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    />
  );
}
