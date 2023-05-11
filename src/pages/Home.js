import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
const Home = () => {
  return (
    <>
    <section className="hero">
    <div className="hero-body">
    <h1 className='title'>Bienvenido!</h1>
    <h3 className="subtitle">Los Mejores Juegos Aquí...</h3>
    <Link className="button" to="/marketplace">Entrar a la Tienda</Link>
    </div>
    </section>
   
    </>
  )
}

export default Home