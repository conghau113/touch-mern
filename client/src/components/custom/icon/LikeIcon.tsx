import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function LikeIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4 text-dark-8', className)}
      {...restProps}
      component={() => (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M3.5562 7.44435H1.88954C1.7422 7.44435 1.60089 7.50288 1.4967 7.60707C1.39252 7.71126 1.33398 7.85256 1.33398 7.99991V14.111C1.33398 14.2583 1.39252 14.3997 1.4967 14.5038C1.60089 14.608 1.7422 14.6666 1.88954 14.6666H3.5562V7.44435Z'
            fill='currentColor'
          />
          <path
            d='M13.8556 7.11102C13.6471 6.86717 13.3881 6.67138 13.0967 6.53712C12.8052 6.40285 12.4882 6.3333 12.1673 6.33324H8.55619V3.55547C8.55619 2.32992 8.11508 1.33325 6.88953 1.33325C6.76763 1.33323 6.6491 1.3733 6.55222 1.44729C6.45534 1.52128 6.38548 1.62508 6.35342 1.7427L4.66731 7.44435V14.6666H11.5706C12.1022 14.669 12.6168 14.4799 13.0202 14.1338C13.4237 13.7877 13.6889 13.3078 13.7673 12.7821L14.3651 8.89324C14.4134 8.57701 14.393 8.25406 14.305 7.94648C14.2171 7.63889 14.0638 7.35391 13.8556 7.11102Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
