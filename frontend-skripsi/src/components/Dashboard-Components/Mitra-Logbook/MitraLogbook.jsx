import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { MdLibraryBooks } from "react-icons/md";
import MitraLogbookList from "./MitraLogbookList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const MitraLogbook = () => {
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
                <MdLibraryBooks className="text-4xl text-blackColor mt-3 mx-5" />
                <h2 className="text-[28px] text-blackColor mt-2 font-[800]">
                  Logbook Magang
                </h2>
              </div>
              <p className="ml-5 mt-1 text-sm leading-6 text-gray-600">
                Mitra dapat melihat logbook yang dibuat oleh mahasiswa.
              </p>

              <MitraLogbookList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MitraLogbook;
