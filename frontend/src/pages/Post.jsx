import React, { useEffect, useState }  from 'react'
import { useParams } from 'react-router-dom'
import { BaseUrl } from '../services/Endpoint'

export default function Post(){

  const {id} = useParams()
  const [singlepost,setSinglepost] = useState(null)
  
 
  useEffect(()=>{

    SinglePost()

  },[])
  const SinglePost = async()=>{
    try {
      const response = await get(`/public/singlepost/${id}`)
      const data = response.data
      setSinglepost(data.Post)
      console.log(data)
      
    } catch (error) {
      console.log(error)
    }
  }

    return(
      <> 
      <div className="container text-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="fw-bold text-white mb-4 display-4">{singlepost && singlepost.title}</h1>
          <img
  src={singlepost && `${BaseUrl}/images/${singlepost.image}`}
  alt="Exploring the Art of Writing"
  className="img-fluid mb-4"
  style={{ borderRadius: "10px",maxHeight: "500px",objectFit: "cover", width: "100%",
  }}
/>
<p className="mb-5">{singlepost && singlepost.desc}</p>
<hr/>
<h3 className="mt-5 mb-4">Leave a comment</h3>
        </div>
      </div>
    </div>
    </>
    )
}