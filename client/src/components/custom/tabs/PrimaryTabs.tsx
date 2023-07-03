import { tw } from '../../../utils/classUtil';
import { Tabs, type TabsProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import PrimaryButton from '../button/PrimaryButton';
import LeftArrowIcon from '../icon/LeftArrowIcon';
import RightArrow from '../icon/RightArrow';

type Variant = 'default' | 'scroll';

export interface PrimaryTabsProps extends TabsProps {
  variant?: Variant;
}

export default function PrimaryTabs(props: PrimaryTabsProps) {
  const id = uuidv4();
  const { className, variant, ...restProps } = props;

  const handleScroll = (type?: 'left' | 'right') => {
    const container = document.querySelector(`.tabs-${id} .ant-tabs-nav-wrap`) as HTMLElement;
    const tabList = document.querySelector(`.tabs-${id} .ant-tabs-nav-list`) as HTMLElement;

    const minTranslateX = 0;
    const maxTranslateX = container?.clientWidth - tabList?.scrollWidth;
    const currentTranslateX = new DOMMatrixReadOnly(getComputedStyle(tabList).transform).m41;

    switch (type) {
      case 'left': {
        const newTranslateX = currentTranslateX + 250 > minTranslateX ? minTranslateX : currentTranslateX + 250;
        tabList.style.transform = `translate(${newTranslateX}px, 0px)`;
        tabList.style.transition = 'none 0s ease 0s';
        container.classList.add('ant-tabs-nav-wrap-ping-right');
        if (newTranslateX > 0) {
          container.classList.add('ant-tabs-nav-wrap-ping-left');
        } else {
          container.classList.remove('ant-tabs-nav-wrap-ping-left');
        }
        break;
      }
      case 'right': {
        const newTranslateX = currentTranslateX - 250 < maxTranslateX ? maxTranslateX : currentTranslateX - 250;
        tabList.style.transform = `translate(${newTranslateX}px, 0px)`;
        tabList.style.transition = 'none 0s ease 0s';
        container.classList.add('ant-tabs-nav-wrap-ping-left');
        if (newTranslateX < maxTranslateX) {
          container.classList.add('ant-tabs-nav-wrap-ping-right');
        } else {
          container.classList.remove('ant-tabs-nav-wrap-ping-right');
        }
        break;
      }
    }
  };

  switch (variant) {
    case 'default': {
      return <Tabs className={tw('', className)} {...restProps} />;
    }
    case 'scroll': {
      return (
        <Tabs
          className={tw(
            `
            h-full w-full
              [&_.ant-tabs-ink-bar]:bg-blue-11
              [&_.ant-tabs-nav-list]:px-0.5 [&_.ant-tabs-nav-operations]:hidden 
              [&_.ant-tabs-nav]:mb-0
              [&_.ant-tabs-nav]:before:border-none [&_.ant-tabs-tab.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-blue-11
              [&_.ant-tabs-tab]:m-0.5 [&_.ant-tabs-tab]:px-2
            `,
            `tabs-${id}`,
            className
          )}
          tabBarExtraContent={{
            left: (
              <div className='px-2'>
                <PrimaryButton
                  variant='no-style'
                  type='link'
                  onClick={() => handleScroll('left')}
                  icon={<LeftArrowIcon className='text-black-4' />}
                  className='flex h-full w-fit items-center justify-center bg-transparent px-0 [&_.anticon]:flex [&_.anticon]:justify-center'
                />
              </div>
            ),
            right: (
              <div className='px-2'>
                <PrimaryButton
                  variant='no-style'
                  type='link'
                  onClick={() => handleScroll('right')}
                  icon={<RightArrow className='text-black-4' />}
                  className='flex h-full w-fit items-center justify-center bg-transparent px-0 [&_.anticon]:flex [&_.anticon]:justify-center'
                />
              </div>
            ),
          }}
          {...restProps}
        />
      );
    }
    default: {
      return (
        <Tabs
          className={tw(
            ` 
            h-full
            w-full
              [&_.ant-tabs-ink-bar]:bg-blue-11 [&_.ant-tabs-nav-list]:flex 
              [&_.ant-tabs-nav-list]:w-full [&_.ant-tabs-nav-list]:justify-between [&_.ant-tabs-nav-list]:px-0.5 [&_.ant-tabs-nav]:m-0 
              [&_.ant-tabs-tab.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-blue-11 
              [&_.ant-tabs-tab]:m-0.5 [&_.ant-tabs-tab]:w-full [&_.ant-tabs-tab]:justify-center [&_.ant-tabs-tab]:px-2 [&_.ant-tabs-tab]:text-dark-8
            `,
            className
          )}
          {...restProps}
        />
      );
    }
  }
}
