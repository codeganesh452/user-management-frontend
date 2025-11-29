import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
export default function Home() {

    const [users,setusers]=useState([]);
    
    useEffect(()=>{
      loadusers();
    }, [] );

    const loadusers=async ()=>{
        const result=await axios.get("http://localhost:8080/viewall");
        setusers(result.data);
    }

    const deleteuser=async (id)=>{
      await axios.delete(`http://localhost:8080/user/${id}`)
      loadusers();
    }

  return (
    <div className='container mt-4'>
         <div className='row justify-content-center'>
          <div className='col-lg-10 col-md-11 col-sm-12'>
            <div className='table-responsive'>
              <table className="table table-bordered table-striped shadow ">
                   <thead>
                     <tr>
                       <th scope="col">Id</th>
                       <th scope="col">Name</th>
                       <th scope="col">UserName</th>
                       <th scope="col">Email</th>
                       <th scope="col">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                       {users.map((user,index)=>(
                        <tr key={index}>
                       <th>{index+1} </th>
                       <td className='text-break'>{user.name}</td>
                       <td className='text-break'>{user.username}</td>
                       <td className='text-break'>{user.email}</td>
                       <td>
                        <div className='d-flex flex-column flex-sm-row gap-2'>
                        <Link className='btn btn-primary btn-sm btn-responsive mx-2 ' to={`/viewuser/${user.id}`}>View</Link>
                         <Link className='btn btn-outline-primary btn-sm responsive-btn mx-2 ' to={`/edituser/${user.id}`} >Edit</Link>
                          <button className='btn btn-danger btn-sm responsive-btn mx-2 ' onClick={()=>deleteuser(user.id)}>Delete</button>
                       </div>
                       </td>
                     </tr> 
                        ))}
                     

                   </tbody>
               </table>
         </div>
         </div>
         </div>
    </div>
  )
}
