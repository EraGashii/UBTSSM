
import { Link } from 'react-router-dom'
import React, { useState } from 'react';



export default function Navbar(){
  const [islogin,setIslogin]=useState(true)
    return(
     <>
     <nav className="navbar d-flex justify-content-between  align-items-center p-3">
     <Link to={'/'}><h1 className="mx-5 text-white fs-2 fw-bold">Eraa</h1></Link>
     <div className="d-flex align-items-center">
      {!islogin ? <Link to={'/login'}><button className="btn_sign mx-3">Sign in</button></Link>:(
        <div className="dropdown">
        <div className="avatar-container pointer rounded-circle overflow-hidden bg-info" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: '40px', height: '40px', cursor: "pointer" }}>
        <img src='https://img.freepik.com/free-vector/professional-tiktok-profile-picture_742173-5866.jpg?t=st=1732928325~exp=1732931925~hmac=30f3c724d16e012a0534ec1e501becdf2f018a31032041681603344aca5bbda3&w=1060'
        className='img-fluid h-100 w-100'
        style={{objectFit:"cover"}} alt=""/>

       </div>

       <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">

      <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link> </li>
      <li> <Link className="dropdown-item" to={`/profile/98989834`}>Profile </Link> </li>
      <li><a className="dropdown-item" style={{ cursor: "pointer" }}> Sign Out </a> </li>
       </ul>

      </div>
      )}
     
   
     </div>
          </nav>
     </>
    )
}

