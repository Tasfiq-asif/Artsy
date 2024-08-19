import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Provider/Provider";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      photo: "",
    },
  });

  const onSubmit = (data,e) => {
    e.preventDefault()
    const { name, photo, email, password } = data;

    if (password.length < 6) {
      setError("Password must be 6 characters or more");
      return;
    } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      setError("There must be one uppercase and one lowercase letter");
      return;
    }
    //create user
    setError("");
    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photo);
        toast("Registration Successful !");
        const user={email}
        fetch('https://artsio-server.vercel.app/users',{
          method: 'POST',
          headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data=>console.log(data))
        if (result.user) {
          navigate(location?.state || "/");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message.replace("Firebase: ", ""));
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register Luxuria</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 ">
        <h1 className=" text-3xl text-center pt-6 heading font-bold">
          Please Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", {
                required: true,
                min: 6,
              })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo url</span>
            </label>
            <input
              type="url"
              className="input input-bordered"
              placeholder="photo url"
              {...register("photo", {})}
            />
          </div>
          <div className="flex justify-center">
            <label className="label">
              <p className="label-text-alt link link-hover">
                Already Registered? Log in{" "}
                <Link to={"/login"} className=" text-orange font-bold">
                  {" "}
                  Here
                </Link>
              </p>
            </label>
          </div>
          {error && <p className=" mx-auto mt-1  text-red-600">{error}</p>}
          <div className="form-control mt-6">
            <button className="btn btn-primary bg-black text-white hover:bg-orange border-none">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;