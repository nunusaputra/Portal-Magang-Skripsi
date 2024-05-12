import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

const UbahPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/auth/login");
    }
  }, [isError, navigate]);

  const updatePass = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/admin/change-pass/${id}`, {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confPassword: confPassword,
      });
      toast.success("Berhasil Mengubah Password");
      navigate("/dashboard/information");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="max-w-[1270px] px-5 mx-auto cursor-pointer mt-10">
            <form onSubmit={updatePass}>
            {msg.length > 0 && (
              <p className="rounded-md p-2 cursor-pointer text-md items-center mb-3 gap-x-4 bg-red-700 bg-opacity-40 text-center text-red-800 font-[600]">
                {msg}
              </p>
              )}
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="lastPassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password Lama
                      </label>
                      <div className="mt-2">
                        <input
                          id="lastPassword"
                          name="lastPassword"
                          type="password"
                          autoComplete="lastPassword"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password Baru
                      </label>
                      <div className="mt-2">
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          autoComplete="newPassword"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="confPassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Konfirmasi Password Baru
                      </label>
                      <div className="mt-2">
                        <input
                          id="confPassword"
                          name="confPassword"
                          type="password"
                          autoComplete="confPassword"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={confPassword}
                          onChange={(e) => setConfPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UbahPassword;
