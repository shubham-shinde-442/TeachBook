import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Vidyalankar Institute of Technology is a state-of-the-art facility
            dedicated to providing comprehensive education services with
            compassion and expertise. Our team of skilled professionals is
            committed to delivering personalized education tailored to each
            student's needs. At Vidyalankar, we prioritize your well-being,
            ensuring a harmonious journey towards optimal educational wellness.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
