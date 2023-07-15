import { tw } from '../../../utils/classUtil';
import { ZoomInOutlined } from '@ant-design/icons';
import { Image, type ImageProps } from 'antd';
import _ from 'lodash';

type Variant = 'default' | 'avatar' | 'image';
interface PrimaryImageProps extends ImageProps {
  variant?: Variant;
  downloadUrl?: string;
  userName?: string;
}

export default function PrimaryImage(props: PrimaryImageProps) {
  const { variant, preview, userName, rootClassName, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return <Image preview={preview} {...restProps} />;
    }
    case 'image': {
      return <Image preview={preview} src={`https://robohash.org/${userName}`} {...restProps} />;
    }
    default: {
      return <Image preview={preview} {...restProps} />;
    }
  }
}
