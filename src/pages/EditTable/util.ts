/* eslint-disable no-plusplus */
import type { ProColumns } from '@ant-design/pro-table';

export const tableColumns: ProColumns<EditTableSource>[] = [
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
    render: (_, { realNumber }) => {
      if (!realNumber) return _;
      return Math.random() * 100 - (realNumber || 0);
    },
  },
  {
    title: '操作',
    dataIndex: '$RZ_Control',
  },
];
