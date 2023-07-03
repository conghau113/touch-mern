import config from '@/config';
import { EPagePath } from '@/enums/pageEnum';
import { tw } from '../../../utils/classUtil';
import { isImageFile } from '@/utils/fileUtil';
import { openLink } from '@/utils/linkUtil';
import { DownloadOutlined } from '@ant-design/icons';
import { Modal, Space, Typography, type ModalFuncProps, type ModalProps, type ResultProps } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton, { type PrimaryButtonProps } from '../button/PrimaryButton';
import PrimaryResult from '../result/PrimaryResult';

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

  const renderFooterButtons = () => {
    if (_.size(footerButtons)) {
      // Accept button
      const acceptButton = (buttonProps?: PrimaryButtonProps) => {
        const { onClick: buttonPropsOnClick, id, ...restButtonProps } = buttonProps ?? {};

        return (
          <PrimaryButton
            key={id}
            id={id}
            variant='mini-blue-primary'
            className='w-fit'
            type='primary'
            onClick={(event) => {
              if (buttonPropsOnClick) {
                buttonPropsOnClick(event as React.MouseEvent<HTMLButtonElement, MouseEvent>);
                onCloseModal?.();
              } else {
                onCloseModal?.();
              }
            }}
            {...restButtonProps}
          >
            Đồng ý
          </PrimaryButton>
        );
      };

      // Cancel button
      const cancelButton = (buttonProps?: PrimaryButtonProps) => {
        const { onClick: buttonPropsOnClick, id, ...restButtonProps } = buttonProps ?? {};
        return (
          <Space>
            <PrimaryButton
              key={id}
              id={id}
              type='primary'
              variant='mini-cancel'
              className='w-fit'
              onClick={(event) => {
                if (buttonPropsOnClick) {
                  buttonPropsOnClick(event as React.MouseEvent<HTMLButtonElement, MouseEvent>);
                  onCloseModal?.();
                } else {
                  onCloseModal?.();
                }
              }}
              {...restButtonProps}
            >
              Hủy
            </PrimaryButton>
          </Space>
        );
      };

      // Confirm button
      const confirmButton = (buttonProps?: PrimaryButtonProps) => {
        const { onClick: buttonPropsOnClick, id, ...restButtonProps } = buttonProps ?? {};

        return (
          <PrimaryButton
            key={id}
            id={id}
            variant='mini-blue-primary'
            // type='primary'
            className='w-fit'
            onClick={(event) => {
              if (buttonPropsOnClick) {
                buttonPropsOnClick(event as React.MouseEvent<HTMLButtonElement, MouseEvent>);
                onCloseModal?.();
              } else {
                onCloseModal?.();
              }
            }}
            {...restButtonProps}
          >
            Xác nhận
          </PrimaryButton>
        );
      };

      // Find mentor button
      const findMentorButton = (buttonProps?: PrimaryButtonProps) => {
        const { id, ...restButtonProps } = buttonProps ?? {};

        return (
          <PrimaryButton
            key={id}
            id={id}
            type='primary'
            onClick={(event) => {
              onCancel?.(event as React.MouseEvent<HTMLButtonElement, MouseEvent>);
              setTimeout(() => {
                navigate(EPagePath.Mentorship);
              }, 500);
            }}
            {...restButtonProps}
          >
            Tìm kiếm mentor
          </PrimaryButton>
        );
      };

      return (
        <div className={tw('flex w-full justify-center gap-2', footerClassName)}>
          {_.map(footerButtons, (footerButton, index) => {
            // Nếu là chuỗi thì nó là FooterButtonType
            if (_.isString(footerButton)) {
              switch (footerButton) {
                case 'accept': {
                  return acceptButton({ id: `${index}` });
                }
                case 'cancel': {
                  return cancelButton({ id: `${index}` });
                }
                case 'confirm': {
                  return confirmButton({ id: `${index}` });
                }
                case 'find-mentor': {
                  return findMentorButton({ id: `${index}` });
                }
                default: {
                  return <></>;
                }
              }
            }

            // Nếu là object thì nó là FooterButtonOptions
            if (_.isPlainObject(footerButton)) {
              const { type, buttonProps } = footerButton;
              switch (type) {
                case 'accept': {
                  return acceptButton(buttonProps);
                }
                case 'cancel': {
                  return cancelButton(buttonProps);
                }
                case 'confirm': {
                  return confirmButton(buttonProps);
                }
                case 'find-mentor': {
                  return findMentorButton(buttonProps);
                }
                default: {
                  return <></>;
                }
              }
            }
          })}
        </div>
      );
    }
    return footer;
  };

  // Variant
  switch (variant) {
    case 'default': {
      return (
        <Modal className={className} footer={footer} title={title} onCancel={onCancel} onOk={onOk} {...restProps} />
      );
    }

    case 'preview': {
      if (image) {
        const { link, documentName, fileName } = image;
        const url = `${config.system.API_URL}/${link}`;
        if (isImageFile(url)) {
          return (
            <Modal
              title={
                <div className='flex gap-3'>
                  <a target='_blank' download href={url} rel='noreferrer'>
                    <DownloadOutlined />
                  </a>
                  {documentName || fileName}
                </div>
              }
              footer={null}
              onCancel={() => {
                // onCancel
                onCloseModal?.();
              }}
              {...restProps}
            >
              <img alt='preview' className='w-full pb-2' src={url} />
            </Modal>
          );
        } else {
          openLink(url);
        }
      }
      return <></>;
    }

    case 'success': {
      return (
        <Modal
          className={tw(className)}
          closable={false}
          centered
          footer={renderFooterButtons()}
          onCancel={onCancel}
          onOk={onOk}
          {...restProps}
        >
          <PrimaryResult
            className='py-0'
            status='success'
            title={<Typography className='text-base font-medium'>{title}</Typography>}
            subTitle={<Typography className='text-dark-7'>{subtitle}</Typography>}
            {...resultProps}
          />
        </Modal>
      );
    }

    case 'warning': {
      return (
        <Modal
          className={tw(className)}
          closable={false}
          centered
          footer={renderFooterButtons()}
          onCancel={onCancel}
          onOk={onOk}
          {...restProps}
        >
          <PrimaryResult
            className='py-0'
            status='warning'
            title={<Typography className='text-base font-medium'>{title}</Typography>}
            subTitle={<Typography className='whitespace-wrap text-left text-dark-7'>{subtitle}</Typography>}
            {...resultProps}
          />
        </Modal>
      );
    }

    case 'confirm': {
      return (
        <Modal
          className={tw(className)}
          closable={false}
          centered
          footer={renderFooterButtons()}
          onCancel={onCancel}
          onOk={onOk}
          {...restProps}
        >
          <PrimaryResult
            status='warning'
            className='py-0'
            title={<Typography className='text-base font-medium'>{title}</Typography>}
            subTitle={<Typography className='text-dark-7'>{subtitle}</Typography>}
            {...resultProps}
          />
        </Modal>
      );
    }

    case 'error': {
      return (
        <Modal
          className={tw(className)}
          closable={false}
          centered
          footer={renderFooterButtons()}
          onCancel={onCancel}
          onOk={onOk}
          {...restProps}
        >
          <PrimaryResult
            className='py-0'
            status='error'
            title={<Typography className='text-base font-medium'>{title}</Typography>}
            subTitle={<Typography className='text-dark-7'>{subtitle}</Typography>}
            {...resultProps}
          />
        </Modal>
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
