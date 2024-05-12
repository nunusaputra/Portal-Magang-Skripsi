import React, {useState, useEffect} from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { toast } from "react-toastify";

const EditAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        const response = await axios.get(`http://localhost:5000/admin/account/${id}`);
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setRole(response.data.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/admin/account/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      toast.success("Berhasil Mengubah Akun");
      navigate("/dashboard/create-account");
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
          <div className="max-w-[1270px] px-5 mx-auto mt-10">
            <form onSubmit={updateUser}>
            {msg.length > 0 && (
              <p className="rounded-md p-2 cursor-pointer text-md items-center mb-3 gap-x-4 bg-red-700 bg-opacity-40 text-center text-red-800 font-[600]">
                {msg}
              </p>
              )}
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Add New Account
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Tambahkan beberapa akun baru untuk mengakses dashboard.
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

                    <div className="col-span-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="password"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="confPassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="confPassword"
                          id="confPassword"
                          autoComplete="confPassword"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={confPassword}
                          onChange={(e) => setConfPassword(e.target.value)}
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
                        <select
                          id="role"
                          name="role"
                          autoComplete="role-name"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option>Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="mitra">Mitra</option>
                        </select>
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAccount;
