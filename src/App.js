import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import MarketPlace from './pages/MarketPlace';
import ProductDetails from './pages/ProductDetails';
import UserDetails from "./pages/UserDetails";
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import PostCompra from "./pages/PostCompra";
import CartVacio from './components/CartVacio';
import Admin from './pages/Admin';
import AdminProducts from './components/AdminProducts';
import AdminProductActualizar from "./components/AdminProductActualizar";

function App() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [cart,setCart] = useState([]);
  return (
    <UserContext.Provider value= {{user,setUser,cart,setCart}}>
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element = {<Home />} />
    <Route path="/cart" element = {<Cart />} />
    <Route path="/login" element = {<Login />} />
    <Route path="/register" element = {<Register />}/>
    <Route path="/marketplace" element = {<MarketPlace />} />
    <Route path="/product/:id" element = {<ProductDetails/>}/>
    <Route path="/account/:id" element = {<UserDetails />} />
    <Route path="/thanks" element = {<PostCompra />}/>
    <Route path="/admin" element = {<Admin />} />
    <Route path="/admin/products" element = {<AdminProducts />} />
    <Route path="/admin/update/:id" element = {<AdminProductActualizar />} />
    <Route path="/emptycart" element = {<CartVacio />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
