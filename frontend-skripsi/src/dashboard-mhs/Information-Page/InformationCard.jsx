import React, { useState } from "react";
import { TbPinnedFilled, TbSpeakerphone } from "react-icons/tb";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { formaterDate } from "../../utils/FormaterDate";
import parse from "html-react-parser";

const InformationCard = ({ item }) => {
  const { id, title, desc, author, createdAt } = item;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="mb-8 md:mb-0" onClick={handleOpen}>
        <a className="flex items-center text-lg p-5 rounded border border-solid border-gray-300 mb-3 shadow-md">
          <div>
            <div className="font-bold leading-snug tracking-tight mb-1">
              {title}
            </div>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html: desc.substring(0, 38) + "...",
              }}
            ></div>
            <div className="flex justify-between mt-1">
              <div className="text-blackColor">{formaterDate(createdAt)}</div>
              <div>
                <TbPinnedFilled className="text-blackColor text-2xl" />
              </div>
            </div>
          </div>
        </a>
      </div>

      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>
          <div className="flex">
            <TbSpeakerphone className="text-4xl text-blackColor mt-3 mx-5" />
            <h2 className="text-[28px] text-blackColor mt-2 font-[800]">
              {title}
            </h2>
          </div>
        </DialogHeader>
        <DialogHeader>
          <div className="flex items-center justify-between mx-5">
            <p className="text-blackColor text-sm mr-1 mt-1">
              Oleh <span className="text-[#135195]">{author} -</span>
            </p>
            <p className="text-blackColor text-sm mt-1">
              {formaterDate(createdAt)}
            </p>
          </div>
        </DialogHeader>
        <DialogBody className="mx-5">
          <div>{parse(desc)}</div>
        </DialogBody>
        <DialogFooter>
          <button
            className="py-2 px-5 rounded-xl text-white font-[600] bg-red-300 hover:bg-red-400 w-full"
            onClick={handleOpen}
          >
            Close
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default InformationCard;
