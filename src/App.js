import React, { useState, useEffect, useMemo } from 'react';
import { Input } from 'antd';
import DataService from './API/DataService';
import TableComponent from './components/TableComponent';
import "./App.css"

function App() {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(DataService.getInitColums);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const searchedData = useMemo(() => {
    return dataSource.filter(eqp => eqp.name.includes(searchQuery));
  }, [searchQuery, dataSource]);

  const handleDelete = async (index) => {
    try {
      const deletedItem = dataSource[index];
      console.log(deletedItem.id)
      await DataService.deleteItem(deletedItem.id); 
      
      const updatedDataSource = [...dataSource];
      updatedDataSource.splice(index, 1);
      setDataSource(updatedDataSource);
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };
  

  return (
    <div className='App'>
      <Input
        style={{ width: 200 }}
        placeholder='Поиск'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <TableComponent
        dataSource={searchedData}
        setDataSource={setDataSource}
        columns={columns}
        setColumns={setColumns}
        isDataLoading={isDataLoading}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
