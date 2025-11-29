import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditUser() {
     let naviagte=useNavigate();

     const {id}=useParams()


     const [user,setuser]  =useState({
          name:"",
          username:"",
          email:""
       })
  
       const {name,username,email}=user

       const onInputChange=(e)=>{
          setuser({...user,[e.target.name]:e.target.value})
               
       }
       useEffect(()=>{
        loadUser();
       },[]);
      
        const onSubmit=async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`,user)
        naviagte("/")
        };

        const loadUser=async ()=>{
            const result=await axios.get(`http://localhost:8080/view/${id}`,user)
            setuser(result.data)
        }
  return (
    <div className='container ' >
     <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Edit User</h2>
            <form onSubmit={(e)=>onSubmit(e)} >
            <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                    Name
                </label>
                <input 
                type='text'
                className='form-control'
                placeholder='Enter Your Name'
                name='name' value={name} 
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className='mb-3'>
               <label htmlFor='Name' className='form-label'>
                    Username
                </label>
                <input 
                type='text'
                className='form-control'
                placeholder='Enter Your Username'
                name='username' value={username}
                 onChange={(e)=>onInputChange(e)}
                />
            </div>
             <div className='mb-3'>
               <label htmlFor='Name' className='form-label'>
                  Email
                </label>
                <input 
                type='email'
                className='form-control'
                placeholder='Enter Your Email'
                name='email' value={email}
                 onChange={(e)=>onInputChange(e)}
                />
            </div>
             <button type='submit' className='btn btn-outline-primary mx-2'>Submit</button>
          <button type='button' className='btn btn-outline-danger mx-2' onClick={()=>naviagte("/")}>Cancel</button>
          </form>
        </div>
     </div>
    </div>
  )
}
