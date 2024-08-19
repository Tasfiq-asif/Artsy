import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const ErrorPage = () => {
   
  return (
    <div className="flex justify-cente flex-col items-center my-16 gap-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Error 404</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h1 className="text-xl">
        Wrong address! Please CLick the button to return to HomePage
      </h1>
      <Link to={"/"}>
        <button className="btn bg-green-500 text-white">Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;