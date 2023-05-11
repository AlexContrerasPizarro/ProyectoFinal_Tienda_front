import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Admin.css'

const Admin = () => {

  const {user,setUser} = useContext(UserContext);
  if(user.id === null)
  {
    const checkUser = JSON.parse(localStorage.getItem("user"));
    setUser(checkUser);
  }

  return (
    <>
    <div className="container_adm">
    <h1 className="titleAdm">Hola {user.username}!</h1>
    <h2 >Administrar Productos:</h2>
    <Link className="button" to="/admin/products">Productos</Link>
    </div>
    </>
  )
}

export default Admin