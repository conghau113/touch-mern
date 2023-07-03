import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function RedoIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M4.75325 3.79336L10.0866 3.79336C11.9266 3.79336 13.4199 5.28669 13.4199 7.12669C13.4199 8.96669 11.9266 10.46 10.0866 10.46L2.75325 10.46'
            stroke='#595959'
          />
          <path d='M4.28662 8.79333L2.57996 10.5L4.28662 12.2067' stroke='#595959' />
        </svg>
      )}
    />
  );
}
