// useActGeneration.js
import { useState } from 'react';

const useActGeneration = (dataSource, setDataSource, columns, setColumns) => {
  const [isActGenerated, setIsActGenerated] = useState(false);

  function calculate_residual_value(item) {
    const residual_value = item.initCost - item.accumulatedDepreciaton;
    return residual_value.toFixed(2);
  }

  function calculate_accumulated_depreciation(item) {
    const days_of_usage = (new Date(item.dateEndUsing) - new Date(item.dateStartUsing)) / (1000 * 60 * 60 * 24);
    const regulatory_term_years = item.regulatoryTermServices / 12;
    const accumulatedDepreciaton = (days_of_usage / 30) * (1 / regulatory_term_years) * item.initCost;
    return accumulatedDepreciaton.toFixed(2);
  }

  function generateAct() {
    if (!isActGenerated) {
      setColumns((prevColumns) => [
        ...prevColumns,
        {
          title: 'Накопленная амортизация',
          dataIndex: 'accumulatedDepreciaton',
          key: 'accumulatedDepreciaton',
        },
        {
          title: 'Остаточная стоимость',
          dataIndex: 'residualValue',
          key: 'residualValue',
        },
      ]);

      const updatedData = dataSource.map((item) => {
        const accumulatedDepreciaton = calculate_accumulated_depreciation(item);
        const residualValue = calculate_residual_value({
          ...item,
          accumulatedDepreciaton,
        });

        return {
          ...item,
          accumulatedDepreciaton,
          residualValue,
        };
      });

      setDataSource(updatedData);
      setIsActGenerated(true);
    }
  }

  return { generateAct, isActGenerated };
};

export default useActGeneration;
