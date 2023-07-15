import { Col, Divider, Row, Skeleton, type SkeletonProps } from 'antd';
import _ from 'lodash';
import { tw } from '../../../utils/classUtil';

type Variant = 'default' | 'avatar' | 'form';

export interface PrimarySkeletonProps extends SkeletonProps {
  variant?: Variant;
  countRow: number;
  countRowAvatar?: number;
  avatarShape?: 'circle' | 'square';
  buttonClassName?: string;
  avatarClassName?: string;
  countRowClassName?: string;
  avatarSize?: number;
  isButton?: boolean;
  isAvatar?: boolean;
}

export default function PrimarySkeleton(props: PrimarySkeletonProps) {
  const {
    avatarShape,
    countRowAvatar,
    avatarSize,
    isButton,
    isAvatar,
    variant,
    countRow,
    buttonClassName,
    avatarClassName,
    countRowClassName,
    ...restProps
  } = props;
  const randomWidth: number = Math.floor(Math.random() * (10 - 6) + 6) * 10;

  switch (variant) {
    case 'avatar': {
      return (
        <div>
          <div className={tw('mb-1.5 flex w-full items-start', avatarClassName)}>
            <div className='flex items-center'>
              <Skeleton.Avatar
                className={tw('mr-3 [&>.ant-skeleton-avatar-square]:rounded-lg')}
                active
                size={avatarSize}
                shape={avatarShape}
              />
            </div>
            <div className='flex w-full flex-col'>
              <div className='flex w-full flex-col '>
                <Skeleton.Button
                  className={tw('my-1 h-4 w-7/12', countRowClassName)}
                  active
                  size='small'
                  shape='round'
                  block
                />
                {_.map(Array(countRowAvatar), (__, key) => (
                  <Skeleton.Button
                    key={key}
                    className={tw('my-1 h-4 w-9/12', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                ))}
              </div>
              {isAvatar ? (
                <div className='mt-3 w-full'>
                  {(countRow && (
                    <Skeleton.Button className='my-1 h-4 w-11/12' active size='small' shape='round' block />
                  )) ||
                    null}
                  {_.map(
                    Array(countRow),
                    (__, key) =>
                      <Skeleton.Button key={key} className='my-1.5 h-4' active size='small' shape='round' block /> ||
                      null
                  )}
                </div>
              ) : null}
            </div>
          </div>
          {isAvatar ?? (
            <div className='mt-1.5'>
              {_.map(
                Array(countRow),
                (__, key) =>
                  (
                    <Skeleton.Button
                      key={key}
                      className={tw('my-1.5 h-4', buttonClassName)}
                      active
                      size='small'
                      shape='round'
                      block
                    />
                  ) || null
              )}
              <Skeleton.Button
                className={tw('my-1.5 h-4 w-5/6', buttonClassName)}
                active
                size='small'
                shape='round'
                block
              />
              {isButton && (
                <Skeleton.Button
                  className={tw('my-1.5 h-4', buttonClassName)}
                  active
                  size='small'
                  shape='round'
                  block
                />
              )}
            </div>
          )}
        </div>
      );
    }
    case 'default': {
      return (
        <Skeleton
          className={tw('h-4', countRowClassName)}
          round
          active
          paragraph={{ rows: countRow, width: `${randomWidth}%` }}
          {...restProps}
        />
      );
    }
    case 'form': {
      return (
        <div className='px-3 pb-4'>
          <div className='mt-2'>
            <Skeleton.Button
              className={tw('mb-1.5 h-5 w-3/5', buttonClassName)}
              active
              size='small'
              shape='round'
              block
            />
          </div>
          <Divider className='my-3' />
          <Row gutter={[12, 0]}>
            <Col span={24}>
              <Row gutter={[12, 0]} className='my-2'>
                <Col span={12}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 w-4/5', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
                <Col span={12}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 w-4/5', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[12, 0]} className='my-2'>
                <Col span={24}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 w-3/5', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[12, 0]} className='my-2'>
                <Col span={12}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 w-4/5', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
                <Col span={12}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 w-4/5', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[12, 0]} className='my-2'>
                <Col span={12}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 w-4/5', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
                <Col span={12}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 w-4/5', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[12, 0]} className='my-2'>
                <Col span={24}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 w-3/5', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[12, 0]} className='my-2'>
                <Col span={24}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 w-3/5', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
                <div>
                  {_.map(Array(7), (__, index) => {
                    return (
                      <Skeleton.Button
                        key={index}
                        className={tw('my-2.5 mr-3 h-14 w-14 ', buttonClassName)}
                        active
                        shape='circle'
                        block
                      />
                    );
                  })}
                </div>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[12, 0]} className='my-2'>
                <Col span={12}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
                <Col span={12}>
                  <Skeleton.Button
                    className={tw('my-2.5 h-5 ', buttonClassName)}
                    active
                    size='small'
                    shape='round'
                    block
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }
    default:
      break;
  }

  return <Skeleton round active {...restProps} />;
}
