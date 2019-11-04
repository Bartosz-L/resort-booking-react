import React, { useState, useEffect, useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { RoomContext } from "../context/context";
import defaultBcg from "../static/images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import StyledHero from "../components/StyledHero";

const SingleRoom = () => {
  const match = useRouteMatch();
  const context = useContext(RoomContext);

  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    slug: match.params.slug,
    defaultBcg: defaultBcg
  });

  const { getRoom } = context;
  const room = getRoom(state.slug);

  if (!room) {
    return (
      <div className="error">
        <h3>no such room could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images
  } = room;

  const [mainImg, ...restOfImages] = images;

  return (
    <>
      <StyledHero img={mainImg || defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>

      <section className="single-room">
        <div className="single-room-images">
          {restOfImages.map((item, index) => (
            <img key={index} src={item} alt={name} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price: ${price}</h6>
            <h6>size: {size} SQFT</h6>
            <h6>
              max capacity:
              {capacity > 1 ? ` ${capacity} people` : ` ${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
    </>
  );
};

export default SingleRoom;
