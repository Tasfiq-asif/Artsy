import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../../Provider/Provider";

function Add_item() {

  const { user } = useContext(AuthContext);
  const email_user = user.email

  console.log(email_user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      image: "",
      item_name: "",
      subcategory: "",
      description: "",
      price: "",
      rating: "",
      customization: "",
      processing_time: "",
      stockStatus: "",
      email: "",
      name: "",
    },
  });

  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    const { image,
      item_name,
      subcategory,
      description,
      price,
      rating,
      customization,
      processing_time,
      stockStatus,
      email,
      name} = data;

      const postedData = {
      ...data,
      email_user: email_user
    };

      //send Data to server
      fetch('https://artsio-server.vercel.app/artworks',{
        method: 'POST',
        headers: {'content-type': 'application/json',},
        body: JSON.stringify(postedData)

      })
      .then(res => res.json())
     .then(data => {
  if (data.insertedId) {
    Swal.fire({
      title: "Congratulations",
      text: "Data Added Successfully",
      icon: "success"
    });
    reset();
  }
})


    // Perform any necessary actions here, such as making API requests

    // Example: Assume there's an error in registration
  

    // If registration is successful, you can redirect or show a success message
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Item</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="card shrink-0 w-full max-w-7xl shadow-2xl bg-base-100 ">
        <h1 className=" text-3xl text-center pt-6 heading font-bold">
          Add your Photo
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="url"
              className="input input-bordered"
              placeholder="Add image URL"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className=" pt-1 text-red-600">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Name</span>
            </label>
            <input
              {...register("item_name", { required: true })}
              type="text"
              placeholder="Item Name"
              className="input input-bordered"
            />
           
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub Category</span>
            </label>
            <select className="select select-bordered w-full" {...register("subcategory")} defaultValue="">
            <option disabled value="">Select</option>
            <option value="Landscape Painting">Landscape Painting</option>
            <option value="Portrait Drawing">Portrait Drawing</option>
            <option value="Watercolour Painting">Watercolour Painting</option>
            <option value="Oil Painting">Oil Painting</option>
            <option value="Charcoal Sketching">Charcoal Sketching</option>
            <option value="Cartoon Drawing">Cartoon Drawing</option>
            </select>
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea className="textarea textarea-bordered" placeholder="Description" {...register("description", {})}></textarea>
          </div>
         
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price $</span>
            </label>
            <input
              type="text"
              placeholder="Price"
              className="input input-bordered"
              {...register("price")}
            />
          </div>

         
      <div className="flex w-full gap-7">
            <div className="form-control w-1/3">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <select className="select select-bordered w-full max-w-5xl" {...register("rating")} defaultValue="">
            <option disabled value="">1-5</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
          </div>
          <div className="form-control w-1/3">
            <label className="label">
              <span className="label-text">Customization</span>
            </label>
            <select className="select select-bordered w-full max-w-5xl" {...register("customization")} defaultValue="">
            <option disabled value="">Yes/No</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select>
          </div>

          <div className="form-control w-1/3">
            <label className="label">
              <span className="label-text">Stock Status</span>
            </label>
            <select className="select select-bordered w-full max-w-5xl" {...register("stockStatus")} defaultValue="">
            <option disabled value="">Options</option>
            <option value="In stock">In stock</option>
            <option value="Made to Order">Made to Order</option>
            </select>
          </div>
          
      </div>

      <div className="form-control">
            <label className="label">
              <span className="label-text">Processing Time(days)</span>
            </label>
            <input
              type="text"
              placeholder="Processing Time"
              className="input input-bordered"
              {...register("processing_time")}
            />
          </div>
          

      <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              placeholder="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className=" pt-1 text-red-600">This field is required</span>
            )}
          </div>

              <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className=" pt-1 text-red-600">This field is required</span>
            )}
          </div>

         
          {error && <p className=" mx-auto mt-1  text-red-600">{error}</p>}
          <div className="form-control mt-6">
            <button className="btn btn-primary bg-black text-white hover:bg-orange border-none">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add_item;
