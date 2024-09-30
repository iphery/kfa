"use client";
import { useState } from "react";
import { CommonInput } from "@/components/input";
import { CommonButton } from "@/components/button";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [dataError, setDataError] = useState([false, false, false]);

  const register = async () => {
    console.log(dataError[0]);
    if (dataError[0] == "") {
      const newdata = [...dataError];
      newdata[0] = true;
      setDataError(newdata);
      console.log(dataError[0]);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [emailError, setEmailError] = useState("Required");
  const [onSubmit, setOnSubmit] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full flex-col p-2 sm:w-1/3">
        <CommonInput
          placeholder={"Name"}
          input={data.name}
          onInputChange={(value) => {
            setData((prev) => ({
              ...prev,
              name: value,
            }));
          }}
          error={dataError[0]}
          errorMessage={"Required"}
          onChg={() => {
            const error = [...dataError];
            error[0] = false;
            setDataError(error);
          }}
        ></CommonInput>
        <div className="mb-3"></div>
        <CommonInput
          placeholder={"Email"}
          input={data.email}
          onInputChange={(value) => {
            setData((prev) => ({
              ...prev,
              email: value,
            }));
          }}
          error={dataError[1]}
          errorMessage={"Required"}
          onChg={() => {
            const error = [...dataError];
            error[1] = false;
            setDataError(error);
          }}
        ></CommonInput>
        <div className="mb-3"></div>

        <CommonInput
          placeholder={"Password"}
          input={data.password}
          type={"password"}
          onInputChange={(value) => {
            setData((prev) => ({
              ...prev,
              password: value,
            }));
          }}
          error={dataError[2]}
          errorMessage={"Required"}
          onChg={() => {
            const error = [...dataError];
            error[2] = false;
            setDataError(error);
          }}
        ></CommonInput>
        <div className="mb-5"></div>
        <CommonButton
          label={"Register"}
          onload={onSubmit}
          disabled={onSubmit}
          onClick={async (e) => {
            e.preventDefault();
            setOnSubmit(true);

            let localError = [false, false, false];
            const error = [...dataError];
            if (data.name == "") {
              error[0] = true;
              setDataError(error);
              localError[0] = true;
            } else {
              error[0] = false;
              setDataError(error);
              localError[0] = false;
            }
            if (data.email == "") {
              error[1] = true;
              setDataError(error);
              localError[1] = true;
            } else {
              console.log(validateEmail(data.email));
              if (!validateEmail(data.email)) {
                setEmailError("Invalid email");
                error[1] = true;
                setDataError(error);
                localError[1] = true;
              } else {
                setEmailError("");
                error[1] = false;
                setDataError(error);
                localError[1] = false;
              }
            }

            if (data.password == "") {
              error[2] = true;
              setDataError(error);
              localError[2] = true;
            } else {
              error[2] = false;
              setDataError(error);
              localError[2] = false;
            }

            if (!localError.includes(true)) {
              //good to go
              const response = await fetch(
                "https://lime.farmaguru.id/register",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    data: data,
                  }),
                },
              );

              if (response.status == 200) {
                console.log("ok");
                const result = await response.json();
              } else {
                console.log("noke");
              }
            }

            setOnSubmit(false);
          }}
        />
        <div className="mb-2"></div>
        <div className="text-center text-sm">
          Already have account ?{" "}
          <span
            className="cursor-default hover:text-strokedark"
            onClick={() => {
              router.push("/");
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
