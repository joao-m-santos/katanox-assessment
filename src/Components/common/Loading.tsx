import { Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const loadingIconStyle: React.CSSProperties = {
  fontSize: '4rem',
  margin: '4rem',
};

const Loading: React.FC = () => {
  return (
    <Flex justify="center">
      <LoadingOutlined style={loadingIconStyle} />
    </Flex>
  );
};

export default Loading;
