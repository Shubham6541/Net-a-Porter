import React, {Suspense, useState} from 'react';
import './App.css';
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header";
import FilterPage from "./containers/FilterPage";
const ProductListPage  = React.lazy(()=>import('./containers/ProductListPage'));

function App() {
    const [filters,setFilters] = useState();
    const handleApplyFilter=(filters)=>{
        setFilters(filters);
    };
    return (
        <div>
            <Header/>
            <Grid container spacing={1} style={{marginTop:25}}>
                <Grid item xs style={{minWidth:210}}>
                    <FilterPage applyFilters={handleApplyFilter}/>
                </Grid>
                    <Grid item xs={9} >
                    <Suspense fallback={<div>Loading...</div>}>
                    <ProductListPage filters={filters}/>
                    </Suspense>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
