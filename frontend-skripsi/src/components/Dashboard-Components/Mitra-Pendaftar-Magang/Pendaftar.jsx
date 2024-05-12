import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { formaterDate } from "../../../utils/FormaterDate";

const TABLE_HEAD = [
  "Pendaftar",
  "Program Studi",
  "Status",
  "Tanggal Mendaftar",
  "Action",
];

const Pendaftar = () => {
  const [pendaftar, setPendaftar] = useState([]);

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
    if (user && user.data.role !== "mitra") {
      navigate("/dashboard/information");
    }
  }, [isError, navigate]);

  const getPendaftar = async () => {
    const response = await axios.get(
      "http://localhost:5000/mitra/applications"
    );
    setPendaftar(response.data.data);
  };

  useEffect(() => {
    getPendaftar();
  }, []);

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
                    <Typography variant="h5" color="blue-gray">
                      Pendaftar Magang
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                      Mitra dapat melihat pendaftar magang dan melakukan seleksi
                      terhadap status magang mahasiswa.
                    </Typography>
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
                {pendaftar.length > 0 ? (
                  <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pendaftar.map((item, index) => {
                        const isLast = index === pendaftar.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={item.id}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={item.Mahasiswa.profile_pict}
                                  alt={item.Mahasiswa.name}
                                  size="sm"
                                />
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {item.Mahasiswa.name}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-70"
                                  >
                                    {item.Mahasiswa.email}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.Mahasiswa.prodi}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  Semester {item.Mahasiswa.semester}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Chip
                                  variant="ghost"
                                  size="sm"
                                  value={(() => {
                                    switch (item.status) {
                                      case "applied":
                                        return "applied";
                                      case "accepted":
                                        return "accepted";
                                      case "canceled":
                                        return "canceled";
                                      case "rejected":
                                        return "rejected";
                                      case "finished":
                                        return "finished";
                                      default:
                                        return "offline";
                                    }
                                  })()}
                                  color={(() => {
                                    switch (item.status) {
                                      case "applied":
                                        return "blue";
                                      case "accepted":
                                        return "green";
                                      case "canceled":
                                        return "orange";
                                      case "rejected":
                                        return "red";
                                      case "finished":
                                        return "gray";
                                      default:
                                        return "orange";
                                    }
                                  })()}
                                />
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {formaterDate(item.dateOfApply)}
                              </Typography>
                            </td>
                            <Link to={`/dashboard/pendaftar-magang/${item.id}`}>
                              <td className={classes}>
                                <Tooltip content="Show Detail">
                                  <IconButton variant="text">
                                    <IdentificationIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                              </td>
                            </Link>
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
                        No Internship Registrations Found
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
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Page 1 of 10
                </Typography>
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

export default Pendaftar;
