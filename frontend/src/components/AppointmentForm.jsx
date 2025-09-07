import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [department, setDepartment] = useState("Information Technology");
  const [teacherFirstName, setTeacherFirstName] = useState("");
  const [teacherLastName, setTeacherLastName] = useState("");
  const [address, setAddress] = useState("");

  const departmentsArray = [
    "Information Technology",
    "Computer Engineering",
    "Electronics & Telecommunication",
    "Electronics & Computer Science",
    "Bio Medical",
    "Other",
  ];

  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/teachers`, { withCredentials: true });
      setTeachers(data.teachers);
      console.log(data.teachers);
    };
    fetchTeachers();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/post`, {
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          department,
          teacher_firstName: teacherFirstName,
          teacher_lastName: teacherLastName,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setAppointmentTime(""),
        setDepartment(""),
        setTeacherFirstName(""),
        setTeacherLastName(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />

            <input
              type="time"
              placeholder="Appointment Time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setTeacherFirstName("");
                setTeacherLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${teacherFirstName} ${teacherLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setTeacherFirstName(firstName);
                setTeacherLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Teacher</option>
              {teachers
                .filter((teacher) => teacher.teacherDepartment === department)
                .map((teacher, index) => (
                  <option
                    value={`${teacher.firstName} ${teacher.lastName}`}
                    key={index}
                  >
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Note"
          />
          <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
