"use client";
import { useState } from "react";
import ImageAtom from "../atoms/ImageAtom";
import LinkAtom from "../atoms/LinkAtom";
import LoginForm from "../molecules/Forms/SigninForm";
import SignupForm from "../molecules/Forms/SignupForm";

const Login = () => {
  const [form, setForm] = useState("signin");

  const toggleForm = () => {
    setForm(form === "signin" ? "signup" : "signin");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center">
      <div className="mt-5 px-5 w-fit">
        <LinkAtom link={"/"} properties="w-fit">
          <ImageAtom
            src="/assets/Images/back.png"
            width={30}
            height={20}
            alt={"back button"}
          />
        </LinkAtom>
      </div>
      <div className="md:w-[80%] h-full p-10 flex justify-center self-center">
        <div className=" border-red-300 hidden w-0 lg:w-[50%] lg:flex justify-center items-center">
          <video
            width="450px"
            autoPlay
            muted
            loop
            className=" object-cover rounded-xl"
          >
            <source src="/assets/Images/animation.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        {form === "signin" ? (
          <LoginForm>
            <div className="">
              <span className="text-gray-400 font-Ubuntu mx-2">
                {form === "signin"
                  ? "Don't Have an Account?"
                  : "Already Have an Account?"}
              </span>
              <button className="text-blue-400 underline" onClick={toggleForm}>
                {form === "signin" ? "SignUp" : "SignIn"}
              </button>
            </div>
          </LoginForm>
        ) : (
          <SignupForm>
            <div className="">
              <span className="text-gray-400 font-Ubuntu mx-2">
                {form === "signin"
                  ? "Don't Have an Account?"
                  : "Already Have an Account?"}
              </span>
              <button className="text-blue-400 underline" onClick={toggleForm}>
                {form === "signin" ? "SignUp" : "SignIn"}
              </button>
            </div>
          </SignupForm>
        )}
      </div>
    </div>
  );
};

export default Login;
