import { useMemo } from "react";

const useFilteredData = (data,searchQuery) =>{
    const filteredData = useMemo(() => {
        return data.filter((eqp) => eqp.name.includes(searchQuery));
      }, [searchQuery, data]);
      return filteredData
}

export default useFilteredData;