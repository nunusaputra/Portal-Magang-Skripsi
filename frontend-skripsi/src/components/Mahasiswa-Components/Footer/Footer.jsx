import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.youtube.com/CodingWithMuhib",
    icon: <AiFillYoutube className="grup-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.github.com/codingwithmuhib",
    icon: <AiFillGithub className="grup-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.instagram.com/muhib160.official",
    icon: <AiOutlineInstagram className="grup-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.linkedin.com/codingwithmuhib",
    icon: <RiLinkedinFill className="grup-hover:text-white w-4 h-5" />,
  },
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/magang",
    display: "Magang",
  },
  {
    path: "/informasi",
    display: "Informasi",
  },
];

const quickLinks02 = [
  {
    path: "/magang",
    display: "Lowongan Magang",
  },
  {
    path: "/",
    display: "Benefit Magang",
  },
  {
    path: "/",
    display: "Testimonial",
  },
  {
    path: "/",
    display: "Mitra Magang",
  },
];

const quickLinks03 = [
  {
    path: "/",
    display: "FAQ",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="" />
            <p className="text-[16px] leading-7 font-[400px] text-textColor mt-4">
              Copyright @ {year} developed by Wisnu Saputra all right reserved.
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none hover:text-white rounded-full"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>

            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              I want to:
            </h2>

            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Support
            </h2>

            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
