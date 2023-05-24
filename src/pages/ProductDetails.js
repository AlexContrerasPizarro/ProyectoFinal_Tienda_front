import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './ProductDetails.css'

const ProductDetails = () => {

  const [product,setProduct] = useState({});

  const {cart,setCart} = useContext(UserContext);

  const {id} = useParams();
  const {user} = useContext(UserContext);
  console.log(user);
  
  const getProduct = async () =>{
    try {
      const response = await axios.get(`https://proyectofinaltiendaback.up.railway.app/products/${id}`);
      console.log(response.data.data.product);
      setProduct(response.data.data.product);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getProduct();
  },[]);




  const handleAddToCart = (e) => {
    const userLoggedIn = true;
    e.preventDefault(); 
    if (user && userLoggedIn && user.id !== null) {
      try {
        const cart_item = {
          product: product,
          quant: 1
        }
        cart.push(cart_item);
        setCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("¡Agregado al carrito!");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Inicia sesión para agregar productos al carrito');
    }
  } 
  

  //  const handleAddToCart = (e) =>{
  //    e.preventDefault();
  //    try {
  //      const cart_item = {
  //        product:product,
  //        quant:1
  //      }
  //      cart.push(cart_item);
  //      setCart(cart);
  //      localStorage.setItem("cart",JSON.stringify(cart));
  //      alert("¡Agregado al carrito!");
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  }


  return (
    <>
   
    <div className="productDetail">
    <div className="productImg">
    <img src={product.img} alt="" />
    </div>
    <div className="productInfo">
    <div className="productName">{product.name}</div>
    <div className="productDescp">{product.descp}</div>
    </div>
    <div className="productInfo2">
    <div className="productPrice">  ${product.price}</div>
   
    <button  onClick = {handleAddToCart} >Añadir al Carrito</button>
    </div>
    </div>

    </>
  )
}

export default ProductDetails;