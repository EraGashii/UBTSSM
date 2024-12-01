import React  from 'react'
import { FaEdit,FaTrashAlt } from 'react-icons/fa'

export default function Allpost(){
    return(
    <div className='container'>
        <h1 className="text-center mb-4 text-white">All posts</h1>
        <div className='row'>
        <div className='col-md-4 mb-4 col-lg-4 col-12'> 
      <div className="card h-100">
        <img 
          src="https://img.freepik.com/free-photo/plant-terracotta-pot-birds-nest-fern-plant_53876-146303.jpg?t=st=1732930577~exp=1732934177~hmac=d28415691fe43eefa3104c080e01b1fe5370bd1b683dd37d169b9e2c674d13ce&w=1060"
          className="card-img-top img-fluid"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">My First Blog</h5>
          <p className="card-text">This is my first Blog</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button 
          className="btn btn-danger"
          >
            <FaTrashAlt /> Delete
          </button>
          <button 
          className="btn btn-warning">
            <FaEdit/>Update
            </button>
        </div>
        
      </div>
    </div>
    <div className='col-md-4 mb-4 col-lg-4 col-12'> 
      <div className="card h-100">
        <img 
          src="https://img.freepik.com/free-photo/plant-terracotta-pot-birds-nest-fern-plant_53876-146303.jpg?t=st=1732930577~exp=1732934177~hmac=d28415691fe43eefa3104c080e01b1fe5370bd1b683dd37d169b9e2c674d13ce&w=1060"
          className="card-img-top img-fluid"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">My First Blog</h5>
          <p className="card-text">This is my first Blog</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button 
          className="btn btn-danger"
          >
            <FaTrashAlt /> Delete
          </button>
          <button 
          className="btn btn-warning">
            <FaEdit/>Update
            </button>
        </div>
        
      </div>
    </div>
    <div className='col-md-4 mb-4 col-lg-4 col-12'> 
      <div className="card h-100">
        <img 
          src="https://img.freepik.com/free-photo/plant-terracotta-pot-birds-nest-fern-plant_53876-146303.jpg?t=st=1732930577~exp=1732934177~hmac=d28415691fe43eefa3104c080e01b1fe5370bd1b683dd37d169b9e2c674d13ce&w=1060"
          className="card-img-top img-fluid"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">My First Blog</h5>
          <p className="card-text">This is my first Blog</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button 
          className="btn btn-danger"
          >
            <FaTrashAlt /> Delete
          </button>
          <button 
          className="btn btn-warning">
            <FaEdit/>Update
            </button>
        </div>
        
      </div>
    </div>
    
  </div>

</div>
    )
}