import React from "react";
import Header from "../components/Mahasiswa-Components/Header/Header";
import Footer from "../components/Mahasiswa-Components/Footer/Footer";

const Contacts = () => {
  return (
    <>
      <Header />
      <section>
        <div className="px-4 mx-auto max-w-screen-md">
          <h2 className="heading text-center">Contact Us</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text__para">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore
            laudantium reprehenderit autem vitae quidem quod!
          </p>

          <form action="#" className="space-y-8">
            <div>
              <label htmlFor="email" className="form__label">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                placeholder="example@me.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="form__label">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                placeholder="Let us know how we can help you"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="form__label">
                Your Message
              </label>
              <textarea
                id="message"
                rows="6"
                type="text"
                placeholder="Leave a comment..."
                className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
              />
            </div>
            <button type="submit" className="btn w-full">
              Submit
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contacts;
