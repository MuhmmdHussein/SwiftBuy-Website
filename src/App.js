import logo from './logo.svg';
import './App.css';
import NavBar from './Components/navBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Detailes from './Pages/Productdetailes';
import NotFound from './Pages/NotFound';
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
    <>
      <BrowserRouter>
        <NavBar />
        <Breadcrumb breadcrumbData={breadcrumbData} />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/favorites' exact element={<Fivorites />} />
          <Route path='/productdetails/:id' exact element={<Detailes />} />
          <Route path='/Admin/:id' exact element={<AdminDashboard />} />

          <Route path={"*"} element={<NotFound />} exact />
        </Routes>
      </BrowserRouter>

    </>


  );
}

export default App;
