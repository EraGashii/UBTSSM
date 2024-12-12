import React  from 'react'
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserLayout from './Layouts/UserLayout'
import AdminLayout from './Layouts/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import User from './pages/Admin/User'
import Addpost from './pages/Admin/Addpost'
import Allpost from './pages/Admin/Allpost'
import {Toaster} from 'react-hot-toast'


export default function App(){
    return(
      <>
      <BrowserRouter>
      <Toaster/>
      <Routes>
      <Route path='/' element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='post/:id' element={<Post/>}></Route>
        <Route path='profile/:id' element={<Profile/>}></Route>
        </Route>
        <Route path='/dahbaord' element={<AdminLayout/>}>
        <Route   index element={<Dashboard/>}/>
        <Route   path='addpost' element={<Addpost/>}/>
        <Route   path='users' element={<User/>}/>
        <Route   path='allposts' element={<Allpost/>}/>

        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
     
   
      </Routes>
      </BrowserRouter>
      </>
  
    )
}