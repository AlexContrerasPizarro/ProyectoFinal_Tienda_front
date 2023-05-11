import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import './Navbar.css'
const Navbar = () => {
  const {user,setUser} = useContext(UserContext);
  let navigate = useNavigate();
  const handleSubmit = (e) =>{
    try {
      const User = {
        username:null,
        id:null
      }
      console.log("Desconectado");
      localStorage.removeItem("user");
      setUser(User);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  let nav_end = <div>
    <Link className="navbar_link" to='/login'>Login</Link>
    <Link className="navbar_link" to='/register'>Registrarse</Link>
    </div>
  
  if(localStorage.getItem("user")!== null)
  {
    const src = `/account/${user.id}`
    nav_end = <div>
    <Link className= "navbar_link" to={src}>Perfil</Link>
    <a className= "navbar_link" onClick={handleSubmit}>Cerrar Sesión</a>
    </div>
  }
  return (

<div class="topnav" id="myTopnav">
<Link className="navbar_link" to="/">Home</Link>
<Link className='navbar_link' to="/marketplace">Tienda</Link>
<Link className="navbar_link" to="/cart">Carrito</Link>
<a href="javascript:void(0);" class="icon_i" onClick={myFunction}> <i class="fas fa-bars"></i></a>
<div className="navbar-end">{nav_end}</div>

</div>

  )
}

export default Navbar;