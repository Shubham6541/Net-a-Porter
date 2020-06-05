import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { filterType } from '../constants/FiltersType';
import {
  BooleanFilter, ComparableFilter, DateInRangeFilter, SearchableFilter
} from '../components/Filter';

const defaultProps = {
  bgcolor: 'background.card',
  padding: 1,
  borderColor: 'black',
  borderRadius: 4
};
const { useRef } = require('react');

// Logic for UI for filters
const FilterPage = (props) => {
  const [filters, setFilters] = useState([]);
  const isFirstRun = useRef(true);

  // Combination of filters
  const handleFilter = async (newFilter) => {
    const updatedFilters = filters.filter((filter) => filter.key !== newFilter.key);
    updatedFilters.push(newFilter);
    setFilters(updatedFilters);
  };

  // Filter selection based on type provided in Filter Constants
  const applyFilter = (filter) => {
    switch (filter.type) {
      case 'comparable':
        return <ComparableFilter filter={filter} addFilter={handleFilter} />;
      case 'searchable':
        return <SearchableFilter filter={filter} addFilter={handleFilter} />;
      case 'boolean':
        return <BooleanFilter filter={filter} addFilter={handleFilter} />;
      case 'dateInRange':
        return <DateInRangeFilter filter={filter} addFilter={handleFilter} />;
      default:
    }
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    // eslint-disable-next-line
    props.applyFilters(filters);

  }, [filters]);

  return (
    <div>
      <Card style={{
        marginTop: 10, marginBottom: 20, padding: 10, backgroundColor: '#f1fff1'
      }}
      >
        <Box border={1} {...defaultProps}>
          <div>
            <Typography
              variant="h5"
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
                borderBottom: '0.05em solid black',
                padding: '1em'
              }}
            >
              Filters
            </Typography>
            {filterType.map((filter) => applyFilter(filter))}
          </div>
        </Box>
      </Card>
    </div>
  );
};

FilterPage.propTypes = {
  applyFilters: PropTypes.func
};
export default FilterPage;
