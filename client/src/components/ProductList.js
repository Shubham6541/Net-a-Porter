import React, { useState, Suspense } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import BottomScrollListener from 'react-bottom-scroll-listener';
import PropTypes from 'prop-types';
import './components.css';

const ProductDetails = React.lazy(() => import(('./ProductDetails')));

const ProgressBar = () => <CircularProgress style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />;

// List of all product items
const ProductList = (props) => {
  const { items } = props;
  const [count, setCount] = useState(0);
  const handleOnDocumentBottom = () => {
    setCount((prevState) => prevState + 12);
  };
  return (
    <div>
      <Grid container spacing={2}>
        {items.slice(0, count + 12).map((item) => (
          <Grid item xs>
            <Suspense fallback={<ProgressBar />}>
              <ProductDetails info={item} />
            </Suspense>
          </Grid>
        ))}
      </Grid>
      <BottomScrollListener onBottom={handleOnDocumentBottom} />
      {(count < items.length) && <ProgressBar />}
    </div>
  );
};

ProductList.propTypes = {
    items: PropTypes.array
};
export default ProductList;
