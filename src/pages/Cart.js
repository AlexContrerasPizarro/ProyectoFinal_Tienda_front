import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css'
const Cart = () => {
  const { cart, setCart, user } = useContext(UserContext);
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // REVISAR
  // useEffect(() => {
  //   if (cart.length === 0) {
  //     setCart(JSON.parse(localStorage.getItem("cart")));
  //   }
  //   else if (localStorage.getItem("cart") === null) {
  //     navigate('/emptycart');
  //   }

  // });

  const handleIncreaseQuantity = (id) => {
    let list = [];
    cart.forEach((item) => {
      if (item.product.id === id) {
        item.quant += 1;
        list.push(item);
      }
      else {
        list.push(item);
      }
    })
    setCart(list);
    localStorage.setItem(
      "cart", JSON.stringify(list)
    )
  }

  const handleDecreaseQuantity = (id) => {
    let list = [];
    cart.forEach((item) => {
      if (item.product.id === id) {
        if (item.quant !== 1) {
          item.quant -= 1;
          list.push(item);
        }
      }
      else {
        list.push(item);
      }
    });
    setCart(list);
    localStorage.setItem(
      "cart", JSON.stringify(list)
    )
  }

  const handleRemove = (product_id) => {
    let list = [];
    cart.forEach((item) => {
      if (item.product.id !== product_id) {
        list.push(item);
      }
    });
    console.log(list);
    setCart(list);
    localStorage.setItem(
      "cart", JSON.stringify(list)
    )
  }
  let products = [];
  let quantity = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = user.id;
    console.log(id);
    cart.forEach((item) => {
      products.push(item.product.id);
      quantity.push(item.quant);
    });
    try {
      const response = await axios.post(`http://localhost:5000/orders/create/${id}`,
        {
          id: id,
          products: products,
          quantity: quantity,
          total: total_price,
          name: name,
          address: address,
          delivered: false
        });
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
    localStorage.removeItem("cart");
    navigate("/thanks");
  }

  let total_price = 0;
  return (
    <>

      <div className="container_cart">
        <h3 className='titleCart'>Resumen Carrito de Compras</h3>
        <table className="table_container">
          <thead>
            <tr>
              <td className='table_cart'>Nombre</td>
              <td className='table_cart'>Cantidad</td>
              <td className='table_cart'>Precio</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const src = `/product/${item.product.id}`;
              const price = item.product.price * item.quant;
              total_price += price;
              return (<tr key={item.product.id}>
                <td className=''><Link to={src}>{item.product.name}</Link></td>
                <td className=''>{item.quant}</td>
                <td className=''>${price}</td>
                <td><div>
                  <i class="fas fa-plus" title='Agregar' onClick={() => { handleDecreaseQuantity(item.product.id) }}></i>
                  <i class="fas fa-minus" title='Descontar' onClick={() => { handleIncreaseQuantity(item.product.id) }}></i>
                  <i class="fas fa-trash-alt ired" title='Eliminar' onClick={() => { handleRemove(item.product.id) }}></i>
                </div></td>
              </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className='total'>Total</td>
              <td></td>
              <td className='total'>${total_price}</td>
            </tr>
          </tfoot>
        </table>
        <form className="form_order">
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input type="text" className="input_order" placeholder="Quien recibirá el pedido"
                value={name} onChange={(e) => { setName(e.target.value) }} />
            </div>
          </div>
          <div className="field">
            <label className="label">Dirección</label>
            <input type="text" className="input_order" placeholder="Donde se enviará el pedido"
              value={address} onChange={(e) => { setAddress(e.target.value) }} />
          </div>
          <button className="button" onClick={(e) => { handleSubmit(e) }}>Finalizar</button>
        </form>
      </div>
    </>
  )
}

export default Cart