import { tw } from '../../../utils/classUtil';
import PrimaryMenu, { type PrimaryMenuProps } from './PrimaryMenu';

interface PrimaryHeaderMenuProps extends Omit<PrimaryMenuProps, 'variant'> {}

export default function PrimaryHeaderMenu(props: PrimaryHeaderMenuProps) {
  const { className, ...restProps } = props;

  return <PrimaryMenu variant='no-style' mode='horizontal' className={tw('', className)} {...restProps} />;
}
