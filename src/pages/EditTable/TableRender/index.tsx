import { columnsAssembling } from '@/utils';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Input, InputNumber } from 'antd';
import { useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';
import { tableColumns } from '../util';
import { isNumber } from 'lodash';

const data = Array(300)
  .fill({})
  .map((item, idx) => ({
    ...item,
    id: idx,
  }));

type SetFn = Dispatch<SetStateAction<EditTableSource[]>>;

function onAddItem(setSource: SetFn) {
  setSource((state) => [...state, { id: Date.now() }]);
}

function onRemoveItem(id: number, setSource: SetFn) {
  setSource((state) => {
    const idx = state.findIndex((item) => item.id === id);
    state.splice(idx, 1);
    return [...state];
  });
}

function onChangeSource(
  { id, key, setSource }: { id: number; key: string; setSource: SetFn },
  event: number | React.ChangeEvent<HTMLInputElement>,
) {
  let value: string | number = '';
  if (isNumber(event)) {
    value = event;
  } else {
    value = event.target.value;
  }
  setSource((state) => {
    const idx = state.findIndex((item) => item.id === id);
    state.splice(idx, 1, {
      ...state[idx],
      [key]: value,
    });
    return [...state];
  });
}

const TableRender: FC = () => {
  const [source, setSource] = useState<EditTableSource[]>(data);
  const columns = columnsAssembling(tableColumns, {
    storageId: {
      render: (_, { id, storageId }) => (
        <InputNumber
          value={storageId}
          onChange={onChangeSource.bind(null, { id, setSource, key: 'storageId' })}
          placeholder="请输入..."
        />
      ),
    },
    skuName: {
      render: (_, { id, skuName }) => (
        <Input
          value={skuName}
          onChange={onChangeSource.bind(null, { id, setSource, key: 'skuName' })}
          placeholder="请输入..."
        />
      ),
    },
    area: {
      render: (_, { id, area }) => (
        <Input
          value={area}
          onChange={onChangeSource.bind(null, { id, setSource, key: 'area' })}
          placeholder="请输入..."
        />
      ),
    },
    location: {
      render: (_, { id, location }) => (
        <Input
          value={location}
          onChange={onChangeSource.bind(null, { id, setSource, key: 'location' })}
          placeholder="请输入..."
        />
      ),
    },
    realNumber: {
      render: (_, { id, realNumber }) => (
        <InputNumber
          value={realNumber}
          onChange={onChangeSource.bind(null, { id, setSource, key: 'realNumber' })}
          placeholder="请输入..."
        />
      ),
    },
    $RZ_Control: {
      render: (_, { id }) => (
        <Button
          data-id={id}
          onClick={onRemoveItem.bind(null, id, setSource)}
          type="link"
          size="small"
        >
          删除
        </Button>
      ),
    },
  });
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        columns={columns}
        search={false}
        options={false}
        dataSource={source}
        pagination={false}
        footer={() => (
          <Button onClick={onAddItem.bind(null, setSource)} type="link">
            新增
          </Button>
        )}
      />
    </PageContainer>
  );
};

export default TableRender;
