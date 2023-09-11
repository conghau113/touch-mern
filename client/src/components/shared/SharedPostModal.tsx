import { DownloadOutlined } from '@ant-design/icons';
import { Col, Divider, Form, Row, Typography, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { EPostModal } from '../../enums/EPostModal';
import usePostStore from '../../state/usePostStore';
import useTrendingPostStore from '../../state/useTrendingPostStore';
import { getBase64, isAcceptanceFile, isAcceptanceFileQuestion, isImageFile } from '../../utils/fileUtil';
import { openLink } from '../../utils/linkUtil';
import PrimaryButton from '../custom/button/PrimaryButton';
import PrimaryDragger from '../custom/dragger/PrimaryDragger';
import PrimaryForm from '../custom/form/PrimaryForm';
import PrimaryPreviewImage from '../custom/image/PrimaryPreviewImage';
import PrimaryTextArea from '../custom/input/PrimaryTextArea';
import PrimaryModal from '../custom/modal/PrimaryModal';

interface SharedPostModalProps {
  title?: string;
  onSubmit: (values: any) => void;
  isOpen: boolean;
}

export default function SharedPostModal(props: SharedPostModalProps) {
  const { title, onSubmit, isOpen } = props ?? {};
  const [form] = Form.useForm();

  const { setOpenPostModal, postValues, setPostValues, modePostModal, setModePostModal } = usePostStore();
  const [droppedFileName, setDroppedFileName] = useState<string>('');
  const [droppedFileSize, setDroppedFileSize] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState<any>('');
  const [initialFieldList, setFieldList] = useState<any[]>([]);

  const { setEdit } = useTrendingPostStore();

  // xu ly keo tha file
  const handleDrop: UploadProps['onDrop'] = (e: any) => {
    const { name } = e.dataTransfer.files[0];
    setDroppedFileName(name);
  };

  const handlePreview = async (file: UploadFile | null, flatData: any = null) => {
    if (file?.type?.startsWith('image/')) {
      const { url, preview, originFileObj } = file ?? {};
      if (!url && !preview) {
        file.preview = await getBase64(originFileObj as RcFile);
      }
      setPreviewImage(url ?? (preview as string));
    }
    if (file) {
      const { name, url, preview, originFileObj } = file ?? {};
      if (!url && !preview) {
        file.preview = await getBase64(originFileObj as RcFile);
      }
      if (url && !isImageFile(url)) {
        return openLink(url);
      }
      setPreviewImage(url ?? (preview as string));
      console.log('url::', url);
      setPreviewOpen(true);
      setPreviewTitle(name ?? url?.substring(url?.lastIndexOf('/') + 1));
    } else {
      const url = `localhost:3001/${flatData.link}`;
      if (isImageFile(url)) {
        setPreviewImage(url);
        const PreviewTitle = (
          <>
            <div className='flex gap-3'>
              <a target={'_blank'} download href={url} rel='noreferrer'>
                <DownloadOutlined />
              </a>
              {flatData.documentName}
            </div>
          </>
        );
        setPreviewOpen(true);
        setPreviewTitle(PreviewTitle);
      } else {
        openLink(url);
      }
    }
  };

  // format kieu du lieu file khi upload
  function formatBytes(bytes: number, decimals = 2) {
    return `${(bytes / 1024 / 1024).toFixed(decimals)} MB`;
  }

  // xu ly onChange file
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const file = newFileList?.[0];
    const { size = 0, name } = file;
    setDroppedFileName(name);
    setDroppedFileSize(formatBytes(size));
    setFieldList(newFileList);
    if (size && size > 20 * 1024 * 1024) {
      setStatus('error');
      // message.error('File size must not exceed 20MB');
      return false;
    }
    if (name && !isAcceptanceFile(name)) {
      setStatus('error');
      // message.error(`Attachment file is invalid. Only accepted formats ${_.join(['jpg', 'jpeg', 'png'], ', ')}`);
      return false;
    } else {
      setStatus('done');
    }
  };

  // xu ly uploadfile props
  const uploadProps: UploadProps = {
    // multiple: false,
    onChange: handleChange,
    onPreview: handlePreview,
    listType: status !== 'normal' ? 'picture-card' : undefined,
    onDrop: handleDrop,
    beforeUpload: (file) => {
      if (file.size && file.size > 20 * 1024 * 1024) {
        // message.error('File size must not exceed 20MB');
        return false;
      }
      if (file.name && !isAcceptanceFile(file.name)) {
        // message.error('File không hợp lệ');
        return false;
      }
      return false;
    },
  };

  useEffect(() => {
    if (isOpen) {
      setEdit(false);
      setStatus('normal');
    }
    if (!isOpen) {
      setModePostModal(EPostModal.Create);
      setStatus('normal');
      // form.resetFields();
    }
    if (!!_.size(postValues?.image) && isOpen) {
      console.log('postValues?.image:', postValues?.image);
      setStatus('done');
      setDroppedFileName(postValues?.image?.[0]?.public_id);
      setFieldList([
        {
          uid: postValues?.image?.[0]?.public_id,
          name: postValues?.image?.[0]?.public_id,
          status: 'done',
          url: postValues?.image?.[0]?.url,
        },
      ]);
    }
  }, [isOpen]);

  return (
    <PrimaryModal
      open={isOpen}
      width={800}
      closable
      onCancel={() => {
        setOpenPostModal(false);
        setPostValues({});
      }}
      title={<Typography className='flex items-center justify-start text-base text-main-purple'>{title}</Typography>}
      footer={null}
      destroyOnClose
      className='[&_.ant-modal-body]:pb-1 [&_.ant-modal-content]:bg-white [&_.ant-modal-header]:bg-white'
      centered
    >
      <Divider className='my-2 bg-main-purple' />
      <PrimaryForm
        form={form}
        onFinish={onSubmit}
        name='modal-post-form'
        layout='vertical'
        initialValues={
          _.includes(EPostModal.Update, modePostModal)
            ? {
                content: postValues?.content,
                title: postValues?.title,
                image: [
                  {
                    uid: postValues?.image?.[0]?.public_id,
                    name: postValues?.image?.[0]?.public_id,
                    status: 'done',
                    url: postValues?.image?.[0]?.url,
                  },
                ],
              }
            : undefined
        }
        preserve={false}
      >
        <Row gutter={[12, 0]}>
          <Col span={24}>
            <Typography className='text-base mb-2'>Title:</Typography>
            <Form.Item
              className='mb-2'
              name='title'
              rules={[
                {
                  validator: (__, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Title cannot be empty!'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryTextArea autoSize={{ minRows: 2, maxRows: 2 }} placeholder='Enter your title' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography className='text-base mb-2'>Content:</Typography>
            <Form.Item
              name='content'
              className='mb-2'
              rules={[
                {
                  validator: (__, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Content cannot be empty!'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryTextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder='Enter your content' />
            </Form.Item>
          </Col>

          {/* file */}
          <Col span={24}>
            <Form.Item
              name='image'
              className=''
              label='Avatar:'
              rules={[
                () => ({
                  validator: async (__, value) => {
                    const { file } = value ?? {};
                    const { size = 0, name } = file ?? {};
                    const getSizeFile: number = size - 20 * 1024 * 1024;

                    // if (!value) {
                    //   return Promise.reject('Vui lòng đính kèm file!');
                    // }
                    if (Number.isInteger(getSizeFile) && getSizeFile > 0) {
                      return await Promise.reject(new Error('File size must not exceed 20MB!'));
                    }
                    if (name && !isAcceptanceFileQuestion(name)) {
                      return await Promise.reject(
                        new Error(
                          `Attachment file is invalid. Only accepted formats ${_.join(['jpg', 'jpeg', 'png'], ', ')}!`
                        )
                      );
                    }
                    return await Promise.resolve();
                  },
                }),
              ]}
            >
              <PrimaryDragger
                {...uploadProps}
                accept={'.jpg,.jpeg,.png'}
                droppedFileName={droppedFileName}
                droppedFileSize={droppedFileSize}
                fileList={initialFieldList}
                onHandleClickRemoveFile={() => {
                  form.setFieldValue('image', undefined);
                  setStatus('normal');
                  setDroppedFileSize('');
                  setDroppedFileName('');
                  form.validateFields(['image']);
                  setPreviewOpen(false);
                  console.log('postValues:;', postValues);
                  setPostValues({ ...postValues, image: [] });
                }}
                maxCount={1}
                variant={`${status === 'error' ? 'failed' : status === 'done' ? 'success' : 'normal'}`}
                className={`${
                  status !== 'done'
                    ? '[&_.ant-upload-list]:hidden'
                    : '[&_.ant-upload-list]:mt-4 [&_.ant-upload-list]:flex [&_.ant-upload-list]:items-start [&_.ant-upload-list-item]:border-none '
                }`}
              />
            </Form.Item>
          </Col>
          {previewImage && (
            <PrimaryPreviewImage
              className='hidden'
              setVisible={setPreviewOpen}
              isVisible={previewOpen}
              title={previewTitle}
              previewImaeSrc={previewImage}
            />
          )}
        </Row>
        <Divider className='my-2 bg-main-purple' />
        <div className='flex justify-end m-4 mr-0'>
          <PrimaryButton className='w-24 h-10' variant='primary' htmlType='submit'>
            Post
          </PrimaryButton>
        </div>
      </PrimaryForm>
    </PrimaryModal>
  );
}
