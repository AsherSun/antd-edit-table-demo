import { Children, isValidElement, cloneElement } from 'react';
import type { ReactNode } from 'react';
import type { EditColumns } from './typed';

export const tableColumns: EditColumns[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 80,
  },
  {
    title: '货号',
    dataIndex: 'storageId',
    valueType: 'digit',
  },
  {
    title: 'sku名称',
    dataIndex: 'skuName',
    valueType: 'text',
  },
  {
    title: '仓位区域',
    dataIndex: 'area',
    valueType: 'text',
  },
  {
    title: '仓位',
    dataIndex: 'location',
    valueType: 'text',
  },
  {
    title: '盘点数量',
    dataIndex: 'realNumber',
    valueType: 'digit',
  },
  {
    title: '差异',
    dataIndex: 'distanceNumber',
  },
  {
    title: '操作',
    dataIndex: '$RZ_Control',
    render: () => '操作',
  },
];

export function childrenWithProps(children: ReactNode, props: Record<string, any>) {
  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { ...props });
    }
    return child;
  });
}
