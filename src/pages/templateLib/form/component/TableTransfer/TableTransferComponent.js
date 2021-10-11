
import React from 'react';
import { Transfer, Table } from 'antd';
import difference from 'lodash/difference';
import styles from './index.less';

const TableTransferComponent = ({ transferLoading, leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false} className={styles.transferTitle}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        // table属性
        const columns = direction === 'left' ? leftColumns : rightColumns;
        const rowSelection = {
          getCheckboxProps: () => ({ disabled: listDisabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows.map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            loading={transferLoading}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );

  export default TableTransferComponent;
