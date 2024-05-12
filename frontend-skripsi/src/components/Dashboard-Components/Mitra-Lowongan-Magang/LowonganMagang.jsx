import React, { useState, useEffect } from "react";
import { MdWork } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import LowonganList from "./LowonganList";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const LowonganMagang = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/auth/login");
    }
    if (user && user.data.role !== "mitra") {
      navigate("/dashboard/information");
    }
  }, [isError, navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="max-w-[1270px] px-5 mx-auto cursor-pointer mt-10">
          <div className="grid md:grid-cols-1 gap-10">
            <div>
              <div className="flex">
                <MdWork className="text-4xl text-blackColor mt-3 mx-5" />
                <h2 className="text-[28px] text-blackColor mt-2 font-[800]">
                  Lowongan Magang
                </h2>
              </div>
              <p className="ml-5 mt-1 text-sm leading-6 text-gray-600">
                Mitra dapat melihat lowongan magang yang telah dibuat.
              </p>

              <LowonganList />
              <Link to={"/dashboard/lowongan-magang/create"}>
              <button
                className="fixed bottom-5 right-5 bg-[#F1F1FA] text-black shadow-xl font-bold py-5 px-5 rounded-full w-20 h-20 flex items-center justify-center"
              >
                <CiCirclePlus className="text-6xl font-[800]" />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowonganMagang;
