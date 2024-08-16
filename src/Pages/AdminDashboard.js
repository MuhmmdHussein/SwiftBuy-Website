
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Components/BreadCrump';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

function AdminDashboard() {
    const [productId, setProductId] = useState('');
    const [product, setProduct] = useState(null);
    const {t} =useTranslation();
  const rtl = i18n.language === "ar";
    const [updatedProduct, setUpdatedProduct] = useState({
        title: '',
        price: 0,
        image: ''
    });
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: 0,
        description: '',
        category:'' ,
        image: ''
    });
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showGetForm, setShowGetForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showAlert,setShowAlert] = useState(false);
    const [confirmDelet, setConfirmDelet] = useState(false);

    const handleGetProduct = () => {
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleUpdateProduct = () => {
        if (updatedProduct.title !== '' && updatedProduct.price !== 0 && updatedProduct.image !== '') {
          axios.put(`https://fakestoreapi.com/products/${productId}`, updatedProduct)
            .then(response => {
              setProduct(response.data);
              setUpdatedProduct({
                title: '',
                price: 0,
                image: ''
              });
              setShowAlert(true);
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          console.log('Please fill in all fields');
        }
      };

    const handleDeleteProduct = () => {
        axios.delete(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                setProduct(null);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleAddProduct = () => {
        if (
          newProduct.title !== '' &&
          newProduct.price !== 0 &&
          newProduct.description !== '' &&
          newProduct.category !== '' &&
          newProduct.image !== ''
        ) {
          axios.post('https://fakestoreapi.com/products', newProduct)
            .then(response => {
              setNewProduct({
                title: '',
                price: 0,
                image: '',
                description: '',
                category: "",
              });
              setShowAlert(true);
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          console.log('Please fill in all fields');
        }
      };

    let imageUrl = "";
    if (product && product.images) {
        imageUrl = product.images[0].replace(/[\[\]""]/g, '');
    }
    useEffect(() => {
        if (showAlert) {
          setTimeout(() => {
            setShowAlert(false);
          }, 3000); 
        }
      }, [showAlert]);

    return (
        <>
            <Breadcrumb />
            <div className="flex h-screen flex-row justify-center">
                <div className="w-64 bg-gray-500 p-4 shadow-md">
                    <h2 className="text-2xl font-bold mb-2 mt-2">{t('Admin Dashboard')}</h2>
                    <ul>
                        <li>
                            <Link
                                to="#"
                                onClick={() => {
                                    setShowCreateForm(true);
                                    setShowGetForm(false);
                                    setShowDeleteForm(false);
                                    setShowUpdateForm(false);
                                }}
                                className="block text-gray-100 text-lg font-bold text-start p-2 mt-2 hover:bg-gray-800 focus:bg-gray-900"
                            >
                                {t('add_product')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                onClick={() => {
                                    setShowGetForm(true);
                                    setShowCreateForm(false);
                                    setShowUpdateForm(false);
                                    setShowDeleteForm(false);

                                }}
                                className="block text-gray-100 text-lg font-bold text-start p-2 hover:bg-gray-800 focus:bg-gray-900"
                            >
                                {t('Get')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                onClick={() => {
                                    setShowGetForm(true);
                                    setShowUpdateForm(true);
                                    setShowCreateForm(false);
                                    setShowDeleteForm(false)

                                }}
                                className="block text-gray-100 text-lg font-bold text-start p-2 hover:bg-gray-800 focus:bg-gray-900"
                            >
                                {t('Update')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                onClick={() => {
                                    setShowGetForm(true);
                                    setShowDeleteForm(true);
                                    setShowCreateForm(false);
                                    setShowUpdateForm(false);

                                }} className="block text-gray-100 text-lg font-bold text-start p-2 hover:bg-gray-800 focus:bg-gray-900"
                            >
                              {t('Delete')}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 p-4 flex-row flex-wrap justify-center">
                    {showCreateForm && (
                        <div className="flex justify-center mb-4 mt-3 bg-gray-300">
                            <form className="p-6">
                                <h2 className='text-lg font-bold text-center'>{t('Add')}</h2>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t('product_title')}
                                    <input
                                        type="text"
                                        required
                                        value={newProduct.title}
                                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                    />
                                </label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t('product_price')}
                                    <input
                                        type="number"
                                        required
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                    />
                                </label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t('product_description')}
                                    <input
                                        type="text"
                                        required
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                    />
                                </label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t('product_category')}
                                    <select
                                        required
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="jewelery">Jewelery</option>
                                        <option value="men's clothing">Men's Clothing</option>
                                        <option value="women's clothing">Women's Clothing</option>
                                    </select>
                                </label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t('product_image')}
                                    <input
                                        type="text"
                                        required
                                        value={newProduct.image}
                                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                        className="block w-full mb-4 p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                    />
                                </label>
                                <Link
                                    to="#"
                                    onClick={handleAddProduct}
                                    className="bg-green-500 hover:bg-green-700 flex justify-center text-white font-bold py-2 px-4 rounded"
                                >
                                    {t('add_product')}
                                </Link>
                            </form>
                        </div>
                    )}
                    {showGetForm && (
                        <form className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Product ID:
                                <input
                                    type="text"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </label>
                            <Link
                                to="#"
                                onClick={handleGetProduct}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Get Product
                            </Link>
                        </form>
                    )}
                    {showAlert && (
                        <div className="fixed top-11  left-0 right-0 p-4 bg-green-400 shadow-md rounded">
                            <div className="flex items-center justify-between">
                                <div className="flex py-3 items-center">
                                    <svg className="w-8 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 011 18z" />
                                    </svg>
                                    <p className="font-semibold pt-4 text-lg text-white">{t('added_successfully')}</p>
                                </div>
                                <button className="text-white pt-4 hover:text-gray-200 transition duration-300" onClick={() => setShowAlert(false)}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center mb-4 mt-3 bg-gray-300">
                        {showGetForm == true && product && (
                            <div className="bg-gray-100 p-4 rounded shadow-md w-1/2 xl:w-1/2 md:w-1/2 sm:w-full">
                                <h2 className="text-2xl font-bold mb-2">{t('product_detailes')}</h2>
                                
                                    <img src={product.image} alt="Product Image" className="w-full h-48 pt-2 object-contain rounded-md" />
                            
                                <p className="text-lg">
                                    {t('product_title')} {product.title}
                                </p>
                                <p className="text-lg">
                                    {t('product_price')} {product.price}
                                </p>
                            </div>
                        )}
                        {showUpdateForm && product && (
                            <form className="bg-gray-300 p-4 rounded shadow-md w-1/2 xl:w-1/2 md:w-1/2 sm:w-full">
                                <h2 className="text-center text-red-700 text-lg">{t('Update')} {product.id}</h2>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t('update_title')}
                                    <input
                                        type="text"
                                        required
                                        value={updatedProduct.title}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })}
                                        className="block m-1 mb-4 px-4 w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                    />
                                </label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t('update_price')}
                                    <input
                                        type="number"
                                        required
                                        value={updatedProduct.price}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                        className="block m-1 px-4 mb-4 w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                    />
                                </label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t('update_image')}
                                    <input
                                        type="text"
                                        required
                                        value={updatedProduct.image}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                        className="block w-full m-1 mb-4 p-2 px-4 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                    />
                                </label>
                                <Link
                                    to="#"
                                    onClick={handleUpdateProduct}
                                    className="bg-blue-500 hover:bg-blue-700 m-4 justify-center text-white font-bold py-2 px-4 rounded"
                                >
                                    {t('Update')}
                                </Link>
                            </form>
                        )}
                    </div>

                    {showDeleteForm && product && (
                        <Link to="#" className="bg-red-500 hover:bg-red-700 text-white justify-end rounded py-2 px-4 m-auto font-bold" onClick={() => setConfirmDelet(true)}>{t('Delete')}</Link>
                    )}

                    {confirmDelet && product && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-md p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title"> {t('Delete')} {product.id}</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to delete Product {product.id}? All of your data will be permanently removed. This action cannot be undone.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <Link to="#" onClick={handleDeleteProduct} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">{t('Delete')}</Link>
                                    <Link to="#" onClick={() => setConfirmDelet(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    )}
                   



                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
