import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PostCompra.css'

const PostCompra = () => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/');
    }

  return (
    <section className="container_g">
    <h1 className='titleGracias'>Gracias por tu compra!</h1>
   <div >
   <button className='' onClick={()=> {handleClick()}}>Retornar</button>
   </div>
    </section>
  )
}

export default PostCompra