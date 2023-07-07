import { Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import PrimaryCard from '../../components/custom/card/PrimaryCard';
import { RootState } from '../../state/store';
import Navbar from '../navbar';
import MyPostWidget from '../widgets/MyPostWidget';
import UserWidget from '../widgets/UserWidget';

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const { _id, picturePath } = user ?? {};
  console.log('picturePath', _id, picturePath);
  return (
    <Row>
      <Col span={24}>
        <Navbar />
      </Col>
      <Col span={24} className='px-4'>
        <Row gutter={[24, 12]} className='pt-4'>
          <Col span={6}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Col>
          <Col span={12}>
            <MyPostWidget picturePath={picturePath} />
          </Col>
          <Col span={6}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HomePage;
