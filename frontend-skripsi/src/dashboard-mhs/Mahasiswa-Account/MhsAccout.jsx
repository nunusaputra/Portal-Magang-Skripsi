import React, { useState, useEffect } from "react";
import wisnu3 from "../../assets/images/wisnu3.png";
import Profile from "./Profile";
import UbahPassword from "./UbahPassword";
import StatusMagang from "./StatusMagang";
import Dospem from "./Dospem";
import Laporan from "./Laporan";
import Logbook from "./Logbook";
import Header from "../../components/Mahasiswa-Components/Header/Header";
import Footer from "../../components/Mahasiswa-Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MhsAccount = () => {
  const [tab, setTab] = useState("profile");
  
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
        <div className="max-w-[1270px] px-5 mx-auto">
          <h2 className="text-[46px] leading-9 text-[#000] font-[800] mb-10">
            Dashboard
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card sidebar */}
            <div className="pb-[50px] px-[30px] rounded-md bg-[#fff] shadow-xl border-[1px] border-solid border-[#d9d9d9] h-96">
              <div className="grid grid-cols-1">
                <button
                  onClick={() => setTab("profile")}
                  className={`${
                    tab === "profile" &&
                    "bg-primaryColor bg-opacity-30 text-primaryColor font-black border-l-4 border-solid border-primaryColor p-5"
                  } py-3 px-3 text-[#000] font-semibold mt-2 text-left rounded-md`}
                >
                  Detail Profile
                </button>
                <button
                  onClick={() => setTab("changePass")}
                  className={`${
                    tab === "changePass" &&
                    "bg-primaryColor bg-opacity-30 text-primaryColor font-black border-l-4 border-solid border-primaryColor p-5"
                  } py-3 px-3 text-[#000] font-semibold mt-2 text-left rounded-md`}
                >
                  Ubah Password
                </button>
                <button
                  onClick={() => setTab("status")}
                  className={`${
                    tab === "status" &&
                    "bg-primaryColor bg-opacity-30 text-primaryColor font-black border-l-4 border-solid border-primaryColor p-5"
                  } py-3 px-3 text-[#000] font-semibold mt-2 text-left rounded-md`}
                >
                  Status Magang
                </button>
                <button
                  onClick={() => setTab("dospem")}
                  className={`${
                    tab === "dospem" &&
                    "bg-primaryColor bg-opacity-30 text-primaryColor font-black border-l-4 border-solid border-primaryColor p-5"
                  } py-3 px-3 text-[#000] font-semibold mt-2 text-left rounded-md`}
                >
                  Pengajuan Dosen Pembimbing
                </button>
                <button
                  onClick={() => setTab("laporan")}
                  className={`${
                    tab === "laporan" &&
                    "bg-primaryColor bg-opacity-30 text-primaryColor font-black border-l-4 border-solid border-primaryColor p-5"
                  } py-3 px-3 text-[#000] font-semibold mt-2 text-left rounded-md`}
                >
                  Laporan Magang
                </button>
                <button
                  onClick={() => setTab("logbook")}
                  className={`${
                    tab === "logbook" &&
                    "bg-primaryColor bg-opacity-30 text-primaryColor font-black border-l-4 border-solid border-primaryColor p-5"
                  } py-3 px-3 text-[#000] font-semibold mt-2 text-left rounded-md`}
                >
                  Logbook
                </button>
              </div>
            </div>

            {/* Card content */}
            <div className="md:col-span-2 md:px-[30px] ">
              {tab === "profile" && <Profile />}
              {tab === "changePass" && <UbahPassword />}
              {tab === "status" && <StatusMagang />}
              {tab === "dospem" && <Dospem />}
              {tab === "laporan" && <Laporan />}
              {tab === "logbook" && <Logbook />}
              {/* {tab === "settings" && <Profile user={userData}/>} */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MhsAccount;
