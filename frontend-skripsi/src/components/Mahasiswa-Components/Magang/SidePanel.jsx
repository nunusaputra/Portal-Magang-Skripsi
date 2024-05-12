import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  Button,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { formaterDate } from "../../../utils/FormaterDate";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SidePanel = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
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
  const [sop, setSop] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const getLowonganById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/mahasiswa/job/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
      console.error("Error fetching data:", error);
      if (error.response) {
        setMsg(error.response.data.message);
        console.log("Error message from server:", error.response.data.message);
        toast.error(msg);
      }
    }
  };

  useEffect(() => {
    getLowonganById();
  }, [id]);

  const Daftar = async (e) => {
    e.preventDefault();
    setLoading(true); // Mengatur loading menjadi true saat proses autentikasi dimulai
    try {
      const response = await axios.post(
        `http://localhost:5000/mahasiswa/job/${id}/apply`,
        {
          sop: sop,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Sukses mendaftar magang");
      navigate("/lowongan-magang");
    } catch (error) {
      let errorMsg = "Terjadi kesalahan saat mendaftar magang";
      if (error.response) {
        errorMsg = error.response.data.message || errorMsg;
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false); // Mengatur loading menjadi false setelah proses autentikasi selesai
    }
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
        <button className="btn px-2 w-full rounded-md" onClick={handleOpen}>
          Daftar Sekarang
        </button>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="mx-5">
          <form onSubmit={Daftar}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Daftar Magang Sekarang
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="desc"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Deskripsi Diri Singkat
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="desc"
                        name="desc"
                        rows={3}
                        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                        value={sop}
                        onChange={(e) => setSop(e.target.value)}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about your internship activity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="black" type="submit">
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SidePanel;
