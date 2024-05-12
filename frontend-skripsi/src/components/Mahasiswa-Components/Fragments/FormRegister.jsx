import { useEffect, useRef } from "react";
import InputForm from "../Input/Index";

const FormRegister = () => {
  const fullnameRef = useRef(null);

  useEffect(() => {
    fullnameRef.current.focus();
  });

  return (
    <form>
      <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <InputForm
            type="text"
            name="fullname"
            placeholder="Wisnu Saputra"
            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
            label="Full Name"
            ref={fullnameRef}
          />
        </div>
        <div className="sm:col-span-3">
          <InputForm
            type="email"
            name="email"
            placeholder="nunu@gmail.com"
            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
            label="Email"
          />
        </div>
      </div>
      <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <InputForm
            type="password"
            name="password"
            placeholder="*********"
            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
            label="Password"
          />
        </div>
        <div className="sm:col-span-3">
          <InputForm
            type="password"
            name="confPassword"
            placeholder="**********"
            className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
            label="Confirm Password"
          />
        </div>
      </div>
      <InputForm
        type="text"
        name="prodi"
        placeholder="Program Studi"
        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
        label="Program Studi"
      />
    </form>
  );
};

export default FormRegister;
