import React, { useState, useEffect } from 'react';
import { Input, Select } from 'antd';
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

  const [sort,setSort] = useState("name");

  const compareEquipmentNames = (nameA, nameB) => {
    const regex = /(\d+)/g; // Регулярное выражение для поиска чисел в строке
  
    const numbersA = nameA.match(regex).map(Number);
    const numbersB = nameB.match(regex).map(Number);
  
    // Сравниваем числа поэлементно
    for (let i = 0; i < Math.min(numbersA.length, numbersB.length); i++) {
      if (numbersA[i] < numbersB[i]) {
        return -1;
      }
      if (numbersA[i] > numbersB[i]) {
        return 1;
      }
    }
  
    // Если все числа совпадают, сравниваем оставшиеся части строк
    return nameA.localeCompare(nameB);
  };
  const handleChange = (value) => {
    setSort(value);
    setDataSource([...dataSource].sort((a, b) => {
      const valueA = a[value];
      const valueB = b[value];
  
      if (typeof valueA === 'string' && typeof valueB === 'string') {
         return compareEquipmentNames(valueA, valueB);
      }
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return compareNumbers(valueA, valueB);
      }
      if (valueA instanceof Date && valueB instanceof Date) {
        return valueA.getTime() - valueB.getTime();
      }
  
      // Если типы не совпадают или не поддерживаются для сортировки,
      // используем лексикографическое сравнение значений в виде строк
      return String(valueA).localeCompare(String(valueB));
    }));
    console.log(value);
  };
  const compareNumbers = (a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };


  return (
    <div className='App'>
      <Input
        style={{ width: 200 }}
        placeholder='Поиск'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Select
        value={sort}
        style={{ width: 300}}
        onChange={handleChange}
        options={[
          { value: 'name', label: 'Наименование основного средства' },
          { value: 'code', label: 'Код основного средства' },
          { value: 'initCost', label: 'Первоначальная стоимость' },
          {value: 'dateStartUsing', label: 'Дата начала эксплуатации' },
          { value: 'dateEndUsing', label: 'Дата выбытия' },
          { value: 'codeEndUsing', label: 'Код вида выбытия' },
          { value: 'regulatoryTermServices', label: 'Нормативный срок службы' },
        ]}
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
