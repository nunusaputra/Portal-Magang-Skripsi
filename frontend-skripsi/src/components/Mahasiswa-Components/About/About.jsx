import React from "react";
import wisnu3 from "../../../assets/images/wisnu3.png";
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <section>
      <div className="container">
      <div className="lg:w-[570px] mx-auto">
                <h2 className="heading text-center font-[800]">
                  Tentang Kami
                </h2>
                <p className="text__para text-center">
                 Kenali lebih dalam tentang kami melalui layanan-layanan yang kami sediakan.
                </p>
                </div>
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row mt-[3rem] lg:mt-[5rem] md:mt-[3rem] sm:mt-[2rem]">
          {/* About Image */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={wisnu3} alt="" />
          </div>

          {/* About Content */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Bangga menjadi bagain magang fasilkom</h2>
            <p className="text__para">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Aspernatur eveniet eaque nesciunt aut iusto, harum quod velit non
              laudantium corrupti.
            </p>
            <p className="text__para mt-[30px]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
              quam explicabo pariatur optio numquam voluptas.
            </p>
            <p className="text__para mt-[30px]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
              quam explicabo pariatur optio numquam voluptas.
            </p>
            <Link to="/">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
