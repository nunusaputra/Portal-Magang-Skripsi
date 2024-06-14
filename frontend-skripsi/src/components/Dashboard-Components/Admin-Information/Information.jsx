import React, { useState, useEffect } from "react";
import { TbSpeakerphone } from "react-icons/tb";
import InformationList from "./InformationList";
import { CiCirclePlus } from "react-icons/ci";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import {
  Dialog,
  Button,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const Information = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

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
    if (user && user.data.role !== "admin") {
      navigate("/error-pages");
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
              <div className="flex mb-5">
                <TbSpeakerphone className="text-4xl text-blackColor mt-3 mx-5" />
                <h2 className="text-[28px] text-blackColor mt-2 font-[800]">
                  Informasi Terbaru
                </h2>
              </div>

              <InformationList />
              <Link to={"/dashboard/add-information"}>
              <button
                className="fixed bottom-5 right-5 bg-[#F1F1FA] text-black shadow-xl font-bold py-5 px-5 rounded-full w-20 h-20 flex items-center justify-center"
                onClick={handleOpen}
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

export default Information;
