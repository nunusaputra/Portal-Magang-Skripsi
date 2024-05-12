import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { toast } from "react-toastify";

const AddInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/auth/login");
    }
  }, [isError, navigate]);

  const saveInfo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admin/articles", {
        title: title,
        author: author,
        desc: desc,
      });
      toast.success("Berhasil Membuat Informasi");
      navigate("/dashboard/information");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="max-w-[1270px] px-5 mx-auto cursor-pointer mt-10">
            <form onSubmit={saveInfo}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Create Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Admin dapat membuat informasi mengenai segala kegiatan magang.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Title Information
                      </label>
                      <div className="mt-2">
                        <input
                          id="title"
                          name="title"
                          type="text"
                          autoComplete="title"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="author"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Author
                      </label>
                      <div className="mt-2">
                        <input
                          id="author"
                          name="author"
                          type="author"
                          autoComplete="author"
                          className="text-sm border-gray-800 border rounded-lg w-full py-2.5 px-4 text-black-800 placeholder: opacity-50"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label
                        htmlFor="desc"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Deskripsi Information
                      </label>
                      <div className="mt-2">
                        <CKEditor
                          editor={ClassicEditor}
                          data={desc}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setDesc(data);
                          }}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Write a few sentences about the information.
                      </p>
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddInformation;
