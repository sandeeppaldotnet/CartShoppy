import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (status === 'failed') {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {items.map(product => (
        <Col key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}