import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../services/Endpoint';
const BaseUrl = 'http://localhost:5173';


export default function RecentPost(){
    const navgiate= useNavigate();
    const [post,setPost]=useState([])

    const handleNavigate = (id) => {
      navigate(`/post/${id}`);
    };
    
    const getpost=async()=>{
      try {
        const response = await get('/blog/getposts');
        const data = response.data;
        setPost(data.posts)
        console.log(data)
      }catch(error){
       console.log(error)
      }
    }
    useEffect(()=>{
    
      getpost()
      
    },[])


    return(
        <>
    <div className='container' >
        <div className='mb-5 text-center'>
        <h2 className='fw-bold fs-1 text-white'>RecentPost</h2>
      </div>

      <div className="row">
        {post && post.map((post,index)=>{
        return(
          <div className="col-md-4 col-lg-4 col-xs-12 mb-4">
            <div className="card border-success"  style={{ borderWidth: "2px",backgroundColor: "#2b2b2b", borderRadius: "10px",overflow:"hidden" }} >
            <img src={`${BaseUrl}/images/${post.image}`} 
              className="card-img-top img-fluid" alt="" />
                <div className="card-body bg-dark text-white">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.desc}</p>
                  <button className="btn btn-primary w-100 mt-3" onClick={()=>handlenvaigte(post._id)}>  Read More  </button>    
                </div>
            </div>
          </div>
        )
        })}
      </div>
    </div>

    </>

  )
} 
  