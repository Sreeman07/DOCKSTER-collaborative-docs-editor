import React, { useEffect, useState } from 'react';
import logo from "../images/logo.png";
import { RiSearchLine } from "react-icons/ri";
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:5000/api/user";

const Navbar = () => {

  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const getUser = async () => {

    try {

      const res = await fetch(`${API_BASE_URL}/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });

      const result = await res.json();

      if (!result.success) {
        setError(result.message);
        return;
      }

      setData(result.user);

    } catch (err) {

      setError(err.message);
    }
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="navbar flex items-center px-[100px] h-[90px] justify-between bg-[#F4F4F4]">

      <img src={logo} alt="Logo" />

      <div className="right flex items-center justify-end gap-2">

        <div className="inputBox w-[30vw]">
          <i>
            <RiSearchLine />
          </i>

          <input
            type="text"
            placeholder="Search Here...!"
          />
        </div>

        <button
          onClick={logout}
          className="p-[10px] min-w-[120px] bg-red-500 text-white rounded-lg border-0 transition-all hover:bg-red-600"
        >
          Logout
        </button>

        <Avatar
          name={data?.name || ""}
          className="cursor-pointer"
          size="40"
          round="50%"
        />

      </div>

      {error && (
        <p className="text-red-500">{error}</p>
      )}

    </div>
  );
};

export default Navbar;