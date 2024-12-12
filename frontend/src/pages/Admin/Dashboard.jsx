import React, { useEffect }  from 'react'


export default function Dashboard(){
  const [post,setPost] = useState([])
  const [users,setUsers] = useState([])
  const [comments,setComments] = useState([])
  useEffect(()=>{
    const GetData = async()=>{
      try {
        const response = await get('/dashboard')
        const data = response.data
        setPost(data.Posts)
        setUsers(data.Users)
        setComments(data.Comments)
        console.log(data)
        
      } catch (error) {
        console.log(error)
      }
    }
    GetData()
  },[])
    return(
  <>
  <div>
  <h2 className="mb-4 text-white">Dashboard</h2>
  <div className="row">
    <div className="col-md-4 col-lg-4 col-sm-4 col-12">
      <div className="card bg-primary text-white mb-4">
        <div className="card-body">
          <h5 className="card-title">Total Users</h5>
          <p className="card-text">{users && users.length}</p>
        </div>
      </div>
    </div>
    <div className="col-md-4 col-lg-4 col-sm-4 col-12">
      <div className="card bg-success text-white mb-4">
        <div className="card-body">
          <h5 className="card-title">Total Post</h5>
          <p className="card-text">{post && post.length}</p>
        </div>
      </div>
    </div>
    <div className="col-md-4 col-lg-4 col-sm-4 col-12">
      <div className="card bg-warning text-white mb-4">
        <div className="card-body">
          <h5 className="card-title">Total Comments</h5>
          <p className="card-text">{comments && comments.length}</p>
        </div>
      </div>
    </div>
    

  </div>
</div>

  </>
    )
}