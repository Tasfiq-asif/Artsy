
import { Swiper, SwiperSlide } from "swiper/react";
import 'react-tooltip/dist/react-tooltip.css'


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import "../../../src/style.css";

import { FreeMode, Pagination } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

function ActiveSlider({datas}) {
   

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
    _id} = datas;

  
  return (
    <div className="flex items-center justify-center flex-col h-[50vh] md:h-[100vh] bg-[#E0D0B3] pt-11">
      <h1 className="text-5xl font-bold mb-9 text-white">Current Uploads</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
    
        className="mySwiper max-w-[90%] lg:max-w-[80%]"
      >
        {datas.slice(0, 6).map((data) => (
          <SwiperSlide key={data._id}>
            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] md:h-[400px] md:w-[250px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${data.image})` }}
              />

              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
                <h1 className="text-xl lg:text-3xl font-bold">
                  {data.item_name}{" "}
                </h1>

                <p className="lg:text-[18px] badge-outline font-bold">
                  Price: ${data.price}{" "}
                </p>
                <div className="badge badge-outline">Rating: {data.rating}</div>
                <div className="badge badge-outline">{data.stockStatus}</div>
              </div>
              {/* <div className="card  bg-base-100 shadow-xl relative px-6 py-8 h-[350px] w-[215px] md:h-[400px] md:w-[250px] lg:h-[600px] lg:w-[300px] overflow-hidden cursor-pointer">
               <figure><img className="absolute inset-0 bg-cover bg-center h-[250px]" src={data.image} alt="Shoes" /></figure>
              <div className="card-body">
            
                <p>If a dog chews shoes whose shoes does he choose?</p>
               <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div> 
            <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div> */}

              <Link to={`/artwork/${data._id}`}>
                <div className="flex gap-0">
                  <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-black group-hover:text-blue-500 group-hover:rotate-45 duration-100 " />
                  <div className="badge badge-ghost absolute bottom-7 left-[60px] hover:text-blue-500">
                    View details
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ActiveSlider