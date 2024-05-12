import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
const Dospem = () => {
  const [nama, setNama] = useState("");
  const [npm, setNpm] = useState("");
  const [suratCovid, setSuratCovid] = useState("");
  const [suratBalasan, setSuratBalasan] = useState("");
  const [tempatMagang, setTempatMagang] = useState("");
  const [alamatMagang, setAlamatMagang] = useState("");
  const [pic, setPic] = useState("");
  const [kontakPic, setKontakPic] = useState("");
  const [latitudeMagang, setLatitudeMagang] = useState("");
  const [longitudeMagang, setLongitudeMagang] = useState("");
  const [tglMulai, setTglMulai] = useState("");
  const [tglSelesai, setTglSelesai] = useState("");
  const [bidangMinat, setBidangMinat] = useState("");
  const [rencanaMagang, setRencanaMagang] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  // const [status, setStatus] = useState([]);

  // const getStatus = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/mahasiswa/job/applications", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     setStatus(response.data.data);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     if (error.response) {
  //       console.log("Error message from server:", error.response.data.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getStatus();
  // }, []);

  const UploadDospem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/mahasiswa/dosen-pembimbing`,
        {
          nama: nama,
          npm: npm,
          surat_covid: suratCovid,
          surat_balasan: suratBalasan,
          tempat_magang: tempatMagang,
          alamat_magang: alamatMagang,
          pic: pic,
          kontak_pic: kontakPic,
          latitude_magang: latitudeMagang,
          longitude_magang: longitudeMagang,
          tgl_mulai: tglMulai,
          tgl_selesai: tglSelesai,
          bidang_minat: bidangMinat,
          rencana_magang: rencanaMagang,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Upload Laporan Sukses");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={UploadDospem}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Pengajuan Dosen Pembimbing
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  NPM
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                    value={npm}
                    onChange={(e) => setNpm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
          <div className="text-base">
            Silahkan lampirkan link yang sudah di upload dari google drive pada
            kolom di bawah ini.
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Surat Covid
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={suratCovid}
                onChange={(e) => setSuratCovid(e.target.value)}
              />
              <p className="text-md leading-6 text-gray-600">
                Format surat dapat di download pada link{" "}
                <a
                  href="https://drive.google.com/drive/u/0/folders/1a5TZnWq-Ennc-kmWDTMkfc5zZhk1juMm"
                  target="_blank"
                >
                  <span className="text-primaryColor hover:underline">ini</span>
                </a>
              </p>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Surat Balasan
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={suratBalasan}
                onChange={(e) => setSuratBalasan(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="tempatMagang"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tempat Magang
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="tempatMagang"
                id="tempatMagang"
                autoComplete="given-name"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={tempatMagang}
                onChange={(e) => setTempatMagang(e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="alamat"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Alamat Magang
            </label>
            <div className="mt-2">
              <textarea
                id="alamat"
                name="alamat"
                rows={3}
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={alamatMagang}
                onChange={(e) => setAlamatMagang(e.target.value)}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Tulis alamat lengkap tempat kamu magang.
            </p>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="pic"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nama PIC
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="pic"
                id="pic"
                autoComplete="given-name"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="kontak"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Kontak PIC
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="kontak"
                id="kontak"
                autoComplete="family-name"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={kontakPic}
                onChange={(e) => setKontakPic(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="latitude"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Latitude Magang
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="latitude"
                id="latitude"
                autoComplete="given-name"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={latitudeMagang}
                onChange={(e) => setLatitudeMagang(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="longitude"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Longitude Magang
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="longitude"
                id="longitude"
                autoComplete="given-name"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={longitudeMagang}
                onChange={(e) => setLongitudeMagang(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="mulai"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tanggal Mulai
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="mulai"
                id="mulai"
                autoComplete="address-level2"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={tglMulai}
                onChange={(e) => setTglMulai(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="selesai"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tanggal Selesai
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="selesai"
                id="selesai"
                autoComplete="address-level1"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={tglSelesai}
                onChange={(e) => setTglSelesai(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="minat"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Bidang Minat
            </label>
            <div className="mt-2">
              <select
                id="minat"
                name="minat"
                autoComplete="minat-name"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={bidangMinat}
                onChange={(e) => setBidangMinat(e.target.value)}
              >
                <option>Select an option</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Computer Network">Computer Network</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="rencana"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Rencana Magang
            </label>
            <div className="mt-2">
              <textarea
                id="rencana"
                name="rencana"
                rows={3}
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                value={rencanaMagang}
                onChange={(e) => setRencanaMagang(e.target.value)}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Tulis rencana magang kamu.
            </p>
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
            {loading ? <HashLoader color="fff" size={15} /> : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Dospem;
