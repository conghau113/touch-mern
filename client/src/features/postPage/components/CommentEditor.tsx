import { Col, Form, message, Row, Space } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createComment } from '../../../apis/service/posts';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryCard from '../../../components/custom/card/PrimaryCard';
import PrimaryForm from '../../../components/custom/form/PrimaryForm';
import SentIcon from '../../../components/custom/icon/SentIcon';
import PrimaryTextArea from '../../../components/custom/input/PrimaryTextArea';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';
import { isLoggedIn } from '../../../helper/authhelper';
import useBackdropStore from '../../../state/useBackdropStore';

interface CommenteditorProps {
  addComment: (values: any) => void;
  comment?: any;
  setReplying?: (isReply: boolean) => void;
  fetchPost?: () => void;
}

export default function Commenteditor({ addComment, fetchPost, setReplying, comment }: CommenteditorProps) {
  const [form] = Form.useForm();
  const params: any = useParams();
  const { setOpenBackdrop } = useBackdropStore();
  const [checkValue, setValue] = useState<string>('');

  const onSubmit = async (values: any) => {
    const body = {
      ...values,
      parentId: comment && comment._id,
    };
    const data = await createComment(body, params, isLoggedIn());
    if (data.error) {
      message.error(data.error);
    } else {
      addComment(data);
      fetchPost?.();
      form.resetFields();
      setReplying && setReplying(false);
    }
  };
  return (
    <>
      <PrimaryCard className='bg-white mt-4 border-main-purple'>
        <div className='flex w-full gap-3 justify-center items-center'>
          <div className='flex items-start'>
            <SharedAvatarAuthUser />
          </div>
          <div className='w-full'>
            <PrimaryForm
              layout='inline'
              className='flex items-center flex-nowrap'
              form={form}
              name={`${comment ? 'comments-form' : 'comment-form'}`}
              onFinish={onSubmit}
            >
              <Form.Item
                className='mb-0 w-[91.5%]'
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
              <Space className=''>
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
    </>
  );
}
