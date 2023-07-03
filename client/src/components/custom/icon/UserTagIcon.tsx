import { tw } from '../../../utils/classUtil';
import Icon from '@ant-design/icons';
import { type CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function UserTagIcon(props: Partial<CustomIconComponentProps>) {
  const { className, ...restProps } = props;

  return (
    <Icon
      className={tw(className)}
      {...restProps}
      component={() => (
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M24 25.1468H22.9867C21.92 25.1468 20.9067 25.5601 20.16 26.3068L17.88 28.5601C16.84 29.5868 15.1467 29.5868 14.1067 28.5601L11.8267 26.3068C11.08 25.5601 10.0533 25.1468 9 25.1468H8C5.78667 25.1468 4 23.3735 4 21.1868V6.64014C4 4.45347 5.78667 2.68018 8 2.68018H24C26.2133 2.68018 28 4.45347 28 6.64014V21.1868C28 23.3602 26.2133 25.1468 24 25.1468Z'
            fill='#F5EBEB'
          />
          <path
            d='M16 13.8798C17.7158 13.8798 19.1067 12.489 19.1067 10.7732C19.1067 9.05743 17.7158 7.6665 16 7.6665C14.2842 7.6665 12.8933 9.05743 12.8933 10.7732C12.8933 12.489 14.2842 13.8798 16 13.8798Z'
            fill='#150A5A'
          />
          <path
            d='M19.5732 20.0801C20.6532 20.0801 21.2799 18.8801 20.6799 17.9867C19.7732 16.6401 18.0132 15.7334 15.9999 15.7334C13.9866 15.7334 12.2266 16.6401 11.3199 17.9867C10.7199 18.8801 11.3466 20.0801 12.4266 20.0801H19.5732Z'
            fill='#150A5A'
          />
        </svg>
      )}
    />
  );
}
