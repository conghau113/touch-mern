import { Empty, Typography, type EmptyProps } from 'antd';
import { tw } from '../../../utils/classUtil';
import NoData from '../icon/NoData';

type Variant = 'missing';

interface PrimaryEmptyProps extends EmptyProps {
  variant?: Variant;
}

export default function PrimaryEmpty(props: PrimaryEmptyProps) {
  const { className, image, description, variant, ...restProps } = props;

  switch (variant) {
    case 'missing': {
      return (
        <div className='flex h-full items-center justify-center'>
          <Empty
            className={tw(className)}
            image={image ?? <NoData />}
            description={
              description ?? (
                <Typography className='select-none text-dark-8'>Dữ liệu đã bị thay đổi hoặc không tìm thấy</Typography>
              )
            }
            {...restProps}
          />
        </div>
      );
    }

    default: {
      return (
        <Empty
          className={tw('py-8', className)}
          image={image ?? <NoData />}
          description={description ?? <Typography className='select-none text-dark-8'>Không có dữ liệu</Typography>}
          {...restProps}
        />
      );
    }
  }
}
