import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function FireIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clipPath='url(#clip0_682_59663)'>
            <path
              d='M26.0656 14.6631C25.459 13.2976 24.577 12.0721 23.475 11.0631L22.5656 10.2287C22.5347 10.2012 22.4976 10.1816 22.4574 10.1718C22.4172 10.1619 22.3752 10.1621 22.3351 10.1723C22.295 10.1825 22.258 10.2024 22.2273 10.2302C22.1967 10.258 22.1734 10.2929 22.1594 10.3318L21.7531 11.4975C21.5 12.2287 21.0344 12.9756 20.375 13.71C20.3313 13.7568 20.2813 13.7693 20.2469 13.7725C20.2125 13.7756 20.1594 13.7693 20.1125 13.7256C20.0687 13.6881 20.0469 13.6318 20.05 13.5756C20.1656 11.6943 19.6031 9.57247 18.3719 7.2631C17.3531 5.34435 15.9375 3.84747 14.1687 2.80372L12.8781 2.04435C12.7094 1.94435 12.4938 2.0756 12.5031 2.27247L12.5719 3.77247C12.6187 4.79747 12.5 5.70372 12.2188 6.45685C11.875 7.37872 11.3812 8.23497 10.75 9.00372C10.3107 9.53798 9.81278 10.0212 9.26562 10.4443C7.94783 11.4574 6.87629 12.7554 6.13125 14.2412C5.38804 15.74 5.00091 17.3902 5 19.0631C5 20.5381 5.29062 21.9662 5.86562 23.3131C6.42083 24.6099 7.22206 25.7868 8.225 26.7787C9.2375 27.7787 10.4125 28.5662 11.7219 29.1131C13.0781 29.6818 14.5156 29.9693 16 29.9693C17.4844 29.9693 18.9219 29.6818 20.2781 29.1162C21.5843 28.5726 22.772 27.7797 23.775 26.7818C24.7875 25.7818 25.5812 24.6131 26.1344 23.3162C26.7085 21.973 27.003 20.527 27 19.0662C27 17.5412 26.6875 16.06 26.0656 14.6631Z'
              fill='currentColor'
            />
          </g>
          <defs>
            <clipPath id='clip0_682_59663'>
              <rect width='32' height='32' rx='4' fill='white' />
            </clipPath>
          </defs>
        </svg>
      )}
    />
  );
}