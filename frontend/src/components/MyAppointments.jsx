import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/my`, { withCredentials: true });
        setAppointments(data.appointments);
      } catch (error) {
        console.error(
          error.response?.data?.message || "Error fetching appointments"
        );
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <section className="dashboard page">
      <div className="banner">
        <h5>My Appointments</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appt) => (
                  <tr key={appt._id}>
                    <td>
                      {appt.teacher?.firstName} {appt.teacher?.lastName}
                    </td>
                    <td>{appt.department}</td>
                    <td>
                      {new Date(appt.appointment_date).toLocaleDateString()}
                    </td>
                    <td>{appt.appointment_time}</td>
                    <td>
                      <span
                        className={
                          appt.status === "Pending"
                            ? "value-pending"
                            : appt.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                      >
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Appointments Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyAppointments;
