import { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import LogbookList from "../../components/Mahasiswa-Components/Logbook/LogbookList";

import axios from "axios";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import {Link} from 'react-router-dom'

const Logbook = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dateOfPosting, setDateOfPosting] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState([]);

  // const getStatus = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/mahasiswa/job/applications",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setStatus(response.data.data);
  //     // console.log(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     if (error.response) {
  //       console.log("Error message from server:", error.response.data.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getStatus();
  // }, []);

  const UploadLogbook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/mahasiswa/logbook`,
        {
          title: title,
          desc: desc,
          dateOfPosting: dateOfPosting,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      handleOpen(!open);
      toast.success("Logbook berhasil dibuat");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
        handleOpen(!open);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-[36px] font-[800] text-blackColor">
              Logbook Magang
            </h2>
            <button className="btn mt-1" onClick={handleOpen}>
              Buat Logbook
            </button>
          </div>
          <div className="border-b border-gray-900/10 pb-2"></div>
          <div
            className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
            data-aos="fade-right"
          >
            {/* Tabs buttons */}
            <LogbookList />
          </div>
        </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="mx-5">
          <form onSubmit={UploadLogbook}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Logbook Magang
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title Logbook
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="title"
                        placeholder="Logbook Minggu Ke-1"
                        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Tanggal
                    </label>
                    <div className="mt-2">
                      <input
                        id="date"
                        name="date"
                        type="date"
                        autoComplete="date"
                        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                        value={dateOfPosting}
                        onChange={(e) => setDateOfPosting(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="desc"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Deskripsi Kegiatan
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="desc"
                        name="desc"
                        rows={3}
                        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
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
                {loading ? (
                  <HashLoader color="#fff" size={20} />
                ) : (
                  <span>Upload</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default Logbook;
