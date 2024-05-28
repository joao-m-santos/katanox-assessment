import { useNavigate } from 'react-router-dom';

import { Button, Table, Typography } from 'antd';

import type { PropertiesTableColumn, PropertiesTableProps, TableActionProps } from './types';

const TableActionButton = ({ type, label, id }: TableActionProps) => {
  const navigate = useNavigate();
  return (
    <Button type={type} onClick={() => navigate(`/properties/${id}`)}>
      {label}
    </Button>
  );
};

const columns: PropertiesTableColumn = [
  {
    title: 'Id',
    dataIndex: 'id',
    render: (id: string) => <Typography.Text code>{id}</Typography.Text>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Actions',
    render: (_t, { id }) => <TableActionButton type="primary" label="View details" id={id} />,
  },
];

const PropertiesTable: React.FC<PropertiesTableProps> = ({ data }: PropertiesTableProps) => {
  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default PropertiesTable;
