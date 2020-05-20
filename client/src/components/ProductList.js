import React from 'react';
import ProductDetails from "./ProductDetails";
import Grid from "@material-ui/core/Grid";



const ProductList = (props) => {
    const info = {
        name:'Feather-embellished silk-twill robe',
        url:'http://cache.net-a-porter.com/images/products/1000954/1000954_in_pp.jpg'
    };
    return (
        <div><h1>No</h1>
            <Grid container spacing={3} >
                <ProductDetails info={info}/>
                <ProductDetails info={info}/>
                <ProductDetails info={info}/>
                <ProductDetails info={info}/>
                <ProductDetails info={info}/>
                <ProductDetails info={info}/>
            </Grid>

        </div>
    );
};

export default ProductList;