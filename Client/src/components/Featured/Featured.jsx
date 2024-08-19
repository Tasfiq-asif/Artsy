import  { useEffect, useState } from 'react'

function Featured() {

    const [featuredArtist, setFeaturedArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    fetch('https://artsio-server.vercel.app/featured')
      .then(response => response.json())
      .then(data => {
        setFeaturedArtist(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching featured artist:', error);
        setIsLoading(false);
      });
  }, []);

  
  return (
    <div>
        <h1 className='text-3xl md:text-7xl font-bold text-center py-4 md:py-7 '>Featured Artist</h1>
    <div className='flex mx-auto justify-center my-9'>
        <div className="card card-side bg-white shadow-xl">
  <figure><img src={"https://i.ibb.co/bLYjGDp/pro.jpg"} className='h-[200px] md:h-[400px] l:h-[600px]' alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">Rina malik</h2>
    <p>Most upvoted artist in 2024</p>
    <p>Contact: Rina@malik.com</p>
    
  </div>
</div>
    </div>
    </div>
  )
}

export default Featured