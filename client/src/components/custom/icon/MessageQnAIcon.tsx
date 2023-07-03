import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function MessageQnAIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='72' height='72' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M51 7.29004H21C12 7.29004 6 13.29 6 22.29V40.29C6 49.29 12 55.29 21 55.29V61.68C21 64.08 23.67 65.52 25.65 64.17L39 55.29H51C60 55.29 66 49.29 66 40.29V22.29C66 13.29 60 7.29004 51 7.29004ZM36 43.8C34.74 43.8 33.75 42.78 33.75 41.55C33.75 40.32 34.74 39.3 36 39.3C37.26 39.3 38.25 40.32 38.25 41.55C38.25 42.78 37.26 43.8 36 43.8ZM39.78 31.35C38.61 32.13 38.25 32.64 38.25 33.48V34.11C38.25 35.34 37.23 36.36 36 36.36C34.77 36.36 33.75 35.34 33.75 34.11V33.48C33.75 30 36.3 28.29 37.26 27.63C38.37 26.88 38.73 26.37 38.73 25.59C38.73 24.09 37.5 22.86 36 22.86C34.5 22.86 33.27 24.09 33.27 25.59C33.27 26.82 32.25 27.84 31.02 27.84C29.79 27.84 28.77 26.82 28.77 25.59C28.77 21.6 32.01 18.36 36 18.36C39.99 18.36 43.23 21.6 43.23 25.59C43.23 29.01 40.71 30.72 39.78 31.35Z'
            fill='currentColor'
          />
        </svg>
      )}
    />
  );
}
