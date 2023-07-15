import { Col, Divider, Form, Row, Typography } from 'antd';
import _ from 'lodash';
import { EPostModal } from '../../enums/EPostModal';
import usePostStore from '../../state/usePostStore';
import PrimaryButton from '../custom/button/PrimaryButton';
import PrimaryForm from '../custom/form/PrimaryForm';
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

  const { setOpenPostModal, postValues, modePostModal, setModePostModal } = usePostStore();
  return (
    <PrimaryModal
      open={isOpen}
      width={800}
      closable
      onCancel={() => {
        setOpenPostModal(false);
        setModePostModal(EPostModal.Create);
      }}
      title={<Typography className='flex items-center justify-start text-base text-main-purple'>{title}</Typography>}
      footer={null}
      destroyOnClose
      className='[&_.ant-modal-body]:pb-1 [&_.ant-modal-content]:bg-main-light [&_.ant-modal-header]:bg-main-light'
      centered
    >
      <Divider className='my-2' />
      <PrimaryForm
        form={form}
        onFinish={onSubmit}
        name='modal-post-form'
        layout='vertical'
        initialValues={
          _.includes(EPostModal.Update, modePostModal)
            ? { content: postValues?.content, title: postValues?.title }
            : undefined
        }
        preserve={false}
      >
        <Row gutter={[12, 0]}>
          <Col span={24}>
            <Typography className='text-base mb-2'>Tiêu đề:</Typography>
            <Form.Item
              className='mb-2'
              name='title'
              rules={[
                {
                  validator: (__, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Tiêu đề không được để trống'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryTextArea autoSize={{ minRows: 2, maxRows: 2 }} placeholder='Nhập tiêu đề' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography className='text-base mb-2'>Nội dung:</Typography>
            <Form.Item
              name='content'
              className='mb-2'
              rules={[
                {
                  validator: (__, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Nội dung không được để trống'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryTextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder='Nhập nội dung' />
            </Form.Item>
          </Col>
        </Row>
        <Divider className='my-2' />
        <div className='flex justify-end m-4 mr-0'>
          <PrimaryButton className='w-24 h-10' variant='primary' htmlType='submit'>
            Post
          </PrimaryButton>
        </div>
      </PrimaryForm>
    </PrimaryModal>
  );
}
