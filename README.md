# React + Vite

# 🛒 CartShoppy - React E-Commerce Demo

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

A sleek single-page e-commerce demo built with React and React Bootstrap, showcasing product browsing by categories.

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-Click_Here-2EA44F?style=for-the-badge)](https://cartshoppy.netlify.app/)



## ✨ Key Features

- **Single-File Architecture** - All logic in `Home.jsx` for easy understanding
- **Real API Data** - Powered by DummyJSON products API
- **Responsive Categories** - 5 popular product categories
- **Product Previews** - 4 featured products per category
- **Modern UI** - Clean cards with hover effects

## 🛠️ Tech Stack

- **Frontend**: React 18 + React Router
- **Styling**: React Bootstrap (with custom CSS)
- **API**: [DummyJSON](https://dummyjson.com/docs/products)
- **Hosting**: Netlify

## 📦 How It Works

This single-file implementation demonstrates:
```javascript
// 1. Fetches categories from DummyJSON API
const categoriesRes = await fetch('https://dummyjson.com/products/categories');

// 2. Displays products for each category
const productsRes = await fetch(
  `https://dummyjson.com/products/category/${category}?limit=4`
);

// 3. Responsive grid layout using React Bootstrap
<Row className="g-4">
  {products.map((product) => (
    <Col key={product.id} xl={3} lg={4} md={6}>
      {/* Product Card */}
    </Col>
  ))}
</Row>

Key features of this README:
1. Highlights your live Netlify URL prominently
2. Clearly states the single-file architecture
3. Shows actual code snippets used in your implementation
4. Minimal setup requirements
5. Mobile-responsive badge styling

To complete it:
1. Add a screenshot named `screenshot.png` in your `/public` folder
2. Update the feature list if you want to highlight specific UI elements
3. Consider adding a "Future Improvements" section if you plan to expand it
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
