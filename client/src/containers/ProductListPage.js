import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductList from "../components/ProductList";

const ProductListPage = (props) => {
    const {filters} = props;
    const [productList, setProductList] = useState([]);
console.log(filters);

    useEffect((filters) => {
        async function fetchData() {
            const response = await axios.post('http://localhost:3000/api/products', {
                "filters":[]
            });
            return response;
        };
        fetchData().then((products) => {
            console.log(products.data.data);
            setProductList(products.data.data);
        });
    }, []);
    let updatedProductList = productList;
    filters.forEach(filter=>{
        if(filter.key == 'regular_price'){
            updatedProductList = updatedProductList.filter(product=>product.price.regular_price == filter.value)
        }
        if(filter.key == 'brand'){
            updatedProductList = updatedProductList.filter(product => product.brand.name.startsWith(filter.value))
        }
        if(filter.key == 'stock_available'){
            updatedProductList = updatedProductList.filter(product=>product.stock.available == filter.value)
        }
        if(filter.key == 'created_at1'){
            updatedProductList =  updatedProductList.filter(product=> product.created_at >= filter.value[0] && product.created_at<=filter.value[1])
        }
    });
    console.log(updatedProductList.length,"here ia m",productList.length);
    return (
        <div style={{padding: 10, display:"block",marginLeft:"auto", marginRight:"auto"}}>
            <ProductList items={updatedProductList}/>
        </div>
    );
};

export default ProductListPage;
