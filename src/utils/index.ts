import type { EditColumns } from '@/pages/EditTable/EditTable/typed';

export function columnsAssembling<T>(
  source: EditColumns<T>[],
  params: Record<string, EditColumns<T>>,
) {
  const columns: EditColumns<T>[] = source.map((item) => {
    if (!item.dataIndex || !params[item.dataIndex as string]) return item;
    const target = params[item.dataIndex as string];
    return {
      ...item,
      ...target,
    };
  });
  return columns;
}
