import { useEffect, useRef, useState } from "react";
import InputForm from "../Input/Index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormLogin = () => {
  const username = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
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
    }
  };

  useEffect(() => {
    username.current.focus();
  }, []);
  return (
    <form onSubmit={Auth}>
      <p>{msg}</p>
      <InputForm
        type="email"
        name="email"
        placeholder="Email"
        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
        label="Email"
        ref={username}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputForm
        type="password"
        name="password"
        placeholder="Password"
        className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="btn w-full rounded-xl mt-1">
        Sign In
      </button>
    </form>
  );
};

export default FormLogin;
