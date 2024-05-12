import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { formaterDate } from "../../../utils/FormaterDate";
import { Link } from "react-router-dom";

const MagangCard = ({ item }) => {
  const { jobTitle, jobType, salary, jobPost } = item;
  return (
    <div className="flex items-center justify-between text-lg p-5 rounded border mb-5">
      {/* Card Content */}
      <div className="flex items-center gap-[13px]">
        <img src={item.User.profile} alt="" width={"60px"} />
        <div>
          <h4 className="text-[18px] leading-[30px] text-blackColor font-[800]">
            {jobTitle} ({item.User.name})
          </h4>
          <div className="flex gap-[15px]">
            <div className="text-blackColor text-sm font-[600]">
              <AiOutlineClockCircle className="inline mr-2" />
              {jobType}
            </div>
            <div className="text-blackColor text-sm font-[600]">
              <FaRegCalendarAlt className="inline mr-2" />
              {formaterDate(jobPost)}
            </div>
            <div className="text-blackColor text-sm font-[600]">
              <CiMoneyBill className="inline mr-2" />
              {salary.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Status */}
      <Link to={`/lowongan-magang/${item.id}`}>
        <button className="py-1 px-3 w-[100px] rounded-xl bg-primaryColor">
          <span className="text-white text-center text-sm font-[600]">
            Lihat Detail
          </span>
        </button>
      </Link>
    </div>
  );
};

export default MagangCard;
