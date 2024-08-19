import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'

function AllItems() {
    const datas =useLoaderData()
    console.log(datas)
  
  return (
    <div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
       
        <th>Name</th>
        <th>Item name</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {datas.map(
        data =>
        <tr key={data._id}>
       
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={
                    data.photoURL
                      ? data.photoURL
                      : "https://i.ibb.co/sqK4TMj/user.png"
                  }
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{data.name}</div>
              <div className="text-sm opacity-50">{data.email}</div>
            </div>
          </div>
        </td>
        <td>
          {data.item_name}
          <br/>
          <span className="badge badge-ghost badge-sm">{data.subcategory}</span>
        </td>
        <td>{data.stockStatus}</td>
        <th>
            <Link to={`/artwork/${data._id}`}> <button className="btn btn-primary btn-xs">details</button></Link>
          
        </th>
      </tr>
      )}
      
    </tbody>
    {/* foot */}
    
    
  </table>
</div>
    </div>
  )
}

export default AllItems