import { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileMitra = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [profile, setProfile] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelpon, setNoTelpon] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/auth/login");
    }
  }, [isError, navigate]);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/mitra/profile/${id}`
        );
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setDesc(response.data.data.desc);
        setAlamat(response.data.data.alamat);
        setNoTelpon(response.data.data.no_telpon);
        setProfile(response.data.data.profile);
        setRole(response.data.data.role);
        console.log(response.data.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getUserById();
  }, [id]);

  const handleFileInputChange = (event) => {
    setProfile(event.target.files[0]);
  };

  const formData = new FormData();
    formData.append("image", profile);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/mitra/edit/${id}`, {
        name: name,
        email: email,
        profile: formData,
        desc: desc,
        alamat: alamat,
        no_telpon: noTelpon,
        role: role,
      });
      toast.success("Berhasil Mengubah Akun");
      navigate("/dashboard/lowongan-magang");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="max-w-[1270px] px-5 mx-auto cursor-pointer mt-10">
            <form onSubmit={updateProfile}>
              {msg.length > 0 && (
                <p className="rounded-md p-2 cursor-pointer text-md items-center mb-3 gap-x-4 bg-red-700 bg-opacity-40 text-center text-red-800 font-[600]">
                  {msg}
                </p>
              )}
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Photo
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <UserCircleIcon
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <input
                          type="file"
                          id="image"
                          name="image"
                          className="text-sm border-gray-800 border rounded-lg py-1.5 px-2 text-black-800 placeholder: opacity-50"
                          onChange={handleFileInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Write a few sentences about yourself.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="fullname"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Your Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="fullname"
                          id="fullname"
                          autoComplete="given-name"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="alamat"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Alamat
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="alamat"
                          id="alamat"
                          autoComplete="address-level2"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={alamat}
                          onChange={(e) => setAlamat(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="no_telpon"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No Telpon
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="no_telpon"
                          id="no_telpon"
                          autoComplete="address-level1"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={noTelpon}
                          onChange={(e) => setNoTelpon(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Role
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="role"
                          id="role"
                          autoComplete="role"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMitra;
