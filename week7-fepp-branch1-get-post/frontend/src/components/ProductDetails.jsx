import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const ProductDetail = ({ refreshProducts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details. Please try again.');
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        refreshProducts();
        navigate('/');
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

  if (!product) {
    return <div className="alert alert-warning">Product not found</div>;
  }

  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-4">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              className="img-fluid rounded-start" 
              alt={product.name}
              style={{ height: "100%", objectFit: "cover" }}
              onError={(e) => {e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'}}
            />
          ) : (
            <img 
              src="https://via.placeholder.com/400x400?text=No+Image" 
              className="img-fluid rounded-start" 
              alt="No image available"
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h1 className="card-title">{product.name}</h1>
            <p className="card-text fs-4 text-primary">${product.price.toFixed(2)}</p>
            <p className="card-text">{product.description}</p>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <p><strong>Category:</strong> {product.category}</p>
                <p>
                  <strong>Stock Status:</strong>{' '}
                  {product.inStock ? (
                    <span className="text-success">In Stock ({product.quantity} available)</span>
                  ) : (
                    <span className="text-danger">Out of Stock</span>
                  )}
                </p>
              </div>
              <div className="col-md-6">
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <strong>Tags:</strong><br/>
                    {product.tags.map(tag => (
                      <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                    ))}
                  </div>
                )}
                {product.ratings && (
                  <p className="mt-2">
                    <strong>Rating:</strong>{' '}
                    {product.ratings.average.toFixed(1)} ({product.ratings.count} reviews)
                  </p>
                )}
              </div>
            </div>
            
            <p className="card-text">
              <small className="text-muted">
                Created: {new Date(product.createdAt).toLocaleDateString()}<br/>
                Last Updated: {new Date(product.updatedAt).toLocaleDateString()}
              </small>
            </p>
            
            <div className="d-flex gap-2 mt-4">
              <Link to="/" className="btn btn-secondary">
                Back to Products
              </Link>
              <Link to={`/edit-product/${product._id}`} className="btn btn-warning">
                Edit Product
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;