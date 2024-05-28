import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Card, Carousel, Col, Flex, Rate, Row, Space, Statistic, Typography } from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Loading from '../../Components/common/Loading';
import PolicyList from './components/PolicyList';

import { getProperties, setPropertyPolicies } from '../../Store/property/slice';
import { getPropertiesSelector } from '../../Store/property/selectors';
import type { IPropertyPolicy, PolicyType } from '../../Store/property/types';

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

export const PropertyPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(getPropertiesSelector);

  const { propertyId } = useParams();

  const propertyData = useMemo(() => {
    return data?.find((p) => p.property.id === propertyId);
  }, [data, propertyId]);

  const property = propertyData?.property;
  const policies = propertyData?.policies;

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  const handlePolicySave = (item: IPropertyPolicy, policyType: PolicyType) => {
    dispatch(
      setPropertyPolicies({ propertyId: propertyId as string, policyType, policyData: item })
    );
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Flex justify="end" style={headerStyle}>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate('/properties')}>
          Back to property list
        </Button>
      </Flex>

      {property ? (
        <>
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
                {property.images.map((img) => (
                  <div key={img.id}>
                    <img alt={property.name} src={img.url} style={imageStyle} />
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

          {policies && (
            <>
              <Typography.Title level={3}>Policies</Typography.Title>

              <Typography.Title level={4}>No-show policies</Typography.Title>
              <PolicyList
                type="noShowPolicies"
                data={policies.noShowPolicies}
                onSave={(item) => handlePolicySave(item, 'noShowPolicies')}
              />

              <Typography.Title level={4}>Cancellation policies</Typography.Title>
              <PolicyList
                type="cancellationPolicies"
                data={policies.cancellationPolicies}
                onSave={(item) => handlePolicySave(item, 'cancellationPolicies')}
              />
            </>
          )}
        </>
      ) : (
        <Typography.Title level={2} style={titleStyle}>
          Property not found.
        </Typography.Title>
      )}
    </>
  );
};
