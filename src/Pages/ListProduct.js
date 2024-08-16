import React, { useState, useEffect } from 'react';
import Product from '../Components/ProductItem';
import axios from 'axios';

function ListProduct() {
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for filters
  const [title, setTitle] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProductData(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = productData;

    if (title) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  }, [title, minPrice, maxPrice, category, productData]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredProducts.slice(startIndex, endIndex);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Filter Section */}
      <div className="w-full lg:w-80 p-4 bg-gray-100 lg:bg-transparent lg:border-l lg:border-gray-200 lg:shadow-md lg:rounded-lg lg:ml-4 mb-4 lg:mb-0">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Search</h2>
          <div className="mb-2">
            <label className="block text-sm mb-1">Search:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Price Min:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Price Max:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select a category</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelry</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 p-4 lg:pr-4 lg:w-3/4 ">
        {currentPageItems.length > 0 ? (
          <>
            <div className="flex flex-wrap mb-4">
              {currentPageItems.map((product) => (
                <Product {...product} key={product.id} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-2 mb-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array(totalPages).fill(0).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`py-1 px-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            <p>No products found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListProduct;
