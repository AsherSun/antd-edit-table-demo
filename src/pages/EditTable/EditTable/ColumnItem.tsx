import { Input, InputNumber } from 'antd';
import { isArray, isFunction, isObject, isUndefined } from 'lodash';
import { useCallback, useState } from 'react';
import type { FC } from 'react';
import type { EditColumns, DataSourceType } from './typed';
import { childrenWithProps } from './util';

interface PropsType {
  index: number;
  columns?: EditColumns[];
  record?: DataSourceType;
}

const ColumnItem: FC<PropsType> = ({ index, columns, record }) => {
  const [, setRefresh] = useState<string>();

  const onRefresh = useCallback(() => {
    setRefresh(`${Math.random()}-${Date.now()}`);
  }, []);

  const onInputChange = useCallback(
    (key: string, value: string | number) => {
      if (isUndefined(record)) return;
      Object.assign(record, {
        [key]: value,
      });
      onRefresh();
    },
    [record, onRefresh],
  );

  const onRenderChange = useCallback((key: string, event: any, renderDom) => {
    if (!isArray(renderDom) && renderDom.props && isFunction(renderDom.props.onChange)) {
      renderDom.props.onChange(event);
      return;
    }
    if (isObject(event) && (event as any).target) {
      const {target: {value}} = event as any;
      Object.assign(record, {
        [key]: value,
      });
    } else {
      Object.assign(record, {
        [key]: event,
      });
    }
    onRefresh();
  }, [onRefresh, record]);

  if (!isArray(columns) || !isObject(record)) return <tr></tr>;
  return (
    <tr>
      {columns.map((item) => {
        const { dataIndex } = item;
        if (!dataIndex) return null;
        if (isFunction(item.render)) {
          const renderDom = item.render(record && record[dataIndex], record!, { onRefresh });
          return (
            <td key={dataIndex} className='ant-table-cell'>
              {childrenWithProps(renderDom, {
                onChange: (value: any) => onRenderChange(dataIndex, value, renderDom)
              })}
            </td>
          );
        }
        if (item.valueType === 'index') {
          return <td className='ant-table-cell' key={dataIndex}>
            <div className='ant-pro-field-index-column'>{index}</div>
          </td>;
        }
        if (item.valueType === 'digit') {
          return (
            <td className='ant-table-cell' key={dataIndex}>
              <InputNumber
                placeholder="请输入"
                value={record![dataIndex]}
                onChange={(value) => onInputChange(dataIndex, value)}
              />
            </td>
          );
        }
        if (item.valueType === 'text') {
          return (
            <td className='ant-table-cell' key={dataIndex}>
              <Input
                placeholder="请输入"
                value={record![dataIndex]}
                onChange={({ target: { value } }) => onInputChange(dataIndex, value)}
              />
            </td>
          );
        }
        if (record) {
          return <td className='ant-table-cell' key={dataIndex}>{record[dataIndex]}</td>;
        }
        return <td className='ant-table-cell'>-</td>;
      })}
    </tr>
  );
};

export default ColumnItem;
