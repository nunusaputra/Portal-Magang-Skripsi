import { useEffect, useRef, useContext } from "react";
import { Fragment } from "react";
import logo from "../../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BiMenu } from "react-icons/bi";
import avatar from "../../../assets/images/avatar-icon.png";
import { jwtDecode } from "jwt-decode";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/information",
    display: "Informasi",
  },
  {
    path: "/lowongan-magang",
    display: "Magang",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.delete("http://localhost:5000/mahasiswa/logout");
      localStorage.removeItem("token");
      toast.success("Logout Berhasil");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // const decode = jwtDecode(token);

  // console.log(decode);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("token");
  //   if (!loggedIn) {
  //     toast.error("Anda harus login terlebih dahulu");
  //     navigate("/login"); // Jika tidak ada token, arahkan ke halaman login
  //   }
  // }, []);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <img src={logo} alt="Logo" />
          </div>

          {/* Menu Navigation */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-blackColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-blackColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Right */}
          <Menu as="div" className="relative ml-3">
            <div>
              {token ? (
                <>
                  <Menu.Button className="relative flex rounded-full text-sm">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {jwtDecode(token).profile_pict !== null ? (
                      <>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={jwtDecode(token).profile_pict}
                          alt={jwtDecode(token).name}
                          style={{ width: "40px", height: "40px" }}
                        />
                      </>
                    ) : (
                      <>
                        <UserCircleIcon
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Menu.Button>
                </>
              ) : (
                <Link to="/login">
                  <button className="bg-blackColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    Login
                  </button>
                </Link>
              )}
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {token ? (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/users/profile/${jwtDecode(token).mhsId}`}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/users/profile/${
                            jwtDecode(token).mhsId
                          }`}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Ubah Password
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "flex justify-start block w-full px-4 py-2 text-sm text-gray-700"
                          )}
                          onClick={logout}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="bg-blackColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                        Login
                      </button>
                    </Link>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
          {/* <div className="flex items-center gap-4">
            {token ? (
              <div>
                <Link to="/users/profile/me">
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    {jwtDecode(token).profile_pict === null ? (
                      <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    ) : (
                      <img
                        src={jwtDecode(token).profile_pict}
                        alt=""
                        className="w-full rounded-full"
                      />
                    )}
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-blackColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
