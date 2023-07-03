import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function PictureInPictureIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M28.2216 2.66675H3.77713C3.16379 2.66675 2.66602 3.16453 2.66602 3.77786V28.2223C2.66602 28.8356 3.16379 29.3334 3.77713 29.3334H28.2216C28.8349 29.3334 29.3327 28.8356 29.3327 28.2223V3.77786C29.3327 3.16453 28.8349 2.66675 28.2216 2.66675ZM27.1105 27.1112H15.9993V17.1112C15.9993 16.4979 15.5016 16.0001 14.8882 16.0001H4.88824V4.88897H27.1105V27.1112Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
