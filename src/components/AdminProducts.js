import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminProducts.css'

const AdminProducts = () => {

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);


  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products/");
      console.log(response.data.data.products);
      setProducts(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  const createProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/products/create",
        {
          name: name,
          img: image,
          desc: desc,
          price: price,
          count: stock
        });
      console.log(response);
      alert("¡Producto Agregado!");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct();
  }

  const removeProduct = async (id) => {
    try {
      const src = `http://localhost:5000/products/delete/${id}`;
      const response = axios.delete(src);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    removeProduct(id);
  }
  useEffect(() => {
    getProducts();
  }, []);



  return (
    <>
      <div className="container_admin">
        <div >

          <table >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const src = `/admin/update/${product.id}`;
                return (<tr>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td><Link to={src} >Actualizar</Link></td>
                  <td><i class="fas fa-trash-alt ired" title='Eliminar' onClick={(e) => { handleDelete(e, product.id) }}></i></td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="container_crearproducto">
          <form >
            <h1 className='titleIngresar'>Ingresa un nuevo producto :</h1>
            <div >
              <label >Nombre</label>
              <div >
                <input type="text" className="input" placeholder='Ingresa nombre'
                  value={name}
                  onChange={(e) => { setName(e.target.value) }} />
              </div>
            </div>
            <div className="field">
              <label >Image URL</label>
              <div >
                <input type="text" className="input" placeholder='Copia URL'
                  value={image}
                  onChange={(e) => { setImage(e.target.value) }} />
              </div>
            </div>
            <div >
              <label >Descripción</label>
              <div >
                <textarea className='textarea' cols="30" rows="10" placeholder='Ingresa Descripción del producto'
                  value={desc}
                  onChange={(e) => { setDesc(e.target.value) }}></textarea>
              </div>
            </div>
            <div >
              <label >Precio</label>
              <div >
                <input type="number" className="input" placeholder='Ingresa el precio'
                  value={price}
                  onChange={(e) => { setPrice(e.target.value) }} />
              </div>
            </div>
            <div >
              <label >Stock </label>
              <div >
                <input type="text" className="input" placeholder='Ingresa el stock'
                  value={stock}
                  onChange={(e) => { setStock(e.target.value) }} />
              </div>
            </div>
            <button className="button" onClick={(e) => { handleSubmit(e) }}>Ingresar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminProducts;