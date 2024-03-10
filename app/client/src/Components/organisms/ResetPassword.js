"use client";
import { useState } from "react";
import ImageAtom from "../atoms/ImageAtom";
import LinkAtom from "../atoms/LinkAtom";
import ResetPasswordForm from "../molecules/Forms/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center">
      <div className="mt-5 px-5 w-fit">
        <LinkAtom link={"/login"} properties="w-fit">
          <ImageAtom
            src="/assets/Images/back.png"
            width={30}
            height={20}
            alt={"back button"}
          />
        </LinkAtom>
      </div>
      <ResetPasswordForm/>
    </div>
  );
};

export default ResetPassword;
