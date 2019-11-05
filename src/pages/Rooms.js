import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import RoomsContainer from "../components/Rooms/RoomsContainer";

const Rooms = () => {
  return (
    <>
      <Hero>
        <Banner title="our rooms">
          <Link to="/" className="btn-primary">
            return home
          </Link>
        </Banner>
      </Hero>
      <RoomsContainer></RoomsContainer>
    </>
  );
};

export default Rooms;
