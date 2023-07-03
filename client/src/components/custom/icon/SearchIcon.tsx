import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function SearchIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.5287 9.87015C8.61281 10.6028 7.45107 11.0409 6.187 11.0409C3.23021 11.0409 0.833252 8.64391 0.833252 5.68712C0.833252 2.73033 3.23021 0.333374 6.187 0.333374C9.14379 0.333374 11.5407 2.73033 11.5407 5.68712C11.5407 6.95122 11.1026 8.113 10.37 9.0289L14.1665 12.8255L13.3253 13.6667L9.5287 9.87015ZM2.02297 5.68712C2.02297 3.38739 3.88727 1.5231 6.187 1.5231C8.48672 1.5231 10.351 3.38739 10.351 5.68712C10.351 6.80865 9.90763 7.82663 9.18657 8.57532L9.07519 8.6867C8.32651 9.40775 7.30853 9.85114 6.187 9.85114C3.88727 9.85114 2.02297 7.98685 2.02297 5.68712Z'
            fill='currentColor'
            fillOpacity='0.6'
            // style='mix-blend-mode:multiply'
          />
        </svg>
      )}
    />
  );
}
