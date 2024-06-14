import React from "react";
import alfin from "../../../assets/images/alfin.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="lg:w-[570px] mx-auto">
          <h2 className="heading text-center font-[800]">Tentang Kami</h2>
          <p className="text__para text-center">
            Kenali lebih dalam tentang kami melalui layanan-layanan yang kami
            sediakan.
          </p>
        </div>
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row mt-[3rem] lg:mt-[5rem] md:mt-[3rem] sm:mt-[2rem]">
          {/* About Image */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={alfin} alt="" />
          </div>

          {/* About Content */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Bangga menjadi bagain magang fasilkom</h2>
            <p className="text__para">
              Mengikuti program magang adalah langkah penting dalam memperluas
              wawasan dan pengalaman bagi siapa pun yang tengah memasuki dunia
              kerja. Dalam magang, Anda tidak hanya belajar teori, tetapi juga
              mendapatkan pengalaman praktis yang tak ternilai harganya.
            </p>
            <p className="text__para mt-[30px]">
              Dengan berinteraksi langsung dengan profesional di bidang yang
              diminati, Anda dapat memperoleh wawasan mendalam tentang bagaimana
              industri beroperasi secara nyata. Ini membantu mempersiapkan Anda
              untuk tantangan yang akan dihadapi di masa depan.
            </p>
            <p className="text__para mt-[30px]">
              Tidak hanya itu, magang juga memberikan kesempatan untuk mengasah
              keterampilan yang diperlukan dalam dunia kerja.
            </p>
            <Link to="/login">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
