import { useLoaderData, useParams } from "react-router-dom";


function ArtWorkDetails() {
     const artworks = useLoaderData();
    const { _id } = useParams();
  console.log(_id)
  const art = artworks.find((art) => art._id == _id);
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
      name,
    } = art;

console.log(name);
  return (
    <div>
        <div className="hero min-h-screen bg-[#E0D0B3">
  <div className="hero-content flex-col lg:flex-row">
    <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
       <p>Artist: {name}</p>
      <h1 className="text-5xl font-bold">{item_name}</h1>
      <p className="py-6">{description}</p>
      <div className="badge bg-green-400 text-white py-4">
        {subcategory}</div>
        <div className="badge bg-green-400 text-white py-4">Rating: {rating}</div>
        <div className="badge bg-green-400 text-white py-4">Customisation: {customization}</div>
      <p className="text-2xl font-bold mt-3 ">Price: ${price}
       <span></span></p>
       <p>Status: {stockStatus}</p>
       <p>Processing time: {processing_time} days</p>
       <p>Contact: {email}</p>
     
    </div>
  </div>
</div>
    </div>
  )
}

export default ArtWorkDetails