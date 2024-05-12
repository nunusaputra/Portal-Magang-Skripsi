import React from "react";
import { formaterDate } from "../../../utils/FormaterDate";
// import avatar from "../../assets/images/patient-avatar.png";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";

const StatusCard = ({ item }) => {
  

  const colorStatus = () => {
    let bgColor = "";

    switch (item.status) {
      case "applied":
        bgColor = "bg-blue-300 hover:bg-blue-400";
        break;
      case "accepted":
        bgColor = "bg-green-300 hover:bg-green-400";
        break;
      case "rejected":
        bgColor = "bg-red-300 hover:bg-red-400";
        break;
      case "canceled":
        bgColor = "bg-orange-300 hover:bg-orange-400";
        break;
      default:
        bgColor = "bg-black-300 hover:bg-black-400";
        break;
    }

    return `py-1 px-3 w-[100px] rounded-xl ${bgColor}`;
  };

  return (
    <div className="mb-8 md:mb-0">
      <div className="flex items-center justify-between text-lg p-5 rounded border mb-5">
        {/* Card Content */}
        <div className="flex items-center gap-[13px]">
          <img src={item.User.profile} alt={item.User.name} style={{width: "60px", height: "60px"}}/>
          <div>
            <h4 className="text-[18px] leading-[30px] text-blackColor font-[800]">
              {item.job.jobTitle} ({item.User.name})
            </h4>
            <div className="flex gap-[15px]">
              <div className="text-blackColor text-sm font-[600]">
                <AiOutlineClockCircle className="inline mr-2" />
                {item.job.jobType}
              </div>
              <div className="text-blackColor text-sm font-[600]">
                <FaRegCalendarAlt className="inline mr-2" />
                {formaterDate(item.dateOfApply)}
              </div>
              <div className="text-blackColor text-sm font-[600]">
                <CiMoneyBill className="inline mr-2" />
                {item.job.salary.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Status */}
        <div className={colorStatus()}>
          <p className="text-white text-center text-sm font-[600]">{item.status}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
