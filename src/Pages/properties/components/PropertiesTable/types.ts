import type { ButtonType } from 'antd/es/button';
import type { ColumnsType } from 'antd/es/table';

export interface TableActionProps {
  type: ButtonType;
  label: string;
  id: string;
}

export interface PropertyItem {
  id: string;
  name: string;
}
export type PropertiesTableColumn = ColumnsType<PropertyItem>;

export interface PropertiesTableProps {
  data: PropertyItem[];
}
