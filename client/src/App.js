import React, { Suspense, useState } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import FilterPage from './containers/FilterPage';

const ProductListPage = React.lazy(() => import('./containers/ProductListPage'));

function App() {
  const [filters, setFilters] = useState();
  const handleApplyFilter = (filters) => {
    setFilters(filters);
  };
  return (
    <div className="App">
      <Header />
      <Grid container spacing={1} style={{ marginTop: 75 }}>
        <Grid item xs sm={3} md={3} className="sidebar">
          <FilterPage applyFilters={handleApplyFilter} />
        </Grid>
        <Grid item xs={12} sm={8} md={9} className="main" style={{ float: 'right' }} justify="center">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductListPage filters={filters} />
          </Suspense>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
