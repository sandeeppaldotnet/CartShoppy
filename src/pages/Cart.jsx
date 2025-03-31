// src/pages/Cart.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, ListGroup, Image, Form, Alert,Container } from 'react-bootstrap';
import { 
  addToCart, 
  removeFromCart, 
  incrementQuantity,
  decrementQuantity,
  clearCart
} from '../features/cart/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.stock) {
      alert(`Only ${item.stock} items available in stock`);
      return;
    }
    dispatch(incrementQuantity({ id: item.id, quantity: newQuantity }));
  };

  return (
    <div className="cart-page py-5">
      <Container>
        <h2 className="mb-4">Shopping Cart ({items.length} items)</h2>
        
        {items.length === 0 ? (
          <div className="text-center py-5">
            <Alert variant="info" className="mb-4">
              Your cart is empty
            </Alert>
            <Button as={Link} to="/products" variant="primary">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={8}>
              <Card className="shadow-sm">
                <ListGroup variant="flush">
                  {items.map(item => (
                    <ListGroup.Item key={item.id}>
                      <Row className="align-items-center">
                        <Col md={2}>
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fluid
                            className="cart-item-image"
                          />
                        </Col>
                        <Col md={4}>
                          <h5 className="mb-1">{item.title}</h5>
                          <p className="text-muted mb-0">{item.brand}</p>
                        </Col>
                        <Col md={3}>
                          <div className="d-flex align-items-center quantity-controls">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => dispatch(decrementQuantity(item.id))}
                              disabled={item.quantity === 1}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <Form.Control
                              type="number"
                              value={item.quantity}
                              min="1"
                              className="text-center mx-2"
                              style={{ width: '60px' }}
                              onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                            />
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => dispatch(incrementQuantity(item.id))}
                              disabled={item.quantity >= item.stock}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </div>
                        </Col>
                        <Col md={2} className="text-end">
                          <h5 className="mb-0">${(item.price * item.quantity).toFixed(2)}</h5>
                          <small className="text-muted">${item.price} each</small>
                        </Col>
                        <Col md={1} className="text-end">
                          <Button
                            variant="link"
                            className="text-danger"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
              
              <div className="mt-3 text-end">
                <Button
                  variant="outline-danger"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </div>
            </Col>

            <Col lg={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h4 className="mb-4">Order Summary</h4>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Subtotal ({items.length} items)</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Shipping</span>
                      <span className="text-success">Free</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between fw-bold">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </ListGroup.Item>
                  </ListGroup>
                  
                  <div className="d-grid gap-2 mt-4">
                    <Button 
                      as={Link} 
                      to="/checkout" 
                      variant="primary" 
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button 
                      as={Link} 
                      to="/products" 
                      variant="outline-primary" 
                      size="lg"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;