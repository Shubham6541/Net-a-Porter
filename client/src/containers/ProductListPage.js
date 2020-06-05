import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProductList from '../components/ProductList';

const comparable = (product) => product.price.regular_price.value;
const searchable = (product) => product.brand.name;
const boolean = (product) => product.stock.available;
const dateInRange = (product) => product.created_at;

// Filtering of items based on available filters
function filterProductList(filters, productList) {
  let updatedProductList = productList;
  updatedProductList && updatedProductList.length !== 0 && filters.forEach((filter) => {
    if (filter.key === 'regular_price') {
      updatedProductList = updatedProductList.filter((product) => {
        if (filter.value > 0 && filter.operator === 'greater_than') {
          return comparable(product) > filter.value;
        } if (filter.value > 0 && filter.operator === 'smaller_than') {
          return product.price.regular_price.value < filter.value;
        } if (filter.value > 0 && filter.operator === 'equals') {
          return product.price.regular_price.value === filter.value;
        }
        return true;
      });
    }
    if (filter.key === 'brand') {
      updatedProductList = updatedProductList.filter((product) => searchable(product).match(filter.value.toLowerCase()));
    }
    if (filter.key === 'stock_available') {
      updatedProductList = updatedProductList.filter((product) => boolean(product) === filter.value);
    }
    if (filter.key === 'created_at') {
      updatedProductList = updatedProductList.filter((product) => new Date(dateInRange(product)) >= new Date(filter.value[0]) && new Date(dateInRange(product)) <= new Date(filter.value[1]));
    }
  });
  return updatedProductList;
}

// Logic part for display of products
const ProductListPage = (props) => {
  const { filters } = props;
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.post('/api/products', {
      filters: []
    }).then((products) => {
      setProductList(products.data.data);
    });
  }, []);

  const filteredProductList = filterProductList(filters, productList);
  return (
    <div style={{ padding: 10 }}>
      {filteredProductList && <ProductList items={filteredProductList} />}
    </div>
  );
};

ProductListPage.propTypes = {
  filters: PropTypes.array
};

export default ProductListPage;
