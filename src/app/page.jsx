"use client";

import axios from "axios";
import { CustomModal } from "@/components/modal";
import { CommonInput } from "@/components/input";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { CommonButton } from "@/components/button";
import Navbar from "@/components/navbar";
import UserAuth from "@/components/auth";

export default function page() {
  const get_token = async () => {
    const encodedData = new URLSearchParams();
    encodedData.append(
      "client_id",
      "RvlHAFTrOHcnkvWqGYnK9Gya938mDDB1GEqaBAcCCCRvkj1l",
    );
    encodedData.append(
      "client_secret",
      "Exvh0HbdGAhlzhevWdtn8vZD4tKjszLyGvJZFnlAolgxtG1CSDSoEGx4K5TKTaO6",
    );
    const apiUrl = `https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials`;
    try {
      const response = await axios.post(apiUrl, encodedData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const token = response.data["access_token"];
      save_token(token);
      console.log(token);
      console.log("sampai sini");
    } catch (error) {
      console.log(error);
    }
  };

  const save_token = async (token) => {
    const apiUrl = "https://lime.farmaguru.id/kfatoken";
    const response = await axios.post(apiUrl, { token: token });
    const result = response.data;
    console.log(result);
  };

  const read_token = async () => {};

  const search_product = async () => {
    const token = "z7Z43dgITs9LRrHrGnFCGgkgVohr";
    const apiUrl =
      "https://api-satusehat-stg.dto.kemkes.go.id/kfa-v2/products?identifier=kfa&code=93004418";
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
  };

  const [products, setProducts] = useState([]);

  const get_product = async () => {
    const response = await fetch("https://lime.farmaguru.id/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status == 200) {
      const data = await response.json();
      console.log(data.result);
      setProducts(data.result);
      setFilterProduct(data.result);
    }
  };

  const data = [
    {
      id_product: "1",
      name: "Paracetamol",
      barcode: "abcd",
      kfa: "",
      created_by: "putu",
      created_at: "29-09-2024",
    },
  ];

  const [modalEdit, setModalEdit] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [inputData, setInputData] = useState({ barcode: "", code: "" });
  const [inputDataError, setInputDataerror] = useState([false, false]);
  const [onSubmit, setOnSubmit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    get_product();
  }, []);

  useEffect(() => {
    const filterData = products.filter((item) => {
      const name =
        item["existing_name"] &&
        item["existing_name"].toLowerCase().includes(keyword.toLowerCase());

      return name;
    });

    setFilterProduct(filterData);
  }, [keyword]);

  return (
    <UserAuth>
      <div className="relative">
        <div className="absolute  z-0 h-full w-full">
          <Navbar />

          <div className="p-5">
            <div className="w-96">
              <CommonInput
                placeholder={"Search"}
                input={keyword}
                onInputChange={(val) => {
                  setKeyword(val);
                }}
              />
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="">
                    <th className="border">No</th>
                    <th className="border">Nama</th>
                    <th className="border">Barcode</th>
                    <th className="border">Created By</th>
                    <th className="border">Created At</th>
                    <th className="border">Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  {filterProduct.length > 0 &&
                    filterProduct.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="border text-center">{index + 1}</td>
                          <td className="border px-2">
                            {item["existing_name"]}
                          </td>
                          <td className="border px-2">{item["barcode"]}</td>
                          <td className="border px-2">{item["created_by"]}</td>
                          <td className="border px-2">{item["created_at"]}</td>
                          <td className="border ">
                            <div
                              onClick={() => {
                                setSelectedData({
                                  name: item["existing_name"],
                                  barcode: item["barcode"],
                                  kfa: item["kfa"],
                                });
                                setModalEdit(true);
                              }}
                              className="flex cursor-default justify-center hover:text-strokedark"
                            >
                              <FaRegEdit />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <CustomModal
          isVisible={modalEdit}
          isSmallWidth="sm"
          onClose={() => {
            setModalEdit(false);
          }}
        >
          <h1 className="mb-5 font-bold">{`EDIT - ${selectedData.name}`}</h1>
          <div className="mb-1">Barcode</div>
          <CommonInput
            placeholder={selectedData.barcode}
            input={inputData.barcode}
            onInputChange={(val) => {
              setInputData((prev) => ({ ...prev, barcode: val }));
            }}
          ></CommonInput>
          <div className="mb-1 mt-3">Kode KFA</div>

          <CommonInput
            placeholder={selectedData.kfa}
            onInputChange={(val) => {
              setInputData((prev) => ({ ...prev, code: val }));
            }}
            error={inputDataError[1]}
            errorMessage={"Required"}
            onChg={() => {
              const newdata = [...inputDataError];
              newdata[1] = false;
              setInputDataerror(newdata);
            }}
          ></CommonInput>
          <div className="mb-5"></div>
          <CommonButton
            label={"Submit"}
            onload={onSubmit}
            disabled={onSubmit}
            onClick={async (e) => {
              e.preventDefault();

              setOnSubmit(true);
              let localError = [false, false];
              if (inputData.code == "" && selectedData.kfa == "") {
                const newdata = [...inputDataError];
                newdata[1] = true;
                setInputDataerror(newdata);
                localError = newdata;
              } else {
                const newdata = [...inputDataError];
                newdata[1] = false;
                setInputDataerror(newdata);
                localError = newdata;
              }

              if (!localError.includes(true)) {
              }
              setOnSubmit(false);
            }}
          ></CommonButton>
        </CustomModal>
      </div>
    </UserAuth>
  );
}
