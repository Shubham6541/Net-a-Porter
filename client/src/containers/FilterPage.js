import React, {useEffect, useState} from 'react';
import  {BooleanFilter, ComparableFilter, DateInRangeFilter, SearchableFilter} from "../components/Filter";
import {filterType} from "../constants/FiltersType";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
const defaultProps = {
    bgcolor: 'background.card',
    padding:1,
    borderColor: 'black',
    borderRadius:4,
};
const {useRef} = require("react");

const FilterPage = (props)   => {
    const {applyFilters} = props;
    const [filters, setFilters] = useState([]);
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        applyFilters(filters);
    }, [filters]);

    const handleFilter = async (newFilter) => {
        console.log(newFilter);
        let updatedFilters = filters.filter(filter => filter.key != newFilter.key);
        updatedFilters.push(newFilter);
        setFilters(updatedFilters);
    };

    const applyFilter = (filter) => {
        console.log(filter.key);

        switch (filter.type) {
            case "comparable":
                return <ComparableFilter filter={filter} addFilter={handleFilter}/>;
            case "searchable":
                return <SearchableFilter filter={filter} addFilter={handleFilter}/>;
            case "boolean":
                return <BooleanFilter filter={filter} addFilter={handleFilter}/>;
            case "dateInRange":
                return <DateInRangeFilter filter={filter} addFilter={handleFilter}/>;
        }
    };
    return (
        <div >

            <Card style={{marginTop:10,marginBottom:20,padding:10,backgroundColor:'#f1fff1'}}>
                <Box border={1} {...defaultProps} >
            <div >
                <Typography variant="h5" style={{marginLeft:"auto",marginRight:"auto",display:"block",borderBottom: "0.05em solid black"
                    ,padding: "1em" }}>
                    Filters
                </Typography>
                {filterType.map((filter) => applyFilter(filter)
                )}

            </div>
                </Box>
            </Card>
        </div>
    );
};

export default FilterPage;
