import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import './Login.css'
const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://proyectofinaltiendaback.up.railway.app/user/login", {
        username: username,
        password: password
      });
      console.log(response.data.status);
      console.log(response.data.username);
      if (response.data.status === "Authorized") {
        const user = {
          username: response.data.username,
          id: response.data.id,
          role: response.data.role
        }
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <div className="container_login">
        <h1 className="titleLogin">Login</h1>
        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className="inputLogin" placeholder='Nombre Usuario' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="inputLogin" placeholder='Contraseña' />
        <button type="submit" onClick={handleSubmit} className='button'>Acceder</button>
        <h2 className=''>¿No tienes cuenta?<Link to="/register"> Regístrate Aquí!</Link></h2>
      </div>
    </>
  )
}

export default Login