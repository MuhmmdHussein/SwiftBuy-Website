// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust the path according to your directory structure
import NavBar from './Components/navBar';
import Home from './Pages/Home';
import Detailes from './Pages/Productdetailes';
import NotFound from './Pages/NotFound';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import { Fivorites } from './Pages/LikedProduct';
import AdminDashboard from './Pages/AdminDashboard';
import Breadcrumb from './Components/BreadCrump';
function App() {
  const breadcrumbData = [
    {
      label: "Home",
      path: "/"
    },
    {
      label: "Favorites",
      path: "/favorites"
    },
    {
      label: "Admin",
      path: "/Admin/:id"
    },
    {
      label: "Product Detieles",
      path: "/productdetails/:id"
    },
    {
      label: "Categories",
      path: "/favorites/categories"
    }
  ];
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Breadcrumb breadcrumbData={breadcrumbData} />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/Registration' exact element={<Registration />} />
          <Route path='/Login' exact element={<Login />} />
          <Route path='/Cart' exact element={<Cart />} />
          <Route path='/productdetails/:id' exact element={<Detailes />} />
          <Route path='/favorites' exact element={<Fivorites />} />
          <Route path='/productdetails/:id' exact element={<Detailes />} />
          <Route path='/Admin/:id' exact element={<AdminDashboard />} />
          <Route path={"*"} element={<NotFound />} exact />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
