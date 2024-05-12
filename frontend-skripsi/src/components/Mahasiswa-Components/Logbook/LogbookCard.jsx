import React, {useState} from "react";
import { formaterDate } from "../../../utils/FormaterDate";
import {
    Dialog,
    Button,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
  import { MdLibraryBooks } from "react-icons/md";

const LogbookCard = ({ item }) => {
  const { title, desc, dateOfPosting } = item;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
    <div className="mb-8 md:mb-0 cursor-pointer" onClick={handleOpen}>
      <a className="flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3">
        <div>
          <div className="font-bold leading-snug tracking-tight mb-1">
            {title}
          </div>
          <div className="text-gray-600">{desc.substring(0, 80) + "..."}</div>
          <div className="mt-1 font-[600]">{formaterDate(dateOfPosting)}</div>
        </div>
      </a>
    </div>
    
    <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>
          <div className="flex">
            <MdLibraryBooks className="text-4xl text-blackColor mt-3 mx-5" />
            <h2 className="text-[28px] text-blackColor mt-2 font-[800]">
              {title}
            </h2>
          </div>
        </DialogHeader>
        <DialogHeader>
        <div className="flex items-center justify-between mx-5">
            <p className="text-blackColor text-sm">{formaterDate(dateOfPosting)}</p>
          </div>
        </DialogHeader>
        <DialogBody className="mx-5">{desc}</DialogBody>
        <DialogFooter>
          <button className="py-2 px-5 rounded-xl text-white font-[600] bg-red-300 hover:bg-red-400 w-full" onClick={handleOpen}>Close</button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default LogbookCard;
