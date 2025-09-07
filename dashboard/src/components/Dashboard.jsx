import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, admin, userRole } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/getall`;
        if (userRole === "Teacher") {
          url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/teacher/my`;
        }
        const { data } = await axios.get(url, { withCredentials: true });
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
        toast.error("Failed to load appointments");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated, userRole]);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <div className="banner overview">
        <div className="firstBox">
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>
                {admin ? `${admin.firstName} ${admin.lastName}` : "Loading..."}
              </h5>
            </div>
            <p>Welcome To Vidyalankar Appointment System Dashboard!</p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{isLoading ? "..." : appointments.length}</h3>
        </div>
        {userRole === "Admin" && (
          <div className="thirdBox">
            <p>Registered Teachers</p>
            <h3>10</h3>
          </div>
        )}
      </div>

      <div className="banner appointments">
        <h5>Appointments</h5>
        {isLoading ? (
          <p>Loading appointments...</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Teacher</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>
                        {appointment.appointment_date
                          ? new Date(
                              appointment.appointment_date
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>{appointment.appointment_time || "—"}</td>
                      <td>
                        {appointment.teacher
                          ? `${appointment.teacher.firstName} ${appointment.teacher.lastName}`
                          : "N/A"}
                      </td>
                      <td>{appointment.department || "N/A"}</td>
                      <td>
                        {userRole === "Teacher" || userRole === "Admin" ? (
                          <select
                            className={
                              appointment.status === "Pending"
                                ? "value-pending"
                                : appointment.status === "Accepted"
                                ? "value-accepted"
                                : "value-rejected"
                            }
                            value={appointment.status}
                            onChange={(e) =>
                              handleUpdateStatus(appointment._id, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        ) : (
                          <span
                            className={
                              appointment.status === "Pending"
                                ? "value-pending"
                                : appointment.status === "Accepted"
                                ? "value-accepted"
                                : "value-rejected"
                            }
                          >
                            {appointment.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No Appointments Found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
