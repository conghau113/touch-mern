import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function MentorshipIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            id='home-icon'
            d='M16.3581 5.67501L10.8998 1.30834C9.83314 0.458338 8.16647 0.450005 7.10814 1.30001L1.64981 5.67501C0.866473 6.30001 0.391473 7.55 0.55814 8.53334L1.60814 14.8167C1.84981 16.225 3.15814 17.3333 4.58314 17.3333H13.4165C14.8248 17.3333 16.1581 16.2 16.3998 14.8083L17.4498 8.52501C17.5998 7.55001 17.1248 6.30001 16.3581 5.67501ZM9.62481 14C9.62481 14.3417 9.34147 14.625 8.99981 14.625C8.65814 14.625 8.37481 14.3417 8.37481 14V11.5C8.37481 11.1583 8.65814 10.875 8.99981 10.875C9.34147 10.875 9.62481 11.1583 9.62481 11.5V14Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
