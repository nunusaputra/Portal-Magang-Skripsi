import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { formaterDate } from "../../../utils/FormaterDate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Nama", "NPM", "Tempat Magang", "Tanggal Dibuat", "Action"];

const LihatDospem = () => {
  const [dospem, setDospem] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/auth/login");
    }
    if (user && user.data.role !== "admin") {
      navigate("/error-pages");
    }
  }, [isError, navigate]);

  const getDospem = async () => {
    const response = await axios.get(
      "http://localhost:5000/admin/dosen-pembimbing"
    );
    setDospem(response.data.data);
  };

  useEffect(() => {
    getDospem();
  }, []);

  const deleteUser = async (dosenId) => {
    await axios.delete(
      `http://localhost:5000/admin/dosen-pembimbing/${dosenId}`
    );
    toast.success("Berhasil Menghapus Pengajuan Dospem");
    getDospem();
  };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="max-w-[1270px] px-5 mx-auto mt-10">
            <Card className="h-full w-full">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="mb-8 flex items-center justify-between gap-8">
                  <div>
                    <p className="mb-1 text-xl font-bold">
                      Pengajuan Dosen Pembimbing
                    </p>
                    <p className="text-sm">
                      Admin dapat melihat daftar pengajuan dosen pembimbing yang
                      diajukan oleh mahasiswa.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="w-full md:w-72">
                    <Input
                      label="Search"
                      icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody className="overflow-scroll px-0">
                {dospem.length > 0 ? (
                  <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                          >
                            <p className="font-normal leading-none opacity-70">
                              {head}
                            </p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dospem.map((dos, index) => {
                        const isLast = index === dospem.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={dos.id}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={dos.Mahasiswa.profile_pict}
                                  alt={dos.nama}
                                  size="sm"
                                />
                                <div className="flex flex-col">
                                  <p className="font-bold">{dos.nama}</p>
                                  <p className="font-normal opacity-70">
                                    {dos.Mahasiswa.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <p className="font-normal">{dos.npm}</p>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <p className="font-normal">
                                  {dos.tempat_magang}
                                </p>
                              </div>
                            </td>
                            <td className={classes}>
                              <p className="font-normal">
                                {formaterDate(dos.createdAt)}
                              </p>
                            </td>
                            <td className={classes} key={dos.id}>
                              <div className="flex gap-2">
                                <Tooltip content="Delete User">
                                  <IconButton
                                    variant="text"
                                    onClick={() => deleteUser(dos.id)}
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <main className="flex flex-col items-center justify-center h-full lg:mt-[4rem]">
                    <div className="text-center">
                      <p className="text-5xl font-semibold text-indigo-600">
                        404
                      </p>
                      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        No Request Found
                      </h1>
                      <p className="mt-6 text-base leading-7 text-gray-600">
                        Sorry, we couldn’t find the page you’re looking for.
                      </p>
                      <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                          href="#"
                          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Go back home
                        </a>
                        <a
                          href="#"
                          className="text-sm font-semibold text-gray-900"
                        >
                          Contact support <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  </main>
                )}
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <p className="font-normal">Page 1 of 1</p>
                <div className="flex gap-2">
                  <Button variant="outlined" size="sm">
                    Previous
                  </Button>
                  <Button variant="outlined" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LihatDospem;
