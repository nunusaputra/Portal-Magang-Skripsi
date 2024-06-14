import React from "react";
import wisnu3 from "../assets/images/wisnu3.png";
import karno from "../assets/images/karno.png";
import ammar from "../assets/images/ammar.png";
import skilvul from "../assets/images/skilvul.png";
import jidoka from "../assets/images/jidoka.png";
import cbi from "../assets/images/cbi.png";
import aisin from "../assets/images/aisin.png";
import kalbe from "../assets/images/kalbe.png";
import About from "../components/Mahasiswa-Components/About/About";
import ServicesList from "../components/Mahasiswa-Components/Services/ServicesList";
import JobsList from "../components/Mahasiswa-Components/Jobs/JobsList";
import TestimonialList from "../components/Mahasiswa-Components/Testimonial/TestimonialList";
import Header from "../components/Mahasiswa-Components/Header/Header";
import Footer from "../components/Mahasiswa-Components/Footer/Footer";
import Banner from "./Banner";
import { Link } from "react-router-dom";
// import icon01 from "../assets/images/icon01.png";
// import icon02 from "../assets/images/icon02.png";
// import icon03 from "../assets/images/icon03.png";
// import videoIcon from "../assets/images/video-icon.png";
// import avatarIcon from "../assets/images/avatar-icon.png";
// import featureImg from "../assets/images/feature-img.png";
// import faqImg from "../assets/images/faq-img.png";
// import { Link } from "react-router-dom";
// import { BsArrowRight } from "react-icons/bs";
// import About from "../components/About/About";
// import ServicesList from "../components/Services/ServicesList";
// import DoctorsList from "../components/Doctors/DoctorsList";
// import FaqList from "../components/Faqs/FaqList";
// import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Banner />
      <Header />
      {/* ====== Hero Section ========= */}
      <section className="hero__section pt-[90px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* Hero Content */}

            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  Mulai Persiapkan Karir Mu Melalui Magang.
                </h1>
                <p className="text__para">
                  Kami memfasilitasi mahasiswa untuk memulai perjalanan karier
                  mereka dan membentuk masa depan yang lebih cerah dengan
                  peluang magang yang tak ternilai.
                </p>
                <Link to="/login">
                  <button className="btn">Daftar Magang Sekarang</button>
                </Link>
              </div>

              {/* ====== Hero Counter ======== */}
            </div>

            {/* Hero Content */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img src={wisnu3} alt="" className="w-full drop-shadow-2xl" />
              </div>
              <div className="ml-[30px]">
                <img
                  src={karno}
                  alt=""
                  className="w-full mb-[30px] drop-shadow-md"
                />
                <img src={ammar} alt="" className="w-full drop-shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Hero Section End ========= */}

      {/* About Section Start */}
      <About />
      {/* About Section End */}

      {/* Benefit Section Start */}
      <section className="bg-[#D9D9D9]">
        <div className="container">
          <div className="xl:w-[570px] mx-auto">
            <h2 className="heading text-center">
              Benefit Yang Kamu Dapatkan Selama Magang
            </h2>
            <p className="text__para text-center">
              Kamu akan mendapatkan beberapa keuntungan selama periode kegiatan
              magang berlangsung.
            </p>
          </div>
          <ServicesList />
        </div>
      </section>
      {/* Benefit Section End */}

      {/* Jobs Section Start */}
      <section>
        <div className="container">
          <div className="xl:w-[570px] mx-auto">
            <h2 className="heading text-center font-[800]">
              Temukan Tempat Magang Impianmu
            </h2>
            <p className="text__para text-center">
              Kamu dapat mencari berbagai jenis magang yang tersedia sesuai
              dengan minat dan kemampuan yang kamu miliki.
            </p>
          </div>
          <JobsList />
        </div>
      </section>
      {/* Jobs Section End */}

      {/* Testimonial Section Start */}
      <section className="bg-[#D9D9D9]">
        <div className="container">
          <div className="xl:w-[570px] mx-auto">
            <h2 className="heading text-center font-[800]">Apa Kata Mereka</h2>
            <p className="text__para text-center">
              Dengarkan pengalaman-pengalaman yang mereka dapatkan selama
              mengikuti kegatan magang.
            </p>
          </div>
          <TestimonialList />
        </div>
      </section>
      {/* Testimonial Section End */}

      {/* Company Banner Start */}
      <section className="mb-[50px]">
        <div className="container">
          <div className="lg:w-[880px] mx-auto">
            <h2 className="heading text-center font-[800]">
              Telah Bekerjasama Dengan Beberapa Mitra Ternama.
            </h2>
            <p className="text__para text-center">
              Fasilkom telah bekerjasama dengan beberapa mitra industri yang
              dapat membantu mahasiswa dalam menemukan tempat magang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
              <img
                src={skilvul}
                alt=""
                className="max-w-full fill-current text-gray-400"
              />
            </div>
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
              <img
                src={jidoka}
                alt=""
                className="max-w-full fill-current text-gray-400"
              />
            </div>
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
              <img
                src={cbi}
                alt=""
                className="max-w-full fill-current text-gray-400"
              />
            </div>
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
              <img
                src={kalbe}
                alt=""
                className="max-w-full fill-current text-gray-400"
              />
            </div>
            <div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
              <img
                src={aisin}
                alt=""
                className="max-w-full fill-current text-gray-400"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Company Banner End */}
      <Footer />
    </>
  );
};

export default Home;
