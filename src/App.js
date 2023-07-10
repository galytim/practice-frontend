import { Button,Table } from 'antd';
import DataService from './API/DataService';
import { useEffect, useState } from 'react';
import Loader from './components/UI/Loader/Loader';
import useActGeneration from './hooks/useActGeneration';
import "./App.css"

function App() {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(DataService.getInitColums);
  const [isDataLoading, setIsDataLoadind] = useState(false);
  
  const { generateAct, isActGenerated } = useActGeneration(dataSource, setDataSource, columns, setColumns);

  async function fetchData() {
    setIsDataLoadind(true);
    setTimeout(async () => {
      const response = await DataService.getAll();
      setDataSource(response.data);
      setIsDataLoadind(false);
    }, 1000);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='App'>
      
      {isDataLoading ? (
        <div className='load'
        >
          <Loader />
        </div>
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
      <Button style={{color: "#1677ff"}} onClick={generateAct} disabled={isActGenerated}>
        Получить акт выбытия
      </Button>
    </div>
  );
}

export default App;
