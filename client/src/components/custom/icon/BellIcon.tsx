import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function BellIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw('h-4 w-4', className)}
      {...restProps}
      component={() => (
        <svg width='1rem' height='1rem' viewBox='0 0 20 20' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.14305 3.29405C7.16598 2.25205 8.55336 1.66666 10 1.66666C11.4466 1.66666 12.834 2.25205 13.8569 3.29405C14.8799 4.33604 15.4545 5.7493 15.4545 7.22291V9.3065C15.4545 10.1991 15.8344 10.7499 16.3067 11.2952C16.3613 11.3583 16.4214 11.4256 16.4841 11.4959C16.6741 11.709 16.8889 11.9499 17.0534 12.1845C17.29 12.5219 17.5 12.9446 17.5 13.4737C17.5 14.0628 17.1632 14.521 16.7581 14.8442C16.3528 15.1675 15.8033 15.4223 15.1703 15.6218C13.8971 16.023 12.1183 16.2518 10 16.2518C7.88165 16.2518 6.10289 16.023 4.82975 15.6218C4.19665 15.4223 3.6472 15.1675 3.24193 14.8442C2.83679 14.521 2.5 14.0628 2.5 13.4737C2.5 12.9446 2.70996 12.5219 2.9466 12.1845C3.11111 11.9499 3.32593 11.709 3.51589 11.4959C3.57864 11.4256 3.63868 11.3583 3.69329 11.2952C4.16562 10.7499 4.54545 10.1991 4.54545 9.3065V7.22291C4.54545 5.7493 5.12013 4.33604 6.14305 3.29405ZM10 3.05572C8.91502 3.05572 7.87448 3.49476 7.10729 4.27626C6.3401 5.05776 5.90909 6.1177 5.90909 7.22291V9.3065C5.90909 10.7058 5.2662 11.5788 4.7158 12.2142C4.62724 12.3165 4.5468 12.4067 4.4731 12.4894C4.3043 12.6787 4.17087 12.8284 4.05624 12.9919C3.90935 13.2013 3.86364 13.343 3.86364 13.4737C3.86357 13.4769 3.86156 13.5742 4.08264 13.7505C4.30592 13.9286 4.68119 14.1209 5.23275 14.2947C6.32893 14.6402 7.95926 14.8628 10 14.8628C12.0407 14.8628 13.6711 14.6402 14.7673 14.2947C15.3188 14.1209 15.6941 13.9286 15.9174 13.7505C16.1384 13.5742 16.1364 13.4769 16.1364 13.4738C16.1364 13.3431 16.0906 13.2013 15.9438 12.9919C15.8291 12.8284 15.6957 12.6787 15.5269 12.4894C15.4532 12.4067 15.3728 12.3165 15.2842 12.2142C14.7338 11.5788 14.0909 10.7058 14.0909 9.3065V7.22291C14.0909 6.1177 13.6599 5.05776 12.8927 4.27626C12.1255 3.49476 11.085 3.05572 10 3.05572Z'
          />
          <path d='M10 16.9464C9.31068 16.9464 8.66295 16.9227 8.05341 16.8769C8.18336 17.2992 8.44225 17.6681 8.79237 17.9301C9.1425 18.1921 9.56558 18.3333 10 18.3333C10.4344 18.3333 10.8575 18.1921 11.2076 17.9301C11.5578 17.6681 11.8166 17.2992 11.9466 16.8769C11.337 16.9227 10.6893 16.9464 10 16.9464Z' />
        </svg>
      )}
    />
  );
}