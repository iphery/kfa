"use client";
import { CommonButton } from "@/components/button";
import { CommonInput } from "@/components/input";
import { useState } from "react";

export default function page() {
  const [file, setFile] = useState();
  const [onSubmit, setOnSubmit] = useState(false);

  const send_file = async () => {
    setOnSubmit(true);
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://lime.farmaguru.id/upload", {
        method: "POST",
        body: formData,
        credentials: "include", // Optional, if you're working with authentication and cookies
      });

      if (response.status == 200) {
        const result = await response.json();
        console.log(result);
      }

      /*
      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully:", data);
      } else {
        console.error("File upload failed:", response.statusText);
      }
        */
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setOnSubmit(false);
  };

  return (
    <div className="w-72 p-5">
      <input
        className="w-full border border-strokedark p-2"
        placeholder={"File"}
        type="file"
        input={file}
        accept=".xlsx"
        onChange={(event) => {
          const selectedFile = event.target.files[0];
          setFile(selectedFile);
        }}
      />
      <div className="mb-3"></div>
      <CommonButton label={"Upload"} onClick={send_file} />
    </div>
  );
}
