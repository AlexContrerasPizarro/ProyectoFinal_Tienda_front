import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import './UserDetails.css'

const UserDetails = () => {

  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [orders, setOrders] = useState([]);

  let adminButton = <div></div>;
  if (user.role === "admin") {
    adminButton = <div className="panel">
      <h3 className=''>Panel de Control:</h3>
      <Link className="button" to="/admin">Entrar</Link>
    </div>
  }

  const getUserDetails = async () => {
    try {
      const src = `http://localhost:5000/user/${id}`;
      const response = await axios.get(src);
      console.log(response.data.data.user);
      setName(response.data.data.user.name);
      setEmail(response.data.data.user.email);
    } catch (error) {
      console.log(error);
    }
  }


  const getOrders = async () => {
    try {
      const src = `http://localhost:5000/orders/user/${id}`;
      const response = await axios.get(src);
      console.log("Orders", response.data.data.orders);
      setOrders(response.data.data.orders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserDetails();
    getOrders();
  }, []);
  return (
    <>
      <div className="container_perfil">

        <div className="titleUsername"><h2> Hola {user.username}!</h2></div>
        <div>
          <div>Tú nombre es: {name}</div>
          <div>Tu Email: {email}</div>
        </div>
        {adminButton}
      </div>

      <table className="tabla_compras">
        <div className="titleResumen">Resumen de tus Compras</div>
        <tr>
          <th>Recibe</th>
          <th>Despachado</th>
          <th>Total</th>
        </tr>

        <tbody>
          {orders.map((order) => {
            const src = `/order/${order.id}`
            return (<tr>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>${order.total}</td>
            </tr>
            )
          })}
        </tbody>
      </table>


    </>
  )
}

export default UserDetails