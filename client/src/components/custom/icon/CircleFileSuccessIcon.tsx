import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function CircleFileSuccessIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect width='56' height='56' rx='28' fill='#E8F7EF' />
          <path
            d='M28 13.4167C25.1157 13.4167 22.2961 14.272 19.8979 15.8744C17.4997 17.4769 15.6305 19.7545 14.5267 22.4192C13.4229 25.084 13.1341 28.0162 13.6968 30.8451C14.2595 33.674 15.6485 36.2725 17.688 38.312C19.7275 40.3515 22.326 41.7404 25.1549 42.3031C27.9838 42.8658 30.916 42.577 33.5808 41.4733C36.2455 40.3695 38.5231 38.5003 40.1256 36.1021C41.728 33.7039 42.5833 30.8843 42.5833 28C42.5721 24.1357 41.032 20.4329 38.2995 17.7004C35.5671 14.968 31.8643 13.4279 28 13.4167V13.4167ZM25.5694 34.5795L18.9899 28L20.7083 26.2816L25.5694 31.1427L35.2916 21.4205L37.01 23.1389L25.5694 34.5795Z'
            fill='#39AC6D'
          />
        </svg>
      )}
    />
  );
}
