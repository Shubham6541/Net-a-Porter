import React, {useEffect, useState} from 'react';
import Filter from "../components/Filter";

const FilterPage = (props) => {
    const {applyFilters} = props;
    const [filters, setFilters] = useState([]);
    useEffect(() => {
        console.log(filters)
        applyFilters(filters);
    }, [filters]);

    const handleAddFilter = async (newFilter) => {
        let updatedFilters = filters.filter(filter => filter.key != newFilter.key);
        updatedFilters.push(newFilter);
        setFilters(updatedFilters);
    };

    return (
        <div style={{margin: "auto", padding: 20}}>
            <Filter addFilter={handleAddFilter}/>
        </div>
    );
};

export default FilterPage;
