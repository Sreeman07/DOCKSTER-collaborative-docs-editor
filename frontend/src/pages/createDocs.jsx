import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import Navbar from "../components/Navbar";
import { api_base_url } from "../Helper";

const CreateDocs = () => {

  const { docsId } = useParams();

  const editor = useRef(null);

  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const updateDoc = async (newContent) => {

    try {

      const res = await fetch(`${api_base_url}/doc/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          docId: docsId,
          content: newContent
        })
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
      }

    } catch (err) {

      setError("Failed to update document");
    }
  };

  const getContent = async () => {

    try {

      const res = await fetch(`${api_base_url}/doc/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          docId: docsId
        })
      });

      const data = await res.json();

      if (!data.success) {

        setError(data.message);

      } else {

        setContent(data.doc.content);
      }

    } catch (err) {

      console.error(err);

      setError("Failed to load document");
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Navbar />

      <div className="px-[100px] mt-3">

        {error && (
          <p className="text-red-500 mb-2">
            {error}
          </p>
        )}

        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onBlur={(newContent) => {
            setContent(newContent);
            updateDoc(newContent);
          }}
        />

      </div>
    </>
  );
};

export default CreateDocs;