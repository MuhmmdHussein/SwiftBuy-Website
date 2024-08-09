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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/Registration' exact element={<Registration />} />
          <Route path='/Login' exact element={<Login />} />
          <Route path='/Cart' exact element={<Cart />} />
          <Route path='/productdetails/:id' exact element={<Detailes />} />
          <Route path={"*"} element={<NotFound />} exact />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
