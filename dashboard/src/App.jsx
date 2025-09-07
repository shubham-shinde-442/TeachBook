import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewTeacher from "./components/AddNewTeacher";
import Messages from "./components/Messages";
import Teachers from "./components/Teachers";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin, userRole } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userRole) return;

        let url = "";
        if (userRole === "Admin") url = "/api/v1/user/admin/me";
        else if (userRole === "Teacher") url = "/api/v1/user/teacher/me";

        const response = await axios.get(`http://localhost:4000${url}`, {
          withCredentials: true,
        });

        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };

    fetchUser();
  }, [userRole]);

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher/addnew" element={<AddNewTeacher />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
