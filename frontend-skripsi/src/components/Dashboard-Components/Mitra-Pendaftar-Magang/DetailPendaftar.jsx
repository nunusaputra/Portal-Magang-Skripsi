import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { PaperClipIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

const DetailPendaftar = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [cv, setCV] = useState("");
  const [jobTitle, setJobTitle] = useState("");
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
      navigate("/dashboard/lowongan-magang");
    }
  }, [isError, navigate, user]);

  useEffect(() => {
    const getPendaftarById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/mitra/applications/${id}`
        );
        const { Mahasiswa, sop, job } = response.data.data;
        setName(Mahasiswa.name);
        setDesc(sop);
        setPhone(Mahasiswa.no_hp);
        setEmail(Mahasiswa.email);
        setCV(Mahasiswa.cv);
        setJobTitle(job.jobTitle);
        setStatus(response.data.data.status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getPendaftarById();
  }, [id]);

  const handleAccept = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/mitra/applications/status/${id}`, {
        status: "accepted",
        dateOfJoining: new Date().toISOString()
      });
      toast.success(response.data.message);
      setStatus("accepted");
      navigate("/dashboard/pendaftar-magang");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  const handleReject = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/mitra/applications/status/${id}`, {
        status: "rejected",
      });
      toast.success(response.data.message);
      setStatus("rejected");
      navigate("/dashboard/pendaftar-magang");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="max-w-[1270px] px-5 mx-auto mt-20">
          <div className="mx-5">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Applicant Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Application for
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {jobTitle}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <a href={`mailto:${email}`}>
                      <span className="text-primaryColor hover:underline hover:decoration-solid">
                        {email}
                      </span>
                    </a>
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Nomer Telpon
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">
                      <span className="text-primaryColor hover:underline hover:decoration-solid">
                        {phone}
                      </span>
                    </a>
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    About
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {desc}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Attachments
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul
                      role="list"
                      className="divide-y divide-gray-100 rounded-md border border-gray-200"
                    >
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              resume_back_end_developer.pdf
                            </span>
                            <span className="flex-shrink-0 text-gray-400">
                              2.4mb
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href="https://google.com"
                            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleAccept}
            >
              Terima
            </button>
            <button
              type="button"
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleReject}
            >
              Tolak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPendaftar;
