import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminProductActualizar.css'
const AdminProductActualizar = () => {

    const [product, setProduct] = useState({});
    const [newPrice, setNewPrice] = useState(product.price);
    const [stock, setStock] = useState(0);
    const { id } = useParams();
    let navigate = useNavigate();
    const originalStock = product.countstock;

    const getProduct = async () => {
        try {
            const src = `https://proyectofinaltiendaback.up.railway.app/products/${id}`;
            const response = await axios.get(src);
            console.log(response.data.data.product);
            setProduct(response.data.data.product);
            setStock(response.data.data.product.countstock);
        } catch (error) {
            console.log(error);
        }
    }

    const addStock = () => {
        setStock(stock + 1);
    }

    const subStock = () => {
        setStock(stock - 1);
    }

    const updateStock = async (id) => {
        try {
            const src = `https://proyectofinaltiendaback.up.railway.app/products/update/${id}`;
            const response = await axios.post(src, {
                addStock: stock - originalStock
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const updatePrice = async (id) => {
        try {
            const src = `https://proyectofinaltiendaback.up.railway.app/products/update/price/${id}`;
            const response = await axios.post(src, {
                newprice: newPrice
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (id) => {
        updateStock(id);
        updatePrice(id);
        navigate("/admin/products");
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <>
            <div className="container_productoadm">
                <h1 className="productoName">{product.name}</h1>
                <div className="container_form">
                    <h2 className="precio">Precio Actual: ${product.price}</h2>
                    <div className="cont_update">
                        <h1 className="stock">Stock: </h1>
                        <h2 className="stock"> {stock}</h2>
                        <i class="fas fa-plus" title='Agregar' onClick={addStock}></i>
                        <i class="fas fa-minus" title='Descontar' onClick={subStock}></i>
                    </div>
                    <form action="">
                        <div >
                            <label className="nuevoPrecio">Nuevo Precio:</label>
                            <input type="text" className="inputNP" placeholder='Ingresa precio'
                                value={newPrice}
                                onChange={(e) => { setNewPrice(e.target.value) }} />

                        </div>
                    </form>
                </div>
                <button className="button" onClick={() => { handleSubmit(product.id) }}>Actualizar</button>
            </div>
        </>
    )
}

export default AdminProductActualizar;