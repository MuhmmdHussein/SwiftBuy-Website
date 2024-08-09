import React, { useState, useEffect } from 'react';
import Product from '../Components/ProductItem';
import axios from 'axios';

function ListProduct() {
  const [productData, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);



  useEffect(() => {
    axios
      .get('https://api.escuelajs.co/api/v1/products')
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const totalPages = Math.ceil(productData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = productData.slice(startIndex, endIndex);





  // ===================== States for filters ===========================
  const [title, setTitle] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch products with filters
    let url = 'https://api.escuelajs.co/api/v1/products?';
    if (title) url += `title=${title}&`;
    if (minPrice) url += `price_min=${minPrice}&`;
    if (maxPrice) url += `price_max=${maxPrice}&`;
    if (category) url += `categoryId=${category}&`;

    axios
      .get(url)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, [title, minPrice, maxPrice, category]);

  useEffect(() => {
    // Fetch categories for the dropdown
    axios
      .get('https://api.escuelajs.co/api/v1/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);




  return (
    <div className="flex">
      {/* Product List */}
      <div className="w-3/4 p-4">
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
    <div>
      <div className="flex flex-wrap justify-center">
        {currentPageItems.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </div>

      {/* Filter Section */}
      <div className="w-1/4 p-4 bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4"></h2>
          <div className="mb-2">
            <label className="block text-sm mb-1">Search :</label>
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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProduct;