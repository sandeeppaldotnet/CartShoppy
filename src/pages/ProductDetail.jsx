// src/pages/ProductDetail.jsx (Improved)
import { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, Col, Row, Carousel, ListGroup } from 'react-bootstrap';
import { addToCart } from '../features/cart/cartSlice';
import { fetchProducts } from '../features/products/productsSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);
  const [mainImage, setMainImage] = useState('');
  
  const product = items.find(item => item.id === Number(id));

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
    if (product) setMainImage(product.thumbnail);
  }, [dispatch, items.length, product]);

  if (status === 'loading') return <Alert variant="info">Loading...</Alert>;
  if (!product) return <Alert variant="danger">Product not found</Alert>;

  return (
    <div className="product-detail-page py-5">
      <Row className="g-4">
        <Col lg={6}>
          <div className="sticky-top" style={{ top: '100px' }}>
            <Card.Img
              variant="top"
              src={mainImage}
              className="main-image rounded-3"
            />
            <div className="thumbnail-grid mt-3">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
        </Col>
        
        <Col lg={6}>
          <Card className="border-0">
            <Card.Body>
              <h1 className="mb-3">{product.title}</h1>
              <div className="d-flex align-items-center mb-4">
                <span className="h3 text-primary">${product.price}</span>
                <del className="text-muted ms-3">${(
                  product.price / (1 - product.discountPercentage/100)
                ).toFixed(2)}</del>
              </div>
              
              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item>
                  <strong>Brand:</strong> {product.brand}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Category:</strong> {product.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Stock:</strong> {product.stock} available
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Rating:</strong> {product.rating}/5
                </ListGroup.Item>
              </ListGroup>

              <p className="text-muted mb-4">{product.description}</p>

              <div className="d-flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  as={Link}
                  to="/cart"
                >
                  Buy Now
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;