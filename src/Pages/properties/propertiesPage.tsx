import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from 'antd';
import Loading from '../../Components/common/Loading';
import PropertiesTable from './components/PropertiesTable';

import { getProperties } from '../../Store/property/slice';
import { getPropertiesSelector } from '../../Store/property/selectors';

export const PropertiesPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(getPropertiesSelector);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return isLoading || !data ? (
    <Loading />
  ) : (
    <>
      <Typography.Title level={2}>Properties</Typography.Title>
      <PropertiesTable data={data?.map((p) => p.property)} />
    </>
  );
};
