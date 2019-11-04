import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <Hero>
      <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
        <Link to="rooms" className="btn-primary">
          our rooms
        </Link>
      </Banner>
    </Hero>
  );
};

export default Home;
