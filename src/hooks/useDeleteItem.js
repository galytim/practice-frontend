import { useState } from 'react';
import DataService from '../API/DataService';

const useDeleteItem = (dataSource, setDataSource,setDeletedIndex) => {
  

  const handleDelete = async (index) => {
    try {
      const deletedItem = dataSource[index];

      // Задержка в миллисекундах перед удалением
      const delay = 1000;

      // Устанавливаем индекс строки для удаления
      setDeletedIndex(index);

      // Ожидание заданной задержки
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Вызываем метод deleteItem из DataService для удаления элемента
      await DataService.deleteItem(deletedItem.id);

      // Создаем копию dataSource и удаляем соответствующий элемент
      const updatedDataSource = [...dataSource];
      updatedDataSource.splice(index, 1);

      // Обновляем состояние dataSource
      setDataSource(updatedDataSource);
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    } finally {
      // Сбрасываем индекс строки для удаления
      setDeletedIndex(null);
    }
  };

  return handleDelete;
};

export default useDeleteItem;
