import React  from 'react'
import { useNavigate } from 'react-router-dom'

export default function RecentPost(){
    const navgiate=useNavigate()
    const handlenvaigte=()=>{
        navgiate('/post/0938')
    }
    return(
        <>
    <div className='container' >
        <div className='mb-5 text-center'>
        <h2 className='fw-bold fs-1 text-white'>RecentPost</h2>
    </div>

    <div className="row">
  <div className="col-md-4 col-lg-4 col-xs-12 mb-4">
    <div className="card border-success"  style={{ borderWidth: "2px",backgroundColor: "#2b2b2b", borderRadius: "10px",overflow:"hidden" }} >
      <img src="https://img.freepik.com/free-photo/plant-terracotta-pot-birds-nest-fern-plant_53876-146303.jpg?t=st=1732930577~exp=1732934177~hmac=d28415691fe43eefa3104c080e01b1fe5370bd1b683dd37d169b9e2c674d13ce&w=1060"
        className="card-img-top img-fluid" alt="" />
      <div className="card-body bg-dark text-white">
                   <h5 className="card-title">My First Blog</h5>
                   <p className="card-text">This is my First Blog</p>
          <button className="btn btn-primary w-100 mt-3" onClick={handlenvaigte}>  Read More  </button>
          
      </div>
    </div>
  </div>
  
</div>

    </div>

    </>

    )
} 
  