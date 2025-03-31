import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]); // Store categories
  const [productsByCategory, setProductsByCategory] = useState({}); // Store products by category
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch categories
        const categoriesRes = await fetch('https://dummyjson.com/products/categories');
        if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesRes.json();

        // Fetch products for each category
        const productsMap = {};
        const categoriesToShow = categoriesData.slice(0, 5); // Limiting to 5 categories
        
        console.info("cat="+ categoriesData);

        for (const category of categoriesToShow) {
          console.info(category);
          const res = await fetch(`https://dummyjson.com/products/category/${category.slug}?limit=4`);
          console.info(res);
          if (!res.ok) throw new Error(`Failed to fetch products for ${category}`);
          const data = await res.json();
          console.info(data);
          productsMap[category.slug] = data.products; // Store products for each category
        }
        
        setCategories(categoriesToShow);
        setProductsByCategory(productsMap);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format category names for display (capitalizes first letter of each word and replaces hyphens with spaces)
  const formatCategoryName = (category) => {
    return String(category)
      .replace(/-/g, ' ')  // Replace hyphens with spaces
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize the first letter of each word
  };

  if (isLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <div className="hero-banner text-white" style={{
        background: `conic-gradient(from 135deg, #9b59b6 0%, #3498db 100%)`}}>
        <Container className="text-center">
          <h1 className="display-4 mb-4 fw-bold">Welcome to E-Shop</h1>
          <p className="lead mb-4 fs-3">Discover Amazing Products at Great Prices</p>
          <Button as={Link} to="/products" variant="light" size="lg" className="rounded-pill px-4">
            Shop Now
          </Button>
        </Container>
      </div>

      {/* Categories Section */}
      <Container className="my-5">
        <h2 className="text-center mb-5 fw-bold">Popular Categories</h2>
        <Row className="g-4">
          {categories.map((category, index) => (
            <Col key={category + index} md={3} sm={6}> {/* Use category + index to ensure uniqueness */}
              <Card className="h-100 shadow-sm category-card">
                <Card.Body className="text-center">
                  {/* Display category name */}
                  <h3 className="h5">{formatCategoryName(category.name)}</h3>
                  <Button 
                    as={Link} 
                    to={`/products?category=${category.name}`} 
                    variant="outline-primary" 
                    size="sm"
                    className="mt-2"
                  >
                    View All
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Products by Category */}
      {Object.entries(productsByCategory).map(([category, products]) => (
        <Container key={category} className="my-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">{formatCategoryName(category)}</h3>
            <Button as={Link} to={`/products?category=${category}`} variant="link">
              See More →
            </Button>
          </div>
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} xl={3} lg={4} md={6}> {/* Use product.id as key */}
                <Card className="h-100 product-card shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={product.thumbnail} 
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                      {/* Display product price */}
                      <span className="h5 text-primary">${product.price}</span>
                      <Button 
                        as={Link} 
                        to={`/products/${product.id}`} 
                        variant="primary" 
                        size="sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default Home;
