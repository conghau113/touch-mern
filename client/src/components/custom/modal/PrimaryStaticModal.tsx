import useModalStore from '@/hooks/useModalStore';
import { tw } from '../../../utils/classUtil';
import PrimaryModal, { type PrimaryModalProps } from './PrimaryModal';

export interface PrimaryStaticModalProps extends PrimaryModalProps {}

export default function PrimaryStaticModal(props: PrimaryStaticModalProps) {
  const { onCancel, onOk, className, ...restProps } = props;
  const { isOpen, modalProps, closeStaticModal } = useModalStore();
  const {
    className: modalPropsClassName,
    onCancel: modalPropsOnCancel,
    onOk: modalPropsOnOk,
    ...restModalProps
  } = modalProps ?? {};

  return (
    <PrimaryModal
      open={isOpen}
      destroyOnClose
      onCancel={(event) => {
        onCancel?.(event);
        modalPropsOnCancel?.(event);
        closeStaticModal();
      }}
      onOk={(event) => {
        onOk?.(event);
        modalPropsOnOk?.(event);
        closeStaticModal();
      }}
      onCloseModal={() => {
        closeStaticModal();
      }}
      className={tw('', className, modalPropsClassName)}
      {...{ ...restProps, ...restModalProps }}
    />
  );
}
