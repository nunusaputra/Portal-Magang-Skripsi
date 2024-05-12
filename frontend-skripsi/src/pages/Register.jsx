import { useState, useRef } from "react";
import regis from "../assets/images/regis.gif";
import { Link, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Header from "../components/Mahasiswa-Components/Header/Header";
import Footer from "../components/Mahasiswa-Components/Footer/Footer";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const fullname = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [prodi, setProdi] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/mahasiswa/register", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        prodi: prodi,
      });
      toast.success("Register Success");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="px-5 xl:px-0">
        <div className="max-w-[1170px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ======= IMG BOX ======== */}
            <div className="hidden lg:block rounded-xl mt-20">
              <figure className="rounded-l-lg">
                <img src={regis} alt="" className="w-full rounded-l-lg" />
              </figure>
            </div>

            {/* ======= SIGNUP FORM INPUT ============ */}
            <div className="rounded-l-lg lg:pl-16 py-10">
              <h3 className="text-headingColor text-[26px] leading-9 font-bold mb-10">
                Welcome, Please enter your details to Sign Up.
              </h3>

              <form className="space-y-6" onSubmit={Register}>
                <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ref={fullname}
                        placeholder="Jhon Doe"
                        required
                        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jhon@gmail.com"
                        required
                        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="********"
                        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="confPassword"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="confPassword"
                        name="confPassword"
                        type="password"
                        autoComplete="current-confPassword"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        placeholder="********"
                        required
                        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="prodi"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Program Studi
                  </label>
                  <div className="mt-2">
                    <select
                      id="prodi"
                      name="prodi"
                      className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                      value={prodi}
                      onChange={(e) => setProdi(e.target.value)}
                    >
                      <option>Pilih program studi</option>
                      <option value="Informatika">Informatika</option>
                      <option value="Sistem Informasi">Sistem Informasi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <button type="submit" className="btn w-full rounded-xl mt-1">
                    {loading ? (
                      <HashLoader color="#fff" size={25} />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>
              <p className="text__para text-blackColor mt-5 text-center">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-blue-600">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
