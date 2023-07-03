import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { tw } from '../../../utils/classUtil';

export default function BackArrowIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M6.61029 4.36811C6.84697 4.13142 6.84697 3.74769 6.61029 3.51101C6.3736 3.27433 5.98987 3.27433 5.75319 3.51101L1.51123 7.75297L1.50682 7.75741C1.39947 7.86675 1.33325 8.01663 1.33325 8.18198C1.33325 8.26416 1.34961 8.34251 1.37924 8.41397C1.40881 8.48545 1.45266 8.55242 1.51076 8.61053L5.75319 12.853C5.98987 13.0896 6.3736 13.0896 6.61029 12.853C6.84697 12.6163 6.84697 12.2325 6.61029 11.9959L3.40247 8.78804H14.0605C14.3952 8.78804 14.6666 8.5167 14.6666 8.18198C14.6666 7.84726 14.3952 7.57592 14.0605 7.57592H3.40247L6.61029 4.36811Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
