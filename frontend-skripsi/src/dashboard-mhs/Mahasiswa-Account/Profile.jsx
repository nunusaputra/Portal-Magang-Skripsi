import { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { PaperClipIcon } from "@heroicons/react/16/solid";
import { HashLoader } from "react-spinners";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [profileFile, setProfileFile] = useState(null); // Menyimpan file foto profil
  const [alamat, setAlamat] = useState("");
  const [noTelpon, setNoTelpon] = useState("");
  const [prodi, setProdi] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [semester, setSemester] = useState("");
  const [cvFile, setCvFile] = useState(null); // Menyimpan file CV
  const [linkCV, setLinkCV] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/mahasiswa/get-user/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setDesc(response.data.data.desc);
        setAlamat(response.data.data.alamat);
        setNoTelpon(response.data.data.no_hp);
        setProfileFile(response.data.data.profile_pict); // Mengisi state file foto profil
        setProdi(response.data.data.prodi);
        setTglLahir(response.data.data.tglLahir);
        setSemester(response.data.data.semester);
        setLinkCV(response.data.data.linkCV);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        } 
      } 
    };
    getUserById();
  }, [id]);

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", profileFile);
      formData.append("cv", cvFile);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("desc", desc);
      formData.append("alamat", alamat);
      formData.append("no_hp", noTelpon);
      formData.append("prodi", prodi);
      formData.append("tgl_lahir", tglLahir);
      formData.append("semester", semester);
      formData.append("linkCV", linkCV);

      await axios.put(`http://localhost:5000/mahasiswa/edit/profile/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Berhasil Mengubah Akun");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-[1270px] px-5 mx-auto cursor-pointer mt-10">
        <form onSubmit={updateProfile}>
          {msg.length > 0 && (
            <p className="mt-3 rounded-md p-2 cursor-pointer text-md items-center mb-3 gap-x-4 bg-red-700 bg-opacity-40 text-center text-red-800 font-[600]">{msg}</p>
          )}
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
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
                      onChange={(e) => setProfileFile(e.target.files[0])} // Menyimpan file foto profil ke state
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

                <div className="sm:col-span-3 sm:col-start-1">
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

                <div className="sm:col-span-3">
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
                      className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                      value={noTelpon}
                      onChange={(e) => setNoTelpon(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 ">
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

                <div className="sm:col-span-2">
                  <label
                    htmlFor="semester"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Semester
                  </label>
                  <div className="mt-2">
                    <select
                      id="semester"
                      name="semester"
                      className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                    >
                      <option>Pilih semester</option>
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                      <option value="Semester 7">Semester 7</option>
                      <option value="Semester 8">Semester 8</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="tgl_lahir"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tanggal Lahir
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="tgl_lahir"
                      id="tgl_lahir"
                      autoComplete="address-level1"
                      className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                      value={tglLahir}
                      onChange={(e) => setTglLahir(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cv"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    CV
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <PaperClipIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      className="text-sm border-gray-800 border rounded-lg py-1.5 px-2 text-black-800 placeholder: opacity-50"
                      onChange={(e) => setCvFile(e.target.files[0])} // Menyimpan file CV ke state
                    />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <label
                    htmlFor="linkCV"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Link CV
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="linkCV"
                      id="linkCV"
                      autoComplete="given-name"
                      className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                      value={linkCV}
                      onChange={(e) => setLinkCV(e.target.value)}
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
              {loading ? (
                <HashLoader color="#fff" size={20} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
