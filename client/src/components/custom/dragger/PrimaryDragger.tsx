import { Typography } from 'antd';
import { type DraggerProps } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import React from 'react';
import { tw } from '../../../utils/classUtil';
import PrimaryButton from '../button/PrimaryButton';
import CircleFileFailedIcon from '../icon/CircleFileFailedIcon';
import CircleFileSuccessIcon from '../icon/CircleFileSuccessIcon';
import CircleFileUploadIcon from '../icon/CircleFileUploadIcon';
import CircleFileUploadImageIcon from '../icon/CircleFileUploadImageIcon';

type Variant = 'success' | 'failed' | 'normal';

interface PrimaryDraggerProps extends DraggerProps {
  variant?: Variant;
  droppedFileName?: string;
  droppedFileSize?: string;
  onHandleClickRemoveFile?: () => void;
  isUploadImage?: boolean;
  isVertical?: boolean;
  onHandleClickPreviewFile?: () => void;
}
const { Text, Title } = Typography;
export default React.forwardRef(function PrimaryDragger(props: PrimaryDraggerProps, ref: React.Ref<HTMLButtonElement>) {
  const {
    className,
    variant,
    onHandleClickRemoveFile,
    onHandleClickPreviewFile,
    droppedFileName,
    droppedFileSize,
    beforeUpload,
    onChange,
    onDrop,
    isUploadImage = false,
    ...restProps
  } = props;

  switch (variant) {
    case 'failed': {
      return (
        <Dragger
          className={tw(
            ' rounded-lg  [&_.ant-upload.ant-upload-drag]:border-double [&_.ant-upload.ant-upload-drag]:border-red-5 [&_.ant-upload.ant-upload-drag]:bg-white',
            className
          )}
          ref={ref}
          onChange={onChange}
          {...restProps}
        >
          <div className='flex justify-between px-9 py-4'>
            <div className='flex flex-nowrap items-center gap-4'>
              <CircleFileFailedIcon className='h14 flex w-14' />
              <Typography className='flex flex-col items-start justify-center'>
                <Title className='m-0 text-base font-semibold'>Tệp bị lỗi</Title>
                <Text className='my-1.5 text-xs font-normal text-dark-7'>{droppedFileName}</Text>
                <Text
                  className='text-blue-2 hover:opacity-80'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onHandleClickRemoveFile?.();
                  }}
                >
                  Xóa file
                </Text>
              </Typography>
            </div>
            <div className='flex items-center'>
              <PrimaryButton
                variant='cancel'
                typographyClassName='text-dark-1 text-sm font-semibold'
                className='h-10 bg-light-17'
              >
                Thay tệp
              </PrimaryButton>
            </div>
          </div>
        </Dragger>
      );
    }
    case 'success': {
      return (
        <Dragger
          className={tw(
            ' rounded-lg [&_.ant-upload.ant-upload-drag]:border-double [&_.ant-upload.ant-upload-drag]:border-green-6 [&_.ant-upload.ant-upload-drag]:bg-white',
            className
          )}
          ref={ref}
          onChange={onChange}
          {...restProps}
        >
          <div className='flex justify-between px-9 py-4'>
            <div className='flex flex-nowrap items-center gap-4'>
              <CircleFileSuccessIcon className='h14 flex w-14' />
              <Typography className='flex flex-col items-start justify-center'>
                <Title className='m-0 text-base font-semibold'>{droppedFileName}</Title>
                {/* <Text className='my-1.5 text-xs font-normal text-dark-7'>{droppedFileSize}</Text> */}
                <div className='flex gap-4'>
                  <Text
                    className='mt-1.5 text-blue-2 hover:opacity-80'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onHandleClickRemoveFile?.();
                    }}
                  >
                    Xóa file
                  </Text>
                  {isUploadImage ? (
                    <Text
                      className='flex items-center pt-1.5 text-blue-2 hover:opacity-80'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onHandleClickPreviewFile?.();
                      }}
                    >
                      Xem trước
                    </Text>
                  ) : null}
                </div>
              </Typography>
            </div>
            <div className='flex items-center'>
              <PrimaryButton
                variant='cancel'
                typographyClassName='text-dark-1 text-sm font-semibold'
                className='h-10 bg-light-17'
              >
                Thay tệp
              </PrimaryButton>
            </div>
          </div>
        </Dragger>
      );
    }
    default: {
      return (
        <Dragger
          ref={ref}
          onChange={onChange}
          {...restProps}
          className={tw(
            `(className, [&_.ant-upload.ant-upload-btn]:rounded-lg [&_.ant-upload.ant-upload-btn]:bg-white [&_.ant-upload.ant-upload-drag]:border-main-purple ${
              isUploadImage ? '[&_.ant-upload-btn]:pt-9' : ''
            }`,
            className
          )}
        >
          <div
            className={`flex ${isUploadImage ? 'items-center justify-center' : 'justify-between'} bg-white px-9 py-4`}
          >
            <div className={`flex ${isUploadImage ? 'flex-col' : ''} flex-nowrap items-center gap-4`}>
              {isUploadImage ? (
                <>
                  <CircleFileUploadImageIcon className='h14 flex w-14' />
                  <Typography
                    className={`flex flex-col ${isUploadImage ? 'items-center' : 'items-start'} justify-center`}
                  >
                    <Title className='m-0 mt-4 text-base font-semibold'>Thêm ảnh bài viết</Title>
                    <Text className={`mt-1 text-xs font-normal text-dark-7`}>Nhấp hoặc kéo tệp vào đây để tải lên</Text>
                  </Typography>
                </>
              ) : (
                <>
                  <CircleFileUploadIcon className='h14 flex w-14' />
                  <Typography
                    className={`flex flex-col ${isUploadImage ? 'items-center' : 'items-start'} justify-center`}
                  >
                    <Title className='text-black m-0 text-base font-semibold'>
                      Nhấp hoặc kéo tệp vào đây để tải lên
                    </Title>
                    <Text className={`text-black my-1.5 text-xs font-normal opacity-60`}>
                      Chỉ được tải lên 1 file với các định dạng: .jpeg hoặc .png, .jpg
                    </Text>
                  </Typography>
                </>
              )}
            </div>
            {!isUploadImage ? (
              <div className='flex items-center'>
                <PrimaryButton
                  variant='cancel'
                  typographyClassName='text-dark-1 text-sm font-semibold'
                  className='h-10 bg-light-17'
                >
                  Chọn tệp
                </PrimaryButton>
              </div>
            ) : null}
          </div>
        </Dragger>
      );
    }
  }
});
