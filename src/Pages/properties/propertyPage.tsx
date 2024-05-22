import { Key, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Card, Carousel, Col, Flex, Rate, Row, Space, Statistic, Typography } from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';

import { getProperties } from '../../Store/property/actions';
import { getPropertiesSelector } from '../../Store/property/selectors';

const headerStyle: React.CSSProperties = {
  padding: '1rem 0',
};

const titleStyle: React.CSSProperties = {
  marginTop: '0.5rem',
};

const imageStyle: React.CSSProperties = {
  aspectRatio: '16 / 9',
  objectFit: 'cover',
  width: '100%',
};

const infoRowStyle: React.CSSProperties = {
  marginTop: '1rem',
};

const loadingIconStyle: React.CSSProperties = {
  fontSize: '4rem',
  margin: '4rem',
};

export const PropertyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const properties = useSelector(getPropertiesSelector);

  const { propertyId } = useParams();

  const property = useMemo(() => {
    return properties?.filter((p: { id: any }) => p['id'] === propertyId)[0];
  }, [properties, propertyId]);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return property ? (
    <>
      <Flex justify="end" style={headerStyle}>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate('/properties')}>
          Back to property list
        </Button>
      </Flex>

      <Row gutter={16}>
        <Col span={12}>
          <Typography.Text code>{property.id}</Typography.Text>
          <Typography.Title level={2} style={titleStyle}>
            {property.name}
          </Typography.Title>

          <Space direction="vertical" size="large">
            <Rate disabled defaultValue={property.starRating} />
            <Space size="small">
              <EnvironmentOutlined />
              <Typography>
                {property.addressLine1}
                <br />
                {property.postcode} {property.city}, {property.country}
              </Typography>
            </Space>
            <Typography.Text type="secondary">{property.description}</Typography.Text>
          </Space>
        </Col>

        <Col span={12}>
          <Carousel arrows autoplay>
            {property.images.map((img: { id: Key | null | undefined; url: string | undefined }) => (
              <div>
                <img key={img.id} alt={property.name} src={img.url} style={imageStyle} />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row gutter={16} style={infoRowStyle}>
        <Col span={8}>
          <Card size="small">
            <Statistic title="Rooms" value={property.rooms} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="Check-in" value={property.checkInTime} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="Check-out" value={property.checkOutTime} />
          </Card>
        </Col>
      </Row>

      <Typography.Title level={3}>Policies</Typography.Title>
    </>
  ) : (
    <Flex justify="center">
      <LoadingOutlined style={loadingIconStyle} />
    </Flex>
  );
};
