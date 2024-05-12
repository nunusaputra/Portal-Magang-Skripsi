import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import MagangList from "../components/Mahasiswa-Components/Magang/MagangList";
import Header from "../components/Mahasiswa-Components/Header/Header";
import Footer from "../components/Mahasiswa-Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Magang = () => {
  const [open, setOpen] = useState("view");

  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    if (!loggedIn) {
      toast.error("Anda harus login terlebih dahulu");
      navigate("/login"); // Jika tidak ada token, arahkan ke halaman login
    }
  }, []);

  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="max-w-[1080px] mx-auto sm:w-[570px] md:w-[700px] lg:w-[1080px]">
            <h2 className="text-[34px] font-[800] text-center text-blackColor">
              Temukan tempat magang{" "}
              <span className="text-primaryColor">impian </span>mu dan
              bersiaplah memulai perjalanan menuju masa depan yang{" "}
              <span className="text-primaryColor">gemilang</span>.
            </h2>
            <p className="text__para text-center">
              Kamu dapat melamar pada beberapa lowongan magang yang tersedia,
              pastikan kemampuan diri yang kamu miliki sesuai dengan kualifikasi
              yang ditentukan untuk memperbesar peluang mu diterima magang.
            </p>
            <div className="max-w-lg mx-auto rounded-lg overflow-hidden md:max-w-2xl mt-5">
              <div className="md:flex">
                <div className="w-full p-3">
                  <div className="relative">
                    <span className="py-4 px-4 rounded-full absolute top-3 left-3 bg-primaryColor">
                      <CiSearch className="absolute top-2 left-2 text-white text-lg" />
                    </span>
                    <input
                      type="text"
                      className="bg-white border-2 border-solid border-primaryColor border-opacity-50 h-14 w-full px-16 rounded-full focus:outline-none hover:cursor-pointer text-gray-500"
                      placeholder="web developer"
                    />
                    <span className="absolute top-2 right-5 border-l border-primaryColor border-opacity-50 pl-4">
                      <button className="py-2 px-6 text-white bg-primaryColor rounded-2xl font-[600]">
                        Search
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[1080px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[24px] font-[600] text-blackColor">
                Recommended Jobs
              </h3>
              <p className="text__para text-gray-500 mt-1">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div>
              <button
                onClick={() => setOpen("view")}
                className={`${
                  open === "view" && "bg-primaryColor text-white"
                } py-2 px-6 rounded-2xl mr-2 font-[600]`}
              >
                View All
              </button>
              <button
                onClick={() => setOpen("latest")}
                className={`${
                  open === "latest" && "bg-primaryColor text-white"
                } py-2 px-6 rounded-2xl mr-2 font-[600]`}
              >
                Latest Jobs
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-5">
            <div className="pb-[50px] px-[30px] rounded-md bg-[#fff] shadow-xl border-[1px] border-solid border-[#d9d9d9] h-96">
              <h2 className="text-[24px] text-blackColor font-[800] mb-5 mt-3">
                Jobs Categories
              </h2>
              <div className="grid grid-cols-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-[600] text-blackColor">
                    Backend Developer
                  </h3>
                  <p className="text__para text-gray-500 mt-1">4 Jobs</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-[600] text-blackColor">
                    Frontend Developer
                  </h3>
                  <p className="text__para text-gray-500 mt-1">5 Jobs</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-[600] text-blackColor">
                    UI/UX
                  </h3>
                  <p className="text__para text-gray-500 mt-1">6 Jobs</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-[600] text-blackColor">
                    Data Visualization
                  </h3>
                  <p className="text__para text-gray-500 mt-1">2 Jobs</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-[600] text-blackColor">
                    IT Support
                  </h3>
                  <p className="text__para text-gray-500 mt-1">3 Jobs</p>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-[600] text-blackColor">
                    Machine Learning
                  </h3>
                  <p className="text__para text-gray-500 mt-1">2 Jobs</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <MagangList />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Magang;
