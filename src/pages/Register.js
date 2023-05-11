import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
const Register = () => {

  let navigate = useNavigate();

  const [username,setUserName] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  console.log(username);
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(confirmPassword);
  
  const handleSubmit = async (e) =>{ 
    e.preventDefault();
    try {
      if(password === confirmPassword)
    {
      const response = await axios.post("http://localhost:5000/user/register",
      {
        username:username,
        name:name,
        email:email,
        password:confirmPassword,
        role:"user"
      });
      console.log(response.data.status);
      if(response.data.status === "Success")
      {
        navigate("/login");
      }
    }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>

<div className="container_register">
    <h1 className='titleRegister'>Regístrate</h1>
    <input type="text" value={username} onChange = {(e) => setUserName(e.target.value)} className="inputRegister" placeholder=' Ingresa un Nombre de Usuario' />
    <input type="text" value = {name} onChange = {(e)=> setName(e.target.value)} className="inputRegister" placeholder=' Ingresa tú nombre..' />
    <input type="email" value = {email} onChange = {(e)=> setEmail(e.target.value)} className="inputRegister" placeholder=' Ingresa tú email..' />
    <input type="password" value ={password} onChange = {(e) => setPassword(e.target.value)} className="inputRegister" placeholder=' Ingresa una contraseña..' />
    <input type="password" value={confirmPassword} onChange = {(e)=> setConfirmPassword(e.target.value)} className="inputRegister" placeholder=' Confirma la contraseña..' />
    <button type="submit" onClick={handleSubmit}  className='button'>Aceptar</button>

    </div>
    </>
  )
}

export default Register