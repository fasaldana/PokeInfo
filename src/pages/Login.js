import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../api/usersService";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const users = await fetchUsers();
      const user = users.find(
        (user) =>
          user.username === data.username && user.password === data.password
      );

      if (user) {
        localStorage.setItem("token", true);
        navigate("/");
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error(error.message);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-backgd h-screen flex items-center justify-center">
      <div className="bg-white flex flex-col md:w-2/6 p-5 shadow-2xl">
        <img
          src="/images/pokeball.png"
          alt="Pokeball image"
          className="max-w-20 self-center"
        />
        <h1 className="text-[30px] self-center">POKE INFO</h1>
        <p className="text-center mt-2">
          Login to have access to a list of Pokemon :D
        </p>
        <form className="flex flex-col p-10" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="border-b-2 focus:outline-none focus:border-b-4"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-error">This field is required</span>
          )}
          <input
            className="border-b-2 mt-10 focus:outline-none focus:border-b-4"
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-error">This field is required</span>
          )}
          <button className="bg-primary p-2 mt-10 text-white" type="submit">
            Login
          </button>
          {error && <span className="text-error mt-2">{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
