import React, {useState, useEffect} from "react";
import LogbookCard from "./LogbookCard";
import axios from "axios";
import {Link} from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

const LogbookList = () => {
  const [logbook, setLogbook] = useState([]);
  const token = localStorage.getItem("token");

  const getLogbook = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mahasiswa/logbook", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userId: jwtDecode(token).mhsId
        }
      })
      setLogbook(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.log("Error message from server:", error.response.data.message);
      }
    }
  }

  useEffect(() => {
    getLogbook()
  }, [])

  return (
    <div className="mt-[30px] lg:mt-[55px]">
      {logbook.length > 0 ? (
        logbook.map((item, index) => (
          <LogbookCard key={item.userId} item={item} index={index} />
        ))
      ) : (
        <main className="flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-5xl font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            No Logbook Data Found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={"/lowongan-magang"}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Daftar Magang
              </Link>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default LogbookList;
