import {
  CloudDownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space, Typography, type ImageProps } from 'antd';
interface PrimaryPreviewImageProps extends ImageProps {
  previewImaeSrc: string;
  isVisible: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export default function PrimaryPreviewImage(props: PrimaryPreviewImageProps) {
  const { previewImaeSrc, isVisible, setVisible, title, ...restProps } = props;
  const onDownload = () => {
    fetch(previewImaeSrc)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = title;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };
  return (
    <Image
      {...restProps}
      width={200}
      src={previewImaeSrc}
      preview={{
        visible: isVisible,
        onVisibleChange: setVisible,
        maskClosable: true,
        title: <Typography className='mt-6 text-white'>{title}</Typography>,
        toolbarRender: (
          _: any,
          { transform: { scale }, actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn } }: any
        ) => (
          <Space size={32} className='toolbar-wrapper rounded-full  px-5 py-1.5 text-xl'>
            <CloudDownloadOutlined className='hover:opacity-70' onClick={onDownload} />
            <SwapOutlined className='hover:opacity-70' rotate={90} onClick={onFlipY} />
            <SwapOutlined className='hover:opacity-70' onClick={onFlipX} />
            <RotateLeftOutlined className='hover:opacity-70' onClick={onRotateLeft} />
            <RotateRightOutlined className='hover:opacity-70' onClick={onRotateRight} />
            <ZoomOutOutlined className='hover:opacity-70' disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined className='hover:opacity-70' disabled={scale === 50} onClick={onZoomIn} />
          </Space>
        ),
      }}
    />
  );
}
