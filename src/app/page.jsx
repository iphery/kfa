"use client";

import axios from "axios";
import { CustomModal } from "@/components/modal";
import { CommonInput } from "@/components/input";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { CommonButton } from "@/components/button";
import Navbar from "@/components/navbar";
import UserAuth from "@/components/auth";
import { CustomSelect } from "@/components/select";

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
  const [idUser, setIdUser] = useState("");

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

      setProducts(data.result);
      setFilterProduct(data.result);
      setIdUser(data.user);
      console.log(data.result);
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
  const [inputData, setInputData] = useState({
    barcode: "",
    kfa: "",
    name: "",
    type: "",
  });
  const [inputDataError, setInputDataerror] = useState([false, false, false]);
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

  const formatdate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const optionData = [
    { label: "Obat Keras", value: "Obat Keras" },
    { label: "Obat Lunak", value: "Obat Lunak" },
  ];

  return (
    <UserAuth>
      <div className="relative">
        <div className="absolute  z-0 h-full w-full">
          <Navbar />

          <div className="p-5">
            <div className="w-full sm:w-96">
              <CommonInput
                placeholder={"Search"}
                input={keyword}
                onInputChange={(val) => {
                  setKeyword(val);
                }}
              />
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full ">
                <thead>
                  <tr className="">
                    <th className="border px-2">No</th>
                    <th className="border px-2">Nama</th>
                    <th className="border px-2">Barcode</th>
                    <th className="border px-2">Kode KFA</th>
                    <th className="border px-2">Kategori</th>
                    <th className="border px-2">Updated By</th>
                    <th className="border  px-2">Updated At</th>

                    <th className="border px-2">Opsi</th>
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
                          <td className="border px-2">{item["id_kfa"]}</td>
                          <td className="border px-2">{item["type"]}</td>
                          <td className="border px-2">{item["username"]}</td>
                          <td className="border px-2 text-sm">
                            {item["updated_at"] == null
                              ? ""
                              : formatdate(item["updated_at"])}
                          </td>

                          <td className="border ">
                            {item["updated_by"] == null ||
                            item["updated_by"] == idUser ? (
                              <div
                                onClick={() => {
                                  setSelectedData({
                                    name: item["existing_name"],
                                    barcode: item["barcode"],
                                    kfa:
                                      item["id_kfa"] == null
                                        ? ""
                                        : item["id_kfa"],
                                    type: item["type"],
                                  });
                                  setInputData((prev) => ({
                                    ...prev,
                                    id_product: item["id_product"],
                                    name: item["existing_name"],
                                    barcode: item["barcode"],
                                    kfa:
                                      item["id_kfa"] == null
                                        ? ""
                                        : item["id_kfa"],
                                    type: item["type"],
                                  }));
                                  setModalEdit(true);
                                }}
                                className="flex cursor-default justify-center hover:text-strokedark"
                              >
                                <FaRegEdit />
                              </div>
                            ) : (
                              <></>
                            )}
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
            setInputDataerror([false, false, false]);
            setModalEdit(false);
          }}
        >
          <h1 className="mb-5 font-bold">{`EDIT - ${selectedData.name}`}</h1>
          <div className="mb-1">Nama</div>
          <CommonInput
            //placeholder={selectedData.name}
            input={inputData.name}
            onInputChange={(val) => {
              setInputData((prev) => ({ ...prev, name: val }));
            }}
            error={inputDataError[2]}
            errorMessage={"Required"}
            onChg={() => {
              const newdata = [...inputDataError];
              newdata[2] = false;
              setInputDataerror(newdata);
            }}
          ></CommonInput>
          <div className="mb-1 mt-3">Barcode</div>
          <CommonInput
            //placeholder={selectedData.barcode}
            input={inputData.barcode}
            onInputChange={(val) => {
              setInputData((prev) => ({ ...prev, barcode: val }));
            }}
            error={inputDataError[0]}
            errorMessage={"Required"}
            onChg={() => {
              const newdata = [...inputDataError];
              newdata[0] = false;
              setInputDataerror(newdata);
            }}
          ></CommonInput>
          <div className="mb-1 mt-3">Kode KFA</div>

          <CommonInput
            //placeholder={selectedData.kfa}
            input={inputData.kfa}
            onInputChange={(val) => {
              setInputData((prev) => ({ ...prev, kfa: val }));
            }}
            error={inputDataError[1]}
            errorMessage={"Required"}
            onChg={() => {
              const newdata = [...inputDataError];
              newdata[1] = false;
              setInputDataerror(newdata);
            }}
          ></CommonInput>
          <div className="mb-1 mt-3">Kategori</div>
          <CustomSelect
            optionData={optionData}
            placeholder={selectedData.type}
            onSelected={(option) => {
              console.log(option);
              if (option != null) {
                setInputData((prev) => ({ ...prev, type: option.value }));
              } else {
                setInputData((prev) => ({ ...prev, type: "" }));
              }
            }}
          />
          <div className="mb-5"></div>

          <CommonButton
            label={"Submit"}
            onload={onSubmit}
            disabled={onSubmit}
            onClick={async (e) => {
              e.preventDefault();

              setOnSubmit(true);
              let localError = [false, false, false];
              const newdata = [...inputDataError];
              if (inputData.barcode == "") {
                newdata[0] = true;
                setInputDataerror(newdata);
                localError = newdata;
              } else {
                newdata[0] = false;
                setInputDataerror(newdata);
                localError = newdata;
              }

              if (inputData.kfa == "") {
                newdata[1] = true;
                setInputDataerror(newdata);
                localError = newdata;
              } else {
                newdata[1] = false;
                setInputDataerror(newdata);
                localError = newdata;
              }

              if (inputData.name == "") {
                newdata[2] = true;
                setInputDataerror(newdata);
                localError = newdata;
              } else {
                newdata[2] = false;
                setInputDataerror(newdata);
                localError = newdata;
              }

              if (!localError.includes(true)) {
                console.log(inputData);
                const response = await fetch(
                  "https://lime.farmaguru.id/productupdate",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ data: inputData, user: idUser }),
                  },
                );

                if (response.status == 200) {
                  const result = await response.json();
                  const updatedData = result.result[0];
                  console.log(updatedData);
                  const newproductdata = [...filterProduct];

                  const newproducts = newproductdata.map((item) =>
                    item.id_product === updatedData.id_product
                      ? {
                          ...item,
                          existing_name: updatedData.existing_name,
                          barcode: updatedData.barcode,
                          id_kfa: updatedData.id_kfa,
                          username: updatedData.username,
                          updated_at: updatedData.updated_at,
                        }
                      : item,
                  );
                  setFilterProduct(newproducts);

                  setModalEdit(false);
                }
              }
              setOnSubmit(false);
            }}
          ></CommonButton>
        </CustomModal>
      </div>
    </UserAuth>
  );
}
