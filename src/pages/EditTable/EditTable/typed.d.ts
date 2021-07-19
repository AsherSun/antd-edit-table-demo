import type { ReactNode } from 'react';

export type EditValueType = 'index' | 'text' | 'digit';

export interface EditColumns<T = any> {
  dataIndex?: string;
  title?: string;
  valueType?: EditValueType;
  width?: number;
  align?: 'center';
  valueEnum?: Record<number | string, string>;
  render?: (
    value: any,
    record: T,
    options: {
      onRefresh: () => void;
    },
  ) => ReactNode;
}

export interface DataSourceType {
  storageId?: number;
  id: number;
  skuName?: string;
  area?: string;
  location?: string;
  realNumber?: number;
  distanceNumber?: string;
}
