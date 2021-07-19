// import { columnsAssembling } from "@/utils";
import { columnsAssembling } from '@/utils';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, InputNumber } from 'antd';
import { useCallback, useState } from 'react';
import type { FC } from 'react';
import { isUndefined } from 'lodash';
import ColumnItem from './ColumnItem';
import type { EditColumns, DataSourceType } from './typed';
import { tableColumns } from './util';

const data = Array(500)
  .fill({})
  .map((item, idx) => ({
    ...item,
    id: idx,
  }));

const EditTable: FC = () => {
  const [dataSource] = useState<DataSourceType[]>(data);
  const onInputChange = useCallback((value, onRefresh: () => void, record: DataSourceType) => {
    // console.log('onInputChange---value', value);
    Object.assign(record, {
      storageId: value,
      realNumber: value,
    });
    onRefresh();
  }, []);
  const columns: EditColumns[] = columnsAssembling(tableColumns, {
    storageId: {
      render: (_, record, {onRefresh}) => {
        const {realNumber} = record;
        return <InputNumber
        value={realNumber}
        placeholder="请输入..."
        onChange={(value) => onInputChange(value, onRefresh, record)}
      />
      },
    },
    distanceNumber: {
      render: (_, { realNumber }) => {
        if (isUndefined(realNumber)) return '-';
        return realNumber;
      },
    },
  });
  // console.log('dataSource', dataSource);
  return (
    <PageContainer>
      <Card bodyStyle={{ padding: '0 24px' }}>
        <div className='ant-table ant-table-middle'>
          <div className='ant-table-container'>
            <div className='ant-table-content'>
              <table style={{tableLayout: 'auto'}}>
                <colgroup>
                  <col />
                </colgroup>
                <thead className='ant-table-thead'>
                  <tr>
                    {columns.map((item) => (
                      <th className='ant-table-cell' key={item.dataIndex as string}>{item.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className='ant-table-tbody'>
                  {dataSource.map((item, idx) => (
                    <ColumnItem columns={columns} index={idx + 1} key={item.id} record={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default EditTable;
