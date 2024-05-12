import login from "../assets/images/login.gif";
import { Link } from "react-router-dom";
import Header from "../components/Mahasiswa-Components/Header/Header";
import Footer from "../components/Mahasiswa-Components/Footer/Footer";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const username = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    setLoading(true); // Mengatur loading menjadi true saat proses autentikasi dimulai
    try {
      const response = await axios.post(
        "http://localhost:5000/mahasiswa/login",
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      toast.success("Login Success");
      navigate("/lowongan-magang");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
      toast.error(msg);
    } finally {
      setLoading(false); // Mengatur loading menjadi false setelah proses autentikasi selesai
    }
  };
  

  useEffect(() => {
    username.current.focus();
  }, []);

  return (
    <>
      <Header />
      <section className="px-5 xl:px-0">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ======= IMG BOX ======== */}
            <div className="hidden lg:block rounded-xl mt-10">
              <figure className="rounded-l-lg">
                <img src={login} alt="" className="w-full rounded-l-lg" />
              </figure>
            </div>

            {/* ======= SIGNUP FORM INPUT ============ */}
            <div className="rounded-l-lg lg:pl-16 py-10">
              <h3 className="text-headingColor text-[26px] leading-9 font-bold mb-10">
                Welcome, Please enter your details to Sign In.
              </h3>

              <form className="space-y-6" onSubmit={Auth}>
                <div>
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
                      ref={username}
                      required
                      className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
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
                      className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <button type="submit" className="btn w-full rounded-xl mt-1">
                    {loading ? <HashLoader color="#fff" size={25} /> : "Sign In"}
                  </button>
                </div>
              </form>
              <p className="text__para text-blackColor mt-5 text-center">
                Don't have already an account?{" "}
                <Link to="/register" className="font-bold text-blue-600">
                  Sign Up
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

export default Login;
