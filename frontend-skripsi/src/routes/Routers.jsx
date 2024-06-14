import React from "react";
import Home from "../pages/Home";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MhsAccount from "../dashboard-mhs/Mahasiswa-Account/MhsAccout";
// import Profile from "../dashboard-mhs/Mahasiswa-Account/Profile";
import Contacts from "../pages/Contacts";
import Information from "../pages/Information";
import Magang from "../pages/Magang";
import DetailMagang from "../components/Mahasiswa-Components/Magang/DetailMagang";
import InformationAdmin from "../components/Dashboard-Components/Admin-Information/Information";
import CreateAccount from "../components/Dashboard-Components/Admin-Create-Account/CreateAccount";
import LihatDospem from "../components/Dashboard-Components/Admin-Dospem/LihatDospem";
import AdminLaporan from "../components/Dashboard-Components/Admin-Laporan-Magang/AdminLaporan";
import Profile from "../components/Dashboard-Components/Admin-Profile/Profile";
import UbahPassword from "../components/Dashboard-Components/Admin-Profile/UbahPassword";
import AddAccount from "../components/Dashboard-Components/Admin-Create-Account/AddAccount";
import EditAccount from "../components/Dashboard-Components/Admin-Create-Account/EditAccount";
import EditInformation from "../components/Dashboard-Components/Admin-Information/EditInformation";
import LowonganMagang from "../components/Dashboard-Components/Mitra-Lowongan-Magang/LowonganMagang";
import MitraLogbook from "../components/Dashboard-Components/Mitra-Logbook/MitraLogbook";
import Pendaftar from "../components/Dashboard-Components/Mitra-Pendaftar-Magang/Pendaftar";
import DetailMagangMitra from "../components/Dashboard-Components/Mitra-Lowongan-Magang/DetailMagangMitra";
import UserLoginPage from "../pages/UsersLogin";
import AddInformation from "../components/Dashboard-Components/Admin-Information/AddInformation";
import AddLowongan from "../components/Dashboard-Components/Mitra-Lowongan-Magang/AddLowongan";
import EditLowongan from "../components/Dashboard-Components/Mitra-Lowongan-Magang/EditLowongan";
import ProfileMitra from "../components/Dashboard-Components/Mitra-Profile/ProfileMitra";
import UbahPasswordMitra from "../components/Dashboard-Components/Mitra-Profile/UbahPassMitra";
import DetailPendaftar from "../components/Dashboard-Components/Mitra-Pendaftar-Magang/DetailPendaftar";
import Error from "../pages/404";

const Routers = () => {
  return (
    <Routes>
      {/* Mahasiswa Router */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users/profile/:id" element={<MhsAccount />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/information" element={<Information />} />
      <Route path="/lowongan-magang" element={<Magang />} />
      <Route path="/lowongan-magang/:id" element={<DetailMagang />} />

      {/* Authentication Router For Admin and Mitra */}
      <Route path="/auth/login" element={<UserLoginPage />} />

      {/* Admin Router */}
      <Route path='/dashboard/information' element={<InformationAdmin />} />
      <Route path='/dashboard/create-account' element={<CreateAccount />} />
      <Route path='/dashboard/dosen-pembimbing' element={<LihatDospem />} />
      <Route path='/dashboard/laporan-magang' element={<AdminLaporan />} />
      <Route path='/dashboard/admin-profile/:id' element={<Profile />} />
      <Route path='/dashboard/admin/change-password/:id' element={<UbahPassword />} />
      <Route path='/dashboard/add-account' element={<AddAccount />} />
      <Route path='/dashboard/edit-account/:id' element={<EditAccount />} />
      <Route path='/dashboard/edit-information/:id' element={<EditInformation />} />
      <Route path='/dashboard/add-information' element={<AddInformation />} />

      {/* Mitra Router */}
      <Route path='/dashboard/lowongan-magang' element={<LowonganMagang />} />
      <Route path='/dashboard/lowongan-magang/create' element={<AddLowongan />} />
      <Route path='/dashboard/lowongan-magang/:id' element={<DetailMagangMitra />} />
      <Route path='/dashboard/lowongan-magang/edit/:id' element={<EditLowongan />} />
      <Route path='/dashboard/logbook' element={<MitraLogbook />} />
      <Route path='/dashboard/pendaftar-magang' element={<Pendaftar />} />
      <Route path='/dashboard/pendaftar-magang/:id' element={<DetailPendaftar />} />
      <Route path='/dashboard/mitra-profile/:id' element={<ProfileMitra />} />
      <Route path='/dashboard/mitra/change-password/:id' element={<UbahPasswordMitra />} />

      {/* Page Not Found */}
      <Route path="/error-pages" element={<Error />} />
    </Routes>
  );
};

export default Routers;
