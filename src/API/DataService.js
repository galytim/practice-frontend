import axios from "axios";
export default class DataService {
    static async getAll() {
      try {
        const response = await axios.get("http://127.0.0.1:3030/mainly_facilities");
        return response;
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        throw error;
      }
      
    }
    static getInitColums() {
        const columns = [
            {
              title: 'Наименование основного средства',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Код основного средства',
              dataIndex: 'code',
              key: 'code',
            },
            {
              title: 'Первоначальная стоимость',
              dataIndex: 'initCost',
              key: 'initCost',
            },
        
            {
              title: 'Дата начала эксплуатации',
              dataIndex: 'dateStartUsing',
              key: 'dateStartUsing',
            },
            {
              title: 'Дата выбытия',
              dataIndex: 'dateEndUsing',
              key: 'dateEndUsing',
            },
            {
              title: 'Код вида выбытия',
              dataIndex: 'codeEndUsing',
              key: 'codeEndUsing',
            },
            {
              title: 'Нормативный срок службы',
              dataIndex: 'regulatoryTermServices',
              key: 'regulatoryTermServices',
            },
            
        
          ];
          return columns;
        
      }
  }