import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SidepanelMitra from "./SidepanelMitra";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import axios from "axios";
import parse from "html-react-parser"

const DetailMagangMitra = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("about");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
        setImage(response.data.data.User.profile);
        setDesc(response.data.data.desc);
        setEmail(response.data.data.User.email);
        setName(response.data.data.User.name);
        setAbout(response.data.data.User.desc);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getLowonganById();
  }, [id]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="max-w-[1270px] px-5 mx-auto mt-20">
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

                <div className="mt-[10px] border-b border-solid border-[#0066ff34]">
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
                  {/* {tab === "about" && <DoctorAbout />}
              {tab === "feedback" && <DoctorFeedback />} */}
                  {tab === "about" && <div>{parse(desc)}</div>}
                  {tab === "feedback" && <div>{about}</div>}
                </div>
              </div>
              <div>
                <SidepanelMitra />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMagangMitra;
