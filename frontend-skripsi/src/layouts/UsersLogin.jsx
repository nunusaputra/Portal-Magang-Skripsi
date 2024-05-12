import { Fragment, useState, useEffect } from "react";
import deal from "../assets/images/deal.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

const UsersLogin = (props) => {
  const { title } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      toast.success("Login Success")
      navigate("/dashboard/information");
    } else if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [user, isSuccess, isError, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <Fragment>
      <section className="m-8 flex gap-4">
        <div className="w-full lg:w-3/5 mt-20">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-black-600">
              {title}
            </div>
            <p className="font-medium text-slate-600 mb-8">
              Welcome, Please enter your details to Sign In.
            </p>
          </div>
          <div className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
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
                  {isLoading ? <HashLoader color="#fff" size={25}/> : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-2/5 mx-8 h-full hidden lg:block">
          <img src={deal} className="h-full w-full object-cover rounded-3xl" />
        </div>
      </section>
    </Fragment>
  );
};

export default UsersLogin;
