import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function SentIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M17.8629 2.15149C17.4461 1.72367 16.8291 1.56428 16.2539 1.73206L2.84008 5.63277C2.23316 5.80139 1.80299 6.28541 1.68711 6.9003C1.56872 7.52609 1.98223 8.32049 2.52245 8.65268L6.71667 11.2305C7.14684 11.4948 7.70207 11.4285 8.05805 11.0695L12.8608 6.23676C13.1026 5.9851 13.5028 5.9851 13.7445 6.23676C13.9863 6.48003 13.9863 6.87429 13.7445 7.12595L8.93341 11.9595C8.57659 12.3177 8.5099 12.8755 8.77251 13.3084L11.3352 17.5446C11.6353 18.048 12.1522 18.3332 12.7191 18.3332C12.7858 18.3332 12.8608 18.3332 12.9275 18.3248C13.5778 18.2409 14.0947 17.7963 14.2864 17.1672L18.2631 3.7705C18.4381 3.20007 18.2797 2.57931 17.8629 2.15149Z'
            fill='#464FEB'
          />
        </svg>
      )}
    />
  );
}
