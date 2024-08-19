import { useLoaderData } from "react-router-dom";
import ActiveSlider from "../../components/ActiveSlider/ActiveSlider";
import Featured from "../../components/Featured/Featured";

const Home = () => {
  const datas = useLoaderData()
  

  return (
    <div>
      <div className="carousel w-full h-3/4">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://i.ibb.co/J3xZwhC/banner.jpg" className="w-full  bg-cover" />
    <div className="absolute top-40 left-0 md:top-64 lg:top-96  w-full text-center">
      <h2 className="text-white text-[6vw] font-bold">Art That Speaks to Your Soul</h2>
      <p className="text-white text-[4vw]"> Take good care of that!</p>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://i.ibb.co/tsPYRjj/banner2.jpg" className="w-full " />
    <div className="absolute top-40 left-0 md:top-64 lg:top-96  w-full text-center">
      <h2 className="text-white text-[6vw] font-bold">Immerse Yourself in the World of Artistry</h2>
      <p className="text-white text-[4vw]">Never a dull day!</p>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://i.ibb.co/M906KGL/banner3.jpg" className="w-full " />
    <div className="absolute top-40 left-0 md:top-64 lg:top-96  w-full text-center">
      <h2 className="text-white text-[6vw] font-bold">Discover Inspiration Through Art</h2>
      <p className="text-white text-[4vw]">It's never Too late</p>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
 
</div>



      <ActiveSlider datas={datas}/>
      <Featured/>
    </div>
  );
};

export default Home;
