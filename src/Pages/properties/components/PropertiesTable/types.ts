import type { ButtonType } from 'antd/es/button';
import type { ColumnsType } from 'antd/es/table';

import type { IPropertyData } from '../../../../Store/property/types';

export interface TableActionProps {
  type: ButtonType;
  label: string;
  id: string;
}

export type PropertiesTableColumn = ColumnsType<IPropertyData>;

export interface PropertiesTableProps {
  data: IPropertyData[];
}
