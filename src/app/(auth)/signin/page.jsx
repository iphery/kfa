"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CommonInput } from "@/components/input";
import { CommonButton } from "@/components/button";
import { useState } from "react";

export default function page() {
  const login = async () => {};
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [inputDataError, setInputDataError] = useState([false, false]);
  const [onSubmit, setOnSubmit] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full flex-col sm:w-1/3">
        <div className="flex justify-center">
          <h1 className="mb-3 font-bold">BWF MAPPING</h1>
        </div>
        <CommonInput
          placeholder={"Email"}
          input={inputData.email}
          onInputChange={(value) => {
            setInputData((prev) => ({ ...prev, email: value }));
          }}
          error={inputDataError[0]}
          errorMessage={"Required"}
          onChg={() => {
            const newdata = [...inputDataError];
            newdata[0] = false;
            setInputDataError(newdata);
          }}
        ></CommonInput>
        <div className="mb-3"></div>
        <CommonInput
          placeholder={"Password"}
          type={"password"}
          input={inputData.passsword}
          onInputChange={(value) => {
            setInputData((prev) => ({ ...prev, password: value }));
          }}
          error={inputDataError[1]}
          errorMessage={"Required"}
          onChg={() => {
            const newdata = [...inputDataError];
            newdata[1] = false;
            setInputDataError(newdata);
          }}
        ></CommonInput>
        <div className="mb-3"></div>

        <CommonButton
          label={"Login"}
          onload={onSubmit}
          disabled={onSubmit}
          onClick={async (e) => {
            e.preventDefault();
            setOnSubmit(true);
            let localError = [false, false];
            const newdata = [...inputDataError];
            if (inputData.email == "") {
              newdata[0] = true;
              setInputDataError(newdata);
              localError[0] = true;
            } else {
              newdata[0] = false;
              setInputDataError(newdata);
              localError[0] = false;
            }

            if (inputData.password == "") {
              newdata[1] = true;
              setInputDataError(newdata);
              localError[1] = true;
            } else {
              newdata[1] = false;
              setInputDataError(newdata);
              localError[1] = false;
            }

            if (!localError.includes(true)) {
              console.log("ok");
              const response = await fetch("https://lime.farmaguru.id/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ data: inputData }),
              });
              if (response.status == 200) {
                const result = await response.json();
                if (result.error == 0) {
                  window.location.reload();
                } else {
                  //error client
                }
              } else {
                //ini error server
              }
            }
            setOnSubmit(false);
          }}
        />
        <div className="mb-2"></div>
        <div className="text-center text-sm">
          Don't have account ?{" "}
          <span className="cursor-default hover:text-strokedark">Register</span>
        </div>
      </div>
    </div>
  );
}
