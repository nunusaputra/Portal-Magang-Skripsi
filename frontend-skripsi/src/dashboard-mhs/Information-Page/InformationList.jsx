import React, { useState, useEffect } from "react";
import InformationCard from "./InformationCard";
import axios from "axios";

const InformationList = () => {
  const [informasi, setInformasi] = useState([]);

  const getInformasi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/mahasiswa/information",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInformasi(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.log("Error message from server:", error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getInformasi();
  }, []);

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {informasi.length > 0 ? (
        informasi.map((item, index) => (
            <InformationCard key={index} item={item} index={index} />
          ))
        ) : (
          <main className="flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-5xl font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              No Information Found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      )}
          </div>
    </>
  );
};

export default InformationList;
