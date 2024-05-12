import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formaterDate } from "../../../utils/FormaterDate";
import { toast } from "react-toastify";

const SidepanelMitra = () => {
  const { id } = useParams();
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [maxPos, setMaxPos] = useState("");
  const [duration, setDuration] = useState("");
  const [maxApp, setMaxApp] = useState("");
  const [salary, setSalary] = useState("");
  const [datePos, setDatePos] = useState("");
  const [deadline, setDeadline] = useState("");
  const [accCan, setAccCan] = useState("");
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

  useEffect(() => {
    const getLowonganById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/mitra/job/${id}`
        );
        // setIdMagang(response.data.data.id);
        setJobTitle(response.data.data.jobTitle);
        setJobType(response.data.data.jobType);
        setMaxPos(response.data.data.maxPositions);
        setDuration(response.data.data.duration);
        setMaxApp(response.data.data.maxApplicants);
        setSalary(response.data.data.salary);
        setDatePos(response.data.data.jobPost);
        setDeadline(response.data.data.deadline);
        setAccCan(response.data.data.acceptedCandidates);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getLowonganById();
  }, [id]);

  const deleteMagang = async (userId) => {
    await axios.delete(`http://localhost:5000/mitra/job/${userId}`);
    toast.success("Berhasil Menghapus Lowongan");
    navigate("/dashboard/lowongan-magang");
  };

  return (
    <>
      <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
        <div className="flex items-center justify-between">
          <p className="text__para mt-0 font-semibold">
            <span className="font-bold">{jobTitle}</span> ({jobType})
          </p>
        </div>

        <div className="mt-[30px]">
          <p className="text__para mt-0 font-semibold text-headingColor">
            Detail Info
          </p>

          <ul className="mt-3">
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-bold">
                Salary
              </p>
              <p className="text-[15px] leading-6 text-textColor font-normal">
                {salary.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </li>
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-bold">
                Job Posting
              </p>
              <p className="text-[15px] leading-6 text-textColor font-normal">
                {formaterDate(datePos)}
              </p>
            </li>
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-bold">
                Deadline
              </p>
              <p className="text-[15px] leading-6 text-textColor font-normal">
                {formaterDate(deadline)}
              </p>
            </li>
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-bold">
                Posisi Dibutuhkan
              </p>
              <p className="text-[15px] leading-6 text-textColor font-normal">
                {maxPos} posisi
              </p>
            </li>
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-bold">
                Maksimal Pelamar
              </p>
              <p className="text-[15px] leading-6 text-textColor font-normal">
                {maxApp} pelamar
              </p>
            </li>
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-bold">
                Posisi Terisi
              </p>
              <p className="text-[15px] leading-6 text-textColor font-normal">
                {accCan} / {maxPos} posisi
              </p>
            </li>
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-bold">
                Durasi Magang
              </p>
              <p className="text-[15px] leading-6 text-textColor font-normal">
                {duration}
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={() => deleteMagang(id)}
          >
            Hapus Magang
          </button>

          <Link to={`/dashboard/lowongan-magang/edit/${id}`}>
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Edit Magang
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SidepanelMitra;
