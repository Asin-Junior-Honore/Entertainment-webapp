import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
//check the read.md file to know more about the login componet
const LoginForm = (props) => {
  const schema = yup.object().shape({
    Firstname: yup.string().required(),
    Lastname: yup.string().required(),
    Username: yup.string().required(),
    Email: yup.string().email().required(),
    Age: yup.number().positive().integer().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    navigate("/", { state: data.Username });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Firstname..."
          {...register("Firstname")}
        />
        <p> {errors.Firstname?.message} </p>
        <input
          type="text"
          placeholder="Lastname..."
          {...register("Lastname")}
        />
        <p> {errors.Lastname?.message} </p>
        <input
          type="text"
          placeholder="Username..."
          {...register("Username")}
        />
        <p> {errors.Username?.message} </p>
        <input type="email" placeholder="Email..." {...register("Email")} />
        <p> {errors.Email?.message} </p>

        <input type="number" placeholder="Age..." {...register("Age")} />
        <p> {errors.Age?.message} </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
