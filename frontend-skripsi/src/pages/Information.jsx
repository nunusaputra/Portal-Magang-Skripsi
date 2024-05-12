import React, { useState, useEffect } from "react";
import { TbSpeakerphone } from "react-icons/tb";
import InformationList from "../dashboard-mhs/Information-Page/InformationList";
import { FaQuoteLeft } from "react-icons/fa";
import FaqList from "../components/Mahasiswa-Components/Faqs/FaqList";
import Header from "../components/Mahasiswa-Components/Header/Header";
import Footer from "../components/Mahasiswa-Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Information = () => {
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
        <div className="max-w-[1270px] px-5 mx-auto cursor-pointer">
          <div className="grid md:grid-cols-1 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md bg-[#fff] shadow-xl border-[1px] border-solid border-[#d9d9d9] rounded-md bg-[#fff] shadow-xl border-[1px] border-solid border-[#d9d9d9]">
              <div className="flex mb-10 mt-10">
                <TbSpeakerphone className="text-4xl text-blackColor mt-3 mx-5" />
                <h2 className="text-[28px] text-blackColor mt-2 font-[800]">
                  Informasi Terbaru
                </h2>
              </div>

              <InformationList />
            </div>
          </div>
        </div>

        <div className="max-w-[1270px] px-5 mx-auto mt-20">
          <div className="flex">
            <FaQuoteLeft className="text-4xl text-blackColor mt-3 mx-5" />
            <h2 className="text-[36px] text-blackColor font-[500]">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <FaqList />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Information;
