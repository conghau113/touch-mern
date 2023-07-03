import { tw } from '../../../utils/classUtil';
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { type TimeoutProps } from 'react-transition-group/Transition';

type Variant = 'fade' | 'collapse';

interface PrimaryTransitionProps extends TimeoutProps<any> {
  variant: Variant;
  className?: string;
  children: React.ReactNode;
}

export default function PrimaryTransition(props: PrimaryTransitionProps) {
  const { children, className, variant, ...restProps } = props;
  const nodeRef = useRef(null);
  let transitionStyles: Record<string, any> = {};

  switch (variant) {
    case 'fade': {
      transitionStyles = {
        entering: { opacity: 1, height: 'auto' },
        entered: { opacity: 1, height: 'auto' },
        exiting: { opacity: 0.5, height: '50%' },
        exited: { opacity: 0, height: 0 },
      };
      break;
    }
    case 'collapse': {
      transitionStyles = {
        entering: { height: 'auto', visibility: 'visible' },
        entered: { height: 'auto', visibility: 'visible' },
        exiting: { height: 0, visibility: 'collapse' },
        exited: { height: 0, visibility: 'collapse' },
      };
      break;
    }
    default:
      break;
  }

  return (
    <Transition nodeRef={nodeRef} {...restProps}>
      {(state) => (
        <div
          ref={nodeRef}
          className={tw('overflow-hidden transition-all duration-100 ease-linear', className)}
          style={{
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}
