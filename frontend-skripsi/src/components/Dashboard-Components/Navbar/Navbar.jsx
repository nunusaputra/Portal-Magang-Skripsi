import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../../features/authSlice";
import avatar from "../../../assets/images/avatar-icon.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/auth/login");
  };

  return (
    <Disclosure as="nav" className="bg-[#F1F1FA] shadow-md sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <h1 className="text-3xl font-bold text-blackColor">
                      Dashboard
                    </h1>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {user && user.data.profile !== null ? (
                        <>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user && user.data.profile}
                          alt=""
                          style={{ width: "40px", height: "40px" }}
                        />
                        
                        </>
                      ) : (
                        <>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={avatar}
                          alt=""
                          style={{ width: "40px", height: "40px" }}
                        />
                        </>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user && user.data.role === "admin" ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/dashboard/admin-profile/${user.data.id}`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/dashboard/admin/change-password/${user.data.id}`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Ubah Password
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/dashboard/mitra-profile/${user.data.id}`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/dashboard/mitra/change-password/${user.data.id}`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Ubah Password
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex justify-start block w-full px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={logout}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
