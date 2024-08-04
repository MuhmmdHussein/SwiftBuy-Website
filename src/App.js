import logo from './logo.svg';
import './App.css';
import NavBar from './Components/navBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Detailes from './Pages/Productdetailes';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />

          <Route path='/productdetails/:id' exact element={<Detailes />} />

          <Route path={"*"} element={<NotFound />} exact />
        </Routes>
      </BrowserRouter>

    </>


  );
}

export default App;
