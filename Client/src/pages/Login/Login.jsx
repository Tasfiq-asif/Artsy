import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Provider/Provider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn, googleLogin, githubLogin } = useContext(AuthContext);
  const onSubmit = (data) => {
    const { email, password } = data;
    setError("");
    
    signIn(email, password)
      .then((result) => {
        //navigate after login
        if (result.user) {
          toast("You Just Logged in !");
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => setError(error.message.replace("Firebase: ", "")));
  };

  return (
    <div className="hero min-h-screen ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Artsio</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        <h1 className=" text-3xl text-center pt-6 heading font-bold">
          Please Log In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
          </div>
          <div className="form-control ">
            <label className="label ">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", { required: true })}
              type={!showPassword ? "password" : "text"}
              placeholder="password"
              className="input input-bordered relative"
              required
            />
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute right-12 top-[238px]"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            <div className="flex justify-cemnter">
              <label className="label">
                <p className="label-text-alt ">
                  Do Not have an Account? Please{" "}
                  <Link
                    className="link-hover hover:text-orange text-orange"
                    to={"/register"}
                  >
                    Register
                  </Link>
                </p>
              </label>
            </div>
          </div>
          {error && <p className=" mx-auto mt-1  text-red-600">{error}</p>}
          <div className="form-control mt-6 flex flex-col gap-3">
            <button className="btn btn-primary bg-black text-white hover:bg-orange border-none">
              Login
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-3 mb-5 w-[87%] mx-auto">
          <button
            onClick={() =>
              googleLogin().then((result) => {
                toast("You Just logged in !");
                //navigate after login
                navigate(location?.state ? location.state : "/");
              })
            }
            className="btn bg-white border-black hover:border-orange hover:bg-white"
          >
            <FaGoogle size={24} />
            Sign in with Google
          </button>
          <button
            onClick={() =>
              githubLogin().then((result) => {
                //navigate after login
                toast("You Just logged in !");
                navigate(location?.state ? location.state : "/");
              })
            }
            className="btn bg-white border-black hover:border-orange hover:bg-white flex justify-center items-center gap-3"
          >
            <FaGithub size={24} />
            Sign in with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;