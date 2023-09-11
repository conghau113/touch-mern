import { Spin } from 'antd';
import { useEffect, useLayoutEffect } from 'react';
import useBackdropStore from '../../../state/useBackdropStore';
import './Backdrop.scss';

export default function Backdrop() {
  const { isOpenBackdrop, setOpenBackdrop } = useBackdropStore();

  useLayoutEffect(() => {
    if (isOpenBackdrop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpenBackdrop]);

  useEffect(() => {
    setOpenBackdrop(false);
  }, []);

  return isOpenBackdrop ? (
    <div className='preloader'>
      <Spin
        className='text-main-purple
        [&_.ant-spin-dot-item]:bg-main-light
        [&_.ant-spin-dot-item]:shadow-xl
        '
        tip='Loading ...'
      />
    </div>
  ) : (
    <></>
  );
}
