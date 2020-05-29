import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductList from "../components/ProductList";

function filterProductList(filters, productList) {
    let updatedProductList = productList;
    filters.forEach(filter => {
        if (filter.key == 'regular_price') {

            updatedProductList = updatedProductList.filter(product => product.price.regular_price.value >= filter.value)
        }
        if (filter.key == 'brand') {
            updatedProductList = updatedProductList.filter(product => product.brand.name.matchAll(filter.value.toLowerCase()))
        }
        if (filter.key == 'stock_available') {
            updatedProductList = updatedProductList.filter(product => product.stock.available == filter.value)
        }
        if (filter.key == 'created_at') {
            updatedProductList = updatedProductList.filter(product => new Date(product.created_at) >= new Date(filter.value[0]) && new Date(product.created_at) <= new Date(filter.value[1]))
        }
    });
    return updatedProductList;
}

const ProductListPage = (props) => {
    const {filters} = props;
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8080/api/products', {
            "filters": []
        }).then((products) => {
            setProductList(products.data.data);
        })
    }, []);

    const filteredProductList = filterProductList(filters, productList);
    console.log(productList.length, filteredProductList.length);
    return (
        <div style={{padding: 10}}>
            <ProductList items={filteredProductList}/>
        </div>
    );
};

export default ProductListPage;
