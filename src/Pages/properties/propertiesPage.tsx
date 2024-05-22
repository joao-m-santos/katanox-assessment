import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from 'antd';
import PropertiesTable from './components/PropertiesTable';

import { getProperties } from '../../Store/property/actions';
import { getPropertiesSelector } from '../../Store/property/selectors';

export const PropertiesPage = () => {
  const dispatch = useDispatch();
  const properties = useSelector(getPropertiesSelector);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return (
    <>
      <Typography.Title level={2}>Properties</Typography.Title>
      <PropertiesTable data={properties} />
    </>
  );
};
