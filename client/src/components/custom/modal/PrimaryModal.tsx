import { Modal, type ModalFuncProps, type ModalProps, type ResultProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tw } from '../../../utils/classUtil';
import { type PrimaryButtonProps } from '../button/PrimaryButton';

type Variant = 'default' | 'preview' | 'success' | 'warning' | 'error' | 'confirm' | 'info';
type ModalType = NonNullable<ModalFuncProps['type']>;
type FooterButtonType = 'accept' | 'cancel' | 'confirm' | 'find-mentor';
type FooterButtonOptions = {
  type: FooterButtonType;
  buttonProps: PrimaryButtonProps;
};

interface CommonModalProps {
  variant?: Variant;
  subtitle?: string | React.ReactNode;
  image?: Record<string, any>;
  resultProps?: ResultProps;
  noBodySpacing?: boolean;
  footerButtons?: Array<FooterButtonType | FooterButtonOptions>;
  footerClassName?: string;
  onCloseModal?: () => void;
}
export interface PrimaryModalProps extends ModalProps, CommonModalProps {}
interface PrimaryModalFuncPropsParams extends ModalFuncProps, CommonModalProps {}

export const primaryModalFuncProps = (
  params?: PrimaryModalFuncPropsParams
): Partial<Record<ModalType, ModalFuncProps>> => {
  const { variant, resultProps, ...restParams } = params ?? {};

  return {
    info: {
      okButtonProps: {
        className: 'bg-blue-11 text-white hover:opacity-80',
      },
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      centered: true,
      ...restParams,
    },
    confirm: {
      okButtonProps: {
        className: 'bg-orange-1 text-white hover:bg-orange-2',
      },
      centered: true,
      ...restParams,
    },
    warning: {
      okButtonProps: {
        className: 'bg-orange-1 text-white hover:bg-orange-2',
      },
      centered: true,
      className: '[&>.ant-modal-content]:flex',
      ...restParams,
    },
    error: {
      centered: true,
      ...restParams,
    },
    success: {
      centered: true,
      ...restParams,
    },
    warn: {
      centered: true,
      ...restParams,
    },
  };
};

export default function PrimaryModal(props: PrimaryModalProps) {
  const {
    className,
    image,
    noBodySpacing,
    variant,
    footer,
    footerButtons,
    footerClassName,
    onCancel,
    onOk,
    onCloseModal,
    title,
    subtitle,
    resultProps,
    ...restProps
  } = props;
  const navigate = useNavigate();

  // Variant
  switch (variant) {
    case 'default': {
      return (
        <Modal className={className} footer={footer} title={title} onCancel={onCancel} onOk={onOk} {...restProps} />
      );
    }
    default:
      break;
  }

  return (
    <Modal
      className={tw(
        `
        [&_.ant-modal-body]:px-6 
        [&_.ant-modal-content]:p-0 
        [&_.ant-modal-footer]:m-0 [&_.ant-modal-footer]:px-6 [&_.ant-modal-footer]:py-4
        [&_.ant-modal-header]:px-6 [&_.ant-modal-header]:pb-2 [&_.ant-modal-header]:pt-4
        `,
        noBodySpacing && '[&_.ant-modal-body]:px-0',
        className
      )}
      footer={footer}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
      {...restProps}
    />
  );
}
