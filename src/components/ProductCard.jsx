// src/components/ProductCard.jsx (Improved)
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <Card className="h-100 shadow-sm border-0 product-card">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.thumbnail}
          className="product-image"
          alt={product.title}
        />
        <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
          -{product.discountPercentage}%
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small">{product.brand}</span>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faStar} className="text-warning me-1" />
            <span>{product.rating}</span>
          </div>
        </div>
        <Card.Title className="h6 mb-3">{product.title}</Card.Title>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-primary mb-0">${product.price}</h5>
            <span className="text-success small">
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <div className="d-grid gap-2">
            <Button 
              as={Link}
              to={`/products/${product.id}`}
              variant="outline-primary"
              size="sm"
            >
              Quick View
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => dispatch(addToCart(product))}
              disabled={product.stock === 0}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}