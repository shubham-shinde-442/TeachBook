import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import MyAppointment from "../components/MyAppointments";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | Vidyalankar Institute"}
        imageUrl={"/signin.webp"}
      />
      <AppointmentForm />
      <MyAppointment />
    </>
  );
};

export default Appointment;
