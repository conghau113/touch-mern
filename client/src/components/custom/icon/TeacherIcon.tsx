import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function TeacherIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M8.41555 7.81996C8.75055 7.59996 9.19055 7.83995 9.19055 8.23995V8.88496C9.19055 9.51996 8.69555 10.2 8.10055 10.4L6.50555 10.93C6.22555 11.025 5.77055 11.025 5.49555 10.93L3.90055 10.4C3.30055 10.2 2.81055 9.51996 2.81055 8.88496V8.23495C2.81055 7.83995 3.25055 7.59996 3.58055 7.81496L4.61055 8.48495C5.00555 8.74995 5.50555 8.87996 6.00555 8.87996C6.50555 8.87996 7.00555 8.74995 7.40055 8.48495L8.41555 7.81996Z'
            fill='currentColor'
          />
          <path
            d='M9.98977 3.23003L6.99477 1.26503C6.45477 0.910029 5.56477 0.910029 5.02477 1.26503L2.01477 3.23003C1.04977 3.85503 1.04977 5.27003 2.01477 5.90003L2.81477 6.42003L5.02477 7.86003C5.56477 8.21503 6.45477 8.21503 6.99477 7.86003L9.18976 6.42003L9.87477 5.97003V7.50003C9.87477 7.70503 10.0448 7.87503 10.2498 7.87503C10.4548 7.87503 10.6248 7.70503 10.6248 7.50003V5.04003C10.8248 4.39503 10.6198 3.64503 9.98977 3.23003Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
