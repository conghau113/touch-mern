// import useBackdropStore from '@/hooks/useBackdropStore'
import { Spin } from 'antd';
import { useEffect, useLayoutEffect } from 'react';
import './Backdrop.scss';

export default function Backdrop() {
  // const { isOpenBackdrop, setOpenBackdrop } = useBackdropStore()

  // useLayoutEffect(() => {
  //   if (isOpenBackdrop) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = ''
  //   }
  // }, [isOpenBackdrop])

  // useEffect(() => {
  //   setOpenBackdrop(false)
  // }, [])

  return (
    <div className='preloader'>
      <Spin
        className='text-orange-9  
        [&_.ant-spin-dot-item]:bg-orange-9
        [&_.ant-spin-dot-item]:shadow-xl
        '
        tip='Loading ...'
      />
    </div>
  );
}
