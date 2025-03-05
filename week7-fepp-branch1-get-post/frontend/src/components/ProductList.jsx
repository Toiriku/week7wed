import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const ProductList = ({ refreshTrigger }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
      } catch (err) {
        setError('Failed to delete product. Please try again.');
        console.error('Error deleting product:', err);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
        <Link to="/add-product" className="btn btn-primary">
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-info">No products found. Add your first product!</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map(product => (
            <div className="col" key={product._id}>
              <div className="card h-100">
                {product.imageUrl && (
                  <img 
                    src={product.imageUrl} 
                    className="card-img-top" 
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'}}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-truncate">{product.description}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.price.toFixed(2)}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    <Link to={`/products/${product._id}`} className="btn btn-info">
                      View
                    </Link>
                    <Link to={`/edit-product/${product._id}`} className="btn btn-warning">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(product._id)} 
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    {product.inStock ? (
                      <span className="text-success">In Stock ({product.quantity})</span>
                    ) : (
                      <span className="text-danger">Out of Stock</span>
                    )}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;