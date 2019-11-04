import React, { useState } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

const Services = () => {
  // eslint-disable-next-line no-unused-vars
  const [services, setServices] = useState([
    {
      icon: <FaCocktail />,
      title: "free cocktails",
      info:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente."
    },
    {
      icon: <FaHiking />,
      title: "Endless Hiking",
      info:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente."
    },
    {
      icon: <FaShuttleVan />,
      title: "Free shuttle",
      info:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente."
    },
    {
      icon: <FaBeer />,
      title: "Strongest beer",
      info:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente."
    }
  ]);

  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map((item, index) => {
          return (
            <article key={index} className="service">
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
