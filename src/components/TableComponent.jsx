import React from 'react';
import { Button, Table } from 'antd';
import useActGeneration from '../hooks/useActGeneration';
import Loader from '../components/UI/Loader/Loader';

function TableComponent({ dataSource, setDataSource, columns, setColumns, isDataLoading, handleDelete, deletedIndex }) {
  const { generateAct, isActGenerated } = useActGeneration(
    dataSource,
    setDataSource,
    columns,
    setColumns
  );

  const columnsWithDelete = [
    ...columns,
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record, index) => (
        <Button type="link"  danger onClick={() => handleDelete(index)}>
          Удалить
        </Button>

      ),
    },
  ];

  return (
    <div className='App'>
      {isDataLoading ? (
        <div className='load'>
          <Loader />
        </div>
      ) : (
        <Table
          style={{ marginTop: 20 }}
          dataSource={dataSource}
          columns={columnsWithDelete}
          rowClassName={(record, index) => (index === deletedIndex ? 'table-row-fade fade-out' : 'table-row-fade')}
        />
      )}
      <Button
        style={{ color: '#1677ff' }}
        onClick={generateAct}
        disabled={isActGenerated}
      >
        Получить акт выбытия
      </Button>
    </div>
  );
}

export default TableComponent;
