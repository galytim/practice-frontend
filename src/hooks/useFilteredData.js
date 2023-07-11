import { useMemo } from "react";

const useFilteredData = (data,searchQuery) =>{
    const filteredData = useMemo(() => {
        return data.filter((eqp) => eqp.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }, [searchQuery, data]);
      return filteredData
}

export default useFilteredData;