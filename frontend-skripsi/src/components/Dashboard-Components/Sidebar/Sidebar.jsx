import { useState, useEffect } from "react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { SiCodementor } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { MdWork } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import control from "../../../assets/images/control.png";
import { MdLibraryBooks } from "react-icons/md";
import { GrWorkshop } from "react-icons/gr";
import fasilkomLogo from "../../../assets/images/logo-fasilkom.png";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-[#F1F1FA] h-screen p-5  pt-8 relative duration-300 overflow-y-auto`}
      style={{
        position: "sticky",
        top: "0",
        overflowX: "hidden",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <img
        src={control}
        className={`absolute cursor-pointer right-1 top-20 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180 right-6"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={fasilkomLogo}
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-blackColor font-[700] origin-left text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          FASILKOM
        </h1>
      </div>
      {/* {user && user.data.role === "admin" && ( */}
      <ul className="pt-6 mt-5">
        {/* Sidebar 1 */}
        <li>
          <NavLink
            to={"/dashboard/information"}
            className={(navClass) => `${
              navClass.isActive
                ? "bg-primaryColor bg-opacity-30 border-l-4 border-primaryColor border-solid"
                : "hover:bg-primaryColor hover:bg-opacity-30 hover:border-l-4 hover:border-primaryColor hover:border-solid"
            }
                } flex rounded-md p-2 cursor-pointer text-gray-300 text-md items-center mt-3 gap-x-4`}
          >
            <HiOutlineSpeakerphone className="text-xl text-blackColor mt-2" />
            <span
              className={`${
                !open && "hidden"
              } text-blackColor font-[600] origin-left duration-200 mt-2`}
            >
              Information
            </span>
          </NavLink>
        </li>

        {/* Sidebar 2 */}
        <li>
          <NavLink
            to={"/dashboard/create-account"}
            className={(navClass) => `${
              navClass.isActive
                ? "bg-primaryColor bg-opacity-30 border-l-4 border-primaryColor border-solid"
                : "hover:bg-primaryColor hover:bg-opacity-30 hover:border-l-4 hover:border-primaryColor hover:border-solid"
            }
                } flex rounded-md p-2 cursor-pointer text-gray-300 text-md items-center mt-3 gap-x-4`}
          >
            <IoMdPersonAdd className="text-xl text-blackColor mt-2" />
            <span
              className={`${
                !open && "hidden"
              } text-blackColor font-[600] origin-left duration-200 mt-2`}
            >
              Create Account
            </span>
          </NavLink>
        </li>

        {/* Sidebar 3 */}
        <li>
          <NavLink
            to={"/dashboard/dosen-pembimbing"}
            className={(navClass) => `${
              navClass.isActive
                ? "bg-primaryColor bg-opacity-30 border-l-4 border-primaryColor border-solid"
                : "hover:bg-primaryColor hover:bg-opacity-30 hover:border-l-4 hover:border-primaryColor hover:border-solid"
            }
                } flex rounded-md p-2 cursor-pointer text-gray-300 text-md items-center mt-3 gap-x-4`}
          >
            <SiCodementor className="text-xl text-blackColor mt-2" />
            <span
              className={`${
                !open && "hidden"
              } text-blackColor font-[600] origin-left duration-200 mt-2`}
            >
              Dosen Pembimbing
            </span>
          </NavLink>
        </li>

        {/* Sidebar 4 */}
        <li>
          <NavLink
            to={"/dashboard/laporan-magang"}
            className={(navClass) => `${
              navClass.isActive
                ? "bg-primaryColor bg-opacity-30 border-l-4 border-primaryColor border-solid"
                : "hover:bg-primaryColor hover:bg-opacity-30 hover:border-l-4 hover:border-primaryColor hover:border-solid"
            }
                } flex rounded-md p-2 cursor-pointer text-gray-300 text-md items-center mt-3 gap-x-4`}
          >
            <TbReport className="text-xl text-blackColor mt-2" />
            <span
              className={`${
                !open && "hidden"
              } text-blackColor font-[600] origin-left duration-200 mt-2`}
            >
              Laporan Magang
            </span>
          </NavLink>
        </li>
        {/* )} */}

        {/* {user && user.data.role === "mitra" && ( */}
        {/* Sidebar 5 */}
        <li>
          <NavLink
            to={"/dashboard/lowongan-magang"}
            className={(navClass) => `${
              navClass.isActive
                ? "bg-primaryColor bg-opacity-30 border-l-4 border-primaryColor border-solid"
                : "hover:bg-primaryColor hover:bg-opacity-30 hover:border-l-4 hover:border-primaryColor hover:border-solid"
            }
                } flex rounded-md p-2 cursor-pointer text-gray-300 text-md items-center mt-3 gap-x-4`}
          >
            <MdWork className="text-xl text-blackColor mt-2" />
            <span
              className={`${
                !open && "hidden"
              } text-blackColor font-[600] origin-left duration-200 mt-2`}
            >
              Lowongan Magang
            </span>
          </NavLink>
        </li>

        {/* Sidebar 6 */}
        <li>
          <NavLink
            to={"/dashboard/pendaftar-magang"}
            className={(navClass) => `${
              navClass.isActive
                ? "bg-primaryColor bg-opacity-30 border-l-4 border-primaryColor border-solid"
                : "hover:bg-primaryColor hover:bg-opacity-30 hover:border-l-4 hover:border-primaryColor hover:border-solid"
            }
                } flex rounded-md p-2 cursor-pointer text-gray-300 text-md items-center mt-3 gap-x-4`}
          >
            <GrWorkshop className="text-xl text-blackColor mt-2" />
            <span
              className={`${
                !open && "hidden"
              } text-blackColor font-[600] origin-left duration-200 mt-2`}
            >
              Pendaftar Magang
            </span>
          </NavLink>
        </li>

        {/* Sidebar 7 */}
        <li>
          <NavLink
            to={"/dashboard/logbook"}
            className={(navClass) => `${
              navClass.isActive
                ? "bg-primaryColor bg-opacity-30 border-l-4 border-primaryColor border-solid"
                : "hover:bg-primaryColor hover:bg-opacity-30 hover:border-l-4 hover:border-primaryColor hover:border-solid"
            }
                } flex rounded-md p-2 cursor-pointer text-gray-300 text-md items-center mt-3 gap-x-4`}
          >
            <MdLibraryBooks className="text-xl text-blackColor mt-2" />
            <span
              className={`${
                !open && "hidden"
              } text-blackColor font-[600] origin-left duration-200 mt-2`}
            >
              Logbook
            </span>
          </NavLink>
        </li>
      </ul>
      {/* )} */}
    </div>
  );
};

export default Sidebar;
