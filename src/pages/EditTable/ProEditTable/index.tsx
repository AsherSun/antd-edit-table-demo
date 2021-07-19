import { columnsAssembling } from '@/utils';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import { Form, InputNumber } from 'antd';
import { useState } from 'react';
import type { FC } from 'react';
import { tableColumns } from '../util';
// import { isNumber } from 'lodash';

const data = Array(30)
  .fill({})
  .map((item, idx) => ({
    ...item,
    id: idx,
  }));
const ProEditTable: FC = () => {
  const [source, setSource] = useState<EditTableSource[]>(data);
  const [form] = Form.useForm();
  const columns = columnsAssembling(tableColumns, {
    storageId: {
      formItemProps: {
        rules: [{ required: true, message: '此项是必填项' }],
      },
    },
    skuName: {
      formItemProps: {
        rules: [{ required: true, message: '此项是必填项' }],
      },
    },
    area: {
      formItemProps: {
        rules: [{ required: true, message: '此项是必填项' }],
      },
    },
    location: {
      formItemProps: {
        rules: [{ required: true, message: '此项是必填项' }],
      },
    },
    realNumber: {
      formItemProps: {
        rules: [{ required: true, message: '此项是必填项' }],
      },
    },
    distanceNumber: {
      renderFormItem() {
        // const realNumber = form.getFieldValue('realNumber');
        // console.log('realNumber', realNumber)
        return <InputNumber />;
      },
    },
  });
  return (
    <PageContainer>
      <EditableProTable
        columns={columns}
        rowKey="id"
        value={source}
        onChange={setSource}
        editable={{
          type: 'multiple',
          form,
        }}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
      />
    </PageContainer>
  );
};

export default ProEditTable;
