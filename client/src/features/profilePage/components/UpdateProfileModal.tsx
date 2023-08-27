import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Col, Divider, Form, Input, Row, Space } from 'antd';
import _ from 'lodash';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryForm from '../../../components/custom/form/PrimaryForm';
import PrimaryInput from '../../../components/custom/input/PrimaryInput';
import PrimaryTextArea from '../../../components/custom/input/PrimaryTextArea';
import PrimaryModal from '../../../components/custom/modal/PrimaryModal';
import UpdateProfileModalStore from '../store/UpdateProfileModalStore';

interface UpdateProfileModalProps {
  onSubmit: (values: any) => void;
  inittialProfile?: any;
}

export default function UpdateProfileModal(props: UpdateProfileModalProps) {
  const [form] = Form.useForm();
  const { onSubmit, inittialProfile } = props ?? {};
  const { isOpen, setOpen } = UpdateProfileModalStore();

  return (
    <PrimaryModal
      footer={null}
      width={800}
      title='Update profile'
      centered
      closable
      onCancel={() => setOpen(false)}
      open={isOpen}
      destroyOnClose
    >
      <Divider className='mb-4 bg-main-purple' />
      <PrimaryForm
        form={form}
        preserve={false}
        initialValues={inittialProfile}
        name='login-form'
        layout='vertical'
        onFinish={onSubmit}
      >
        <Row gutter={[12, 12]}>
          {/* Biography */}
          <Col span={24}>
            <Form.Item
              required={false}
              className='mb-0'
              label='Biography'
              name={'biography'}
              rules={[
                {
                  validator: async (__, value) => {
                    if (value.length > 200) {
                      return await Promise.reject(new Error('biography không được quá 200 kí tự'));
                    }
                    return await Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryTextArea allowClear placeholder='Nhập biography' autoSize={{ minRows: 4, maxRows: 4 }} />
            </Form.Item>
          </Col>
          {/* first name */}
          <Col span={24}>
            <Form.Item
              label='Họ và tên'
              required
              name='fullName'
              className='mb-0'
              rules={[
                {
                  validator: async (__, value) => {
                    if (!value) {
                      return await Promise.reject(new Error('vui lòng nhập họ và tên của bạn'));
                    }
                    if (_.size(value) >= 40) {
                      return await Promise.reject(new Error('họ và tên không được dài quá 40 kí tự!'));
                    }
                    if (_.size(value) < 6) {
                      return await Promise.reject(new Error('họ và tên phải tối thiểu 6 kí tự!'));
                    }
                    return await Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryInput allowClear placeholder='Nhập họ và tên của bạn' type={'text'} />
            </Form.Item>
          </Col>
          {/* location */}
          <Col span={24}>
            <Form.Item
              label='Địa chỉ (nơi ở hiện tại)'
              required
              name='location'
              className='mb-0'
              rules={[
                {
                  validator: async (__, value) => {
                    if (!value) {
                      return await Promise.reject(new Error('Vui lòng nhập địa chỉ của bạn!'));
                    }
                    if (_.size(value) >= 200) {
                      return await Promise.reject(new Error('Địa chỉ không được dài quá 200 kí tự!'));
                    }
                    return await Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryInput allowClear placeholder='Nhập địa chỉ của bạn' type={'text'} />
            </Form.Item>
          </Col>

          {/* occupation */}
          {/* <Col span={24}>
            <Form.Item
              label='User name'
              required
              name='username'
              className='mb-0'
              rules={[
                {
                  validator: async (__, value) => {
                    if (!value) {
                      return await Promise.reject(new Error('Vui lòng nick-name của bạn!'));
                    }
                    if (_.size(value) >= 200) {
                      return await Promise.reject(new Error('Nick-name không được dài quá 200 kí tự!'));
                    }
                    return await Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryInput allowClear placeholder='Nhập nick-name của bạn' type={'text'} />
            </Form.Item>
          </Col> */}
          <Col span={24}>
            <Form.Item
              label='Nghề nghiệp'
              required
              name='occupation'
              className='mb-0'
              rules={[
                {
                  validator: async (__, value) => {
                    if (!value) {
                      return await Promise.reject(new Error('Vui lòng nhập nghề nghiệp của bạn!'));
                    }
                    if (_.size(value) >= 200) {
                      return await Promise.reject(new Error('Nghề nghiệp không được dài quá 200 kí tự!'));
                    }
                    return await Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryInput allowClear placeholder='Nhập nghề nghiệp của bạn' type={'text'} />
            </Form.Item>
          </Col>

          {/* button submit */}
          <Divider className='mb-2 mt-4 bg-main-purple shadow-sm' />
          <Col span={24}>
            <div className='flex justify-end items-end mb-4'>
              <PrimaryButton htmlType='submit' className='bg-main-purple text-white h-12 w-full text-center '>
                Update
              </PrimaryButton>
            </div>
          </Col>
        </Row>
      </PrimaryForm>
    </PrimaryModal>
  );
}
