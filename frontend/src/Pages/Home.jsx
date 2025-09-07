import React, { useContext } from "react";
import Hero from "../components/Hero";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to Vidyalankar Institute | Your Trusted Education Provider"
        }
        imageUrl={"/hero.png"}
      />
      <MessageForm />
    </>
  );
};

export default Home;
