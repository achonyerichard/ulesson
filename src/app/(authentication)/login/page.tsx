"use client";
import Image from "next/image";

import { Input } from "@chakra-ui/react";

// import { useMutate } from "@/hooks/useHttpRequest";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "@/hooks/useAuth";

interface IFormInput {
  username: string;
  password: string;
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { login, isLoading } = useAuth();
  const onSubmit: SubmitHandler<IFormInput> = (data: any) => login(data);
  const [passwordtoggle, setPasswordToggle] = useState(true);

  const sign = async () => {
    try {
      const test = await fetch("/api/auth/login", {
        body: JSON.stringify({
          username: "richard",
          password: "12345",
        }),
        method: "POST",
      });
    } catch (err) {}
  };
  // const { mutate, isLoading } = useMutate(
  //   "post",
  //   "auth/adminLogin",
  //   (data) => {
  //     console.log(data);
  //   },
  //   undefined,
  //   (err) => {},
  // );

  const submitHandler = (e: SyntheticEvent) => {
    // e.preventDefault();
    // if (!emailRegex.test(login.email.trim())) {
    //   handleErrorChange("email", true, "Please enter a valid email");
    // } else if (login.password.trim().length < 7) {
    //   handleErrorChange(
    //     "password",
    //     true,
    //     "Password must be atleast seven characters",
    //   );
    // } else {
    //   mutate(login);
    // }
  };

  return (
    <div className="h-fit">
      {" "}
      <span className="flex justify-center items-center">
        <Image
          src="/images/logo.png"
          width={500}
          height={500}
          alt="auth_logo"
          className="mb-10 h-auto max-w-[189px] rounded-3xl object-cover"
        />{" "}
      </span>
      <h3 className="mb-7 text-4xl lg:text-[56px] font-bold text-white text-center lg:text-left">
        Welcome Back
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-10/12">
        <div className="mb-7 w-full">
          <Input
            id="username"
            className={`transition3 w-full bg-gray focus:border-gray-500 h-14 text-white ${
              errors?.username ? "border-primary text-primary" : ""
            }`}
            placeholder="Username"
            {...register("username", { required: "Username is required" })}

            // message={error.email.message}
          />{" "}
          {errors?.username && (
            <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
              {errors?.username.message}
            </span>
          )}
        </div>
        <div className="relative mb-7 w-full">
          <Input
            id="password"
            type={passwordtoggle ? "password" : "text"}
            className={`transition3 w-full bg-gray-100 focus:border-gray-500 text-white h-14 ${
              errors?.password ? "border-primary text-primary" : ""
            }`}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}

            // message={error.password.message}
          />
          <div className="absolute inset-y-0 right-0 -top-1 pr-3 flex items-center text-sm leading-5">
            <span
              onClick={() => setPasswordToggle(!passwordtoggle)}
              className="cursor-pointer"
            >
              {!passwordtoggle ? (
                <svg
                  className="h-6  fill-white"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="EyeOutlineIcon"
                >
                  <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
                </svg>
              ) : (
                <svg
                  className="h-6  fill-white"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="EyeOffOutlineIcon"
                >
                  <path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z"></path>
                </svg>
              )}
            </span>
          </div>

          {errors?.password && (
            <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
              {errors?.password?.message}
            </span>
          )}
        </div>

        <Button
          colorScheme="red"
          className="h-14 w-full "
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="10" /> : <>Log In</>}
        </Button>
      </form>
    </div>
  );
};

export default Page;
