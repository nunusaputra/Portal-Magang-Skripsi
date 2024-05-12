import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "./SidePanel";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import parse from "html-react-parser";
import { toast } from "react-toastify";

const DetailMagang = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("about");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    if (!loggedIn) {
      toast.error("Anda harus login terlebih dahulu");
      navigate("/login"); // Jika tidak ada token, arahkan ke halaman login
    }
  }, []);

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
      setImage(response.data.data.User.profile);
      setDesc(response.data.data.desc);
      setEmail(response.data.data.User.email);
      setName(response.data.data.User.name);
      setAbout(response.data.data.User.desc);
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

  return (
    <>
      <Header />
      <section>
        <div className="max-w-[1170px] px-5 mx-auto">
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={image} alt="" className="w-full" />
                </figure>

                <div>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>

                  <div className="flex items-center gap-[6px]">
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400px] text-textColor">
                      {email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Requirement
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About Company
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && <div>{parse(desc)}</div>}
              {tab === "feedback" && <div>{about}</div>}
              </div>
            </div>
            <div>
              <SidePanel />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DetailMagang;
