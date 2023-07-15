import { Form, Space } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryCard from '../../../components/custom/card/PrimaryCard';
import PrimaryForm from '../../../components/custom/form/PrimaryForm';
import SentIcon from '../../../components/custom/icon/SentIcon';
import PrimaryTextArea from '../../../components/custom/input/PrimaryTextArea';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';

interface CommentUpdateEditorProps {
  onSubmit: (values: any) => void;
  initialValue?: any;
}

export default function CommentUpdateEditor({ onSubmit, initialValue }: CommentUpdateEditorProps) {
  const [form] = Form.useForm();
  const [checkValue, setValue] = useState<string>('');
  return (
    <PrimaryCard className='bg-main-light mt-4'>
      <div className='flex w-full gap-3 justify-center items-center'>
        <div className='flex items-start'>
          <SharedAvatarAuthUser />
        </div>
        <div className='w-full'>
          <PrimaryForm
            layout='inline'
            className='flex items-center flex-nowrap'
            form={form}
            preserve={false}
            name={`update-comments-form-modal`}
            onFinish={onSubmit}
            initialValues={{ content: initialValue }}
          >
            <Form.Item
              className='mb-0 w-[93.5%]'
              name='content'
              rules={[
                {
                  validator: (__, values) => {
                    if (!values) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryTextArea
                className='w-full '
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder='Nhập comment...'
                autoFocus
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
                    event.preventDefault();
                    if (_.size(checkValue) && checkValue.trim() !== '') {
                      onSubmit(form.getFieldsValue());
                      form.resetFields();
                    } else {
                      form.resetFields();
                    }
                  }
                }}
              />
            </Form.Item>
            <Space className='m'>
              <PrimaryButton variant='primary' shape='circle' htmlType='submit' className='h-8 w-8 '>
                <Space className=' pt-1'>
                  <SentIcon className='text-main-blue' />
                </Space>
              </PrimaryButton>
            </Space>
          </PrimaryForm>
        </div>
      </div>
    </PrimaryCard>
  );
}
