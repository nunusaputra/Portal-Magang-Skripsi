import React, { useState, useEffect } from "react";
import { MdWork } from "react-icons/md";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { toast } from "react-toastify";

const AddLowongan = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [maxPos, setMaxPos] = useState("");
  const [duration, setDuration] = useState("");
  const [maxApp, setMaxApp] = useState("");
  const [salary, setSalary] = useState("");
  const [skillSets, setSkillSets] = useState("");
  const [datePos, setDatePos] = useState("");
  const [deadline, setDeadline] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");

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

  const saveLowongan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/mitra/job", {
        jobTitle: jobTitle,
        jobType: jobType,
        maxPositions: maxPos,
        maxApplicants: maxApp,
        duration: duration,
        salary: salary,
        skillSet: skillSets,
        jobPost: datePos,
        deadline: deadline,
        desc: desc,
      });
      toast.success("Berhasil Membuat Informasi");
      navigate("/dashboard/information");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
      toast.error(msg);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="max-w-[1270px] px-5 mx-auto cursor-pointer mt-10">
          <div className="grid md:grid-cols-1 gap-10">
            <div className="mb-10">
              <form onSubmit={saveLowongan}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Buat Lowongan Magang
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Mitra dapat membuat lowongan magang sesuai posisi yang
                      dibutuhkan.
                    </p>

                    {msg.length > 0 && (
                      <p className="mt-3 rounded-md p-2 cursor-pointer text-md items-center mb-3 gap-x-4 bg-red-700 bg-opacity-40 text-center text-red-800 font-[600]">
                        {msg}
                      </p>
                    )}

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nama Pekerjaan
                        </label>
                        <div className="mt-2">
                          <input
                            id="title"
                            name="title"
                            type="text"
                            autoComplete="title"
                            placeholder="Backend Developer Intern"
                            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="maxApplicants"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Maksimal Pelamar
                        </label>
                        <div className="mt-2">
                          <input
                            id="maxApplicants"
                            name="maxApplicants"
                            type="number"
                            autoComplete="author"
                            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                            value={maxApp}
                            onChange={(e) => setMaxApp(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="maxPosition"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Maksimal Posisi
                        </label>
                        <div className="mt-2">
                          <input
                            id="maxPosition"
                            name="maxPosition"
                            type="number"
                            autoComplete="author"
                            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                            value={maxPos}
                            onChange={(e) => setMaxPos(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="type"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Tipe Pekerjaan
                        </label>
                        <div className="mt-2">
                          <select
                            id="type"
                            name="type"
                            autoComplete="type-name"
                            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                          >
                            <option>Select a job type</option>
                            <option value="Internship">Internship</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="durasi"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Durasi Magang
                        </label>
                        <div className="mt-2">
                          <select
                            id="durasi"
                            name="durasi"
                            autoComplete="durasi-name"
                            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                          >
                            <option>Select a duration internship</option>
                            <option value="1 Month">1 Month</option>
                            <option value="2 Month">2 Month</option>
                            <option value="3 Month">3 Month</option>
                            <option value="4 Month">4 Month</option>
                            <option value="5 Month">5 Month</option>
                            <option value="6 Month">6 Month</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="salary"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Uang Saku
                        </label>
                        <div className="mt-2">
                          <input
                            id="salary"
                            name="salary"
                            type="number"
                            autoComplete="author"
                            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="skillSets"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Skill Requirements
                        </label>
                        <div className="mt-2">
                          <input
                            id="skillSets"
                            name="skillSets"
                            type="text"
                            autoComplete="author"
                            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                            value={skillSets}
                            onChange={(e) => setSkillSets(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="JobPost"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Tanggal Lowongan Dibuat
                        </label>
                        <div className="mt-2">
                          <input
                            id="JobPost"
                            name="JobPost"
                            type="date"
                            autoComplete="author"
                            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                            value={datePos}
                            onChange={(e) => setDatePos(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="deadline"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Tanggal Lowongan Kadaluarsa
                        </label>
                        <div className="mt-2">
                          <input
                            id="deadline"
                            name="deadline"
                            type="date"
                            autoComplete="author"
                            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="desc"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Deskripsi Pekerjaan
                        </label>
                        <div className="mt-2">
                          <CKEditor
                            editor={ClassicEditor}
                            data={desc}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setDesc(data);
                            }}
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          Tulis informasi yang ingin anda sampaikan di sini.
                        </p>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLowongan;
