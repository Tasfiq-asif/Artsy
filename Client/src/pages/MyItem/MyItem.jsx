import React, { useContext, useState } from 'react';
import { Link, json, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Provider/Provider';
import Swal from 'sweetalert2';

function MyItem() {
  const datas = useLoaderData();
  const { user } = useContext(AuthContext);
  const [sortByCustomization, setSortByCustomization] = useState(null);

  let filteredItems = datas.filter(data => data.email_user === user.email);

  if (sortByCustomization !== null) {
    filteredItems = filteredItems.sort((a, b) => {
      if (sortByCustomization === 'yes') {
        return a.customization.localeCompare(b.customization);
      } else {
        return b.customization.localeCompare(a.customization);
       }
    });
  }

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure you want to delete",
      text: "you won't be able to revert",
      icon: "warning",
      showCancelButton: true, 
      confirmButtonColor: "#3085d6",
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform deletion logic here
        Swal.fire(
          'You have successfully deleted'
        );
        fetch(`https://artsio-server.vercel.app/artworks/${_id}`,{
            method: 'DELETE',
        })
        .then(res => res,json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0){
                Swal.fire(
          'You have successfully deleted'
        );
            }
        })
      }
    });
  };

  return (
    <div>
        <div className='flex justify-center'>
            <button className='btn' onClick={() => setSortByCustomization(sortByCustomization === 'yes' ? 'no' : 'yes')}>
        Sort by Customization ({sortByCustomization === 'yes' ? 'No' : 'Yes'})
      </button>
        </div>


     <div className='flex flex-wrap'>
         {filteredItems.map((item) => (
        <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={item.image} alt="Shoes" className="rounded-xl h-[300px]" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{item.item_name}</h2>
            <p>Price: ${item.price}</p>
            <div className='flex gap-3'>
              <div className="badge badge-outline">Rating: {item.rating}</div>
              <div className="badge badge-outline">Customization: {item.customization}</div>
            </div>
            <div className="badge badge-outline">Status: {item.stockStatus}</div>
            <div className="card-actions">
              <Link to={`update/${item._id}`}>
                <button className="btn btn-primary">Update</button>
              </Link>
              <button onClick={() => handleDelete(item._id)} className="btn btn-error">Delete</button>
            </div>
          </div>
        </div>
      ))}
     </div>
    </div>
  );
}

export default MyItem;
