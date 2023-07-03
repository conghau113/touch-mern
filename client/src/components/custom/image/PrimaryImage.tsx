import { STYLED_BORDER } from '@/constants/image';
import { tw } from '../../../utils/classUtil';
import { ZoomInOutlined } from '@ant-design/icons';
import { Image, type ImageProps } from 'antd';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

type Variant = 'default' | 'avatar';
interface PrimaryImageProps extends ImageProps {
  variant?: Variant;
  downloadUrl?: string;
}

export default function PrimaryImage(props: PrimaryImageProps) {
  const id = uuidv4();
  const { variant, preview, rootClassName, ...restProps } = props;

  switch (variant) {
    case 'default': {
      return <Image preview={preview} rootClassName={tw(`image-${id}`, rootClassName)} {...restProps} />;
    }
    case 'avatar': {
      return (
        <div className='relative flex items-start justify-center'>
          <Image
            preview={
              _.isBoolean(preview)
                ? preview
                : {
                    ...preview,
                    mask: <ZoomInOutlined />,
                  }
            }
            //  [&_.ant-image-img]:border-[#737AF0] [&_.ant-image-img]:border-2
            rootClassName={tw(
              ' h-64 w-64 hover:cursor-pointer  [&_.ant-image-img]:object-cover [&_.ant-image-img]:h-full  overflow-hidden rounded-full [&_.ant-image-mask]:rounded-full',
              `image-${id}`,
              rootClassName
            )}
            {...restProps}
          />
          <div className='absolute top-0'>
            <Image src={STYLED_BORDER} preview={false} />
          </div>
        </div>
      );
    }
    default: {
      return <Image preview={preview} rootClassName={tw(`image-${id}`, rootClassName)} {...restProps} />;
    }
  }
}
