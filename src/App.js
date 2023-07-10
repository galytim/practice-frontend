import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import DataService from './API/DataService';
import TableComponent from './components/TableComponent';
import './App.css';
import useFilteredData from './hooks/useFilteredData';
import useDeleteItem from './hooks/useDeleteItem';

function App() {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(DataService.getInitColums());
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletedIndex, setDeletedIndex] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      const response = await DataService.getAll();
      setDataSource(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const filteredData = useFilteredData(dataSource, searchQuery);
  const handleDelete = useDeleteItem(dataSource, setDataSource, setDeletedIndex);


  return (
    <div className='App'>
      <Input
        style={{ width: 200 }}
        placeholder='Поиск'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TableComponent
        dataSource={filteredData}
        setDataSource={setDataSource}
        columns={columns}
        setColumns={setColumns}
        isDataLoading={isDataLoading}
        handleDelete ={handleDelete}
        deletedIndex={deletedIndex}
      />
    </div>
  );
}

export default App;
