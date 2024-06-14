import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { useEffect } from "react";

const Error = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
        <p className="font-semibold text-indigo-600 text-7xl">403</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Forbidden
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, you do not have access to this page
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            {user && user.data.role === "mitra" ? (
                <Link
                    to={"/dashboard/lowongan-magang"}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Go back home
                </Link>
            ) : (
                <Link
                    to={"/dashboard/information"}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Go back home
                </Link>
            )}
            <a href="/contact" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
            </a>
        </div>
    </div>
</main>

    </>
  );
};

export default Error;
