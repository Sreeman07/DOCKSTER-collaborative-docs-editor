import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BsPlusLg } from "react-icons/bs";
import Docs from "../components/Docs";
import { MdOutlineTitle } from "react-icons/md";
import { api_base_url } from "../Helper";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // ================= CREATE DOC =================

  const createDoc = async () => {

    if (!title.trim()) {
      setError("Please enter title");
      return;
    }

    try {

      const res = await fetch(`${api_base_url}/doc/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          docName: title
        })
      });

      const result = await res.json();

      if (result.success) {

        setIsCreateModelShow(false);
        setTitle("");
        navigate(`/createDocs/${result.docId}`);

      } else {

        setError(result.message);
      }

    } catch (error) {

      console.log(error);

      setError("Failed to create document");
    }
  };

  // ================= GET ALL DOCS =================

  const getData = async () => {

    try {

      const res = await fetch(`${api_base_url}/doc/all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });

      const result = await res.json();

      if (result.success) {

        setData(result.docs);

      } else {

        setError(result.message);
      }

    } catch (error) {

      console.log(error);

      setError("Failed to fetch documents");
    }
  };

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    getData();

  }, []);

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between px-[100px]">

        <h3 className="mt-7 mb-3 text-3xl">
          All Documents
        </h3>

        <button
          className="btnBlue"
          onClick={() => setIsCreateModelShow(true)}
        >
          <i>
            <BsPlusLg />
          </i>
          Create New Document
        </button>

      </div>

      <div className="allDocs px-[100px] mt-4">

        {
          data.length > 0 ? (

            data.map((doc) => (
              <Docs
                key={doc._id}
                docs={doc}
              />
            ))

          ) : (

            <p>No Documents Found</p>

          )
        }

      </div>

      {
        isCreateModelShow && (

          <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">

            <div className="createDocsModel p-[15px] bg-[#fff] rounded-lg w-[30vw]">

              <h3 className="text-[20px]">
                Create New Document
              </h3>

              <div className="inputCon mt-3">

                <p className="text-[14px] text-[#808080']">
                  Title
                </p>

                <div className="inputBox w-[100%]">

                  <i>
                    <MdOutlineTitle />
                  </i>

                  <input
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                </div>

              </div>

              <p className="text-red-500 mt-2">
                {error}
              </p>

              <div className="flex mt-2 items-center gap-2 justify-between w-full">

                <button
                  onClick={createDoc}
                  className="btnBlue !min-w-[49%]"
                >
                  Create New Document
                </button>

                <button
                  onClick={() => {
                    setIsCreateModelShow(false);
                    setTitle("");
                    setError("");
                  }}
                  className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[49%]"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        )
      }

    </>
  );
};

export default Home;