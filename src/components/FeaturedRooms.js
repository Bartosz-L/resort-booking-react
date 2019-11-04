import React, { useContext } from "react";
import { RoomContext } from "../context/context";
import Title from "./Title";
import Loading from "./Loading";
import Room from "./Room";

const FeaturedRooms = () => {
  const context = useContext(RoomContext);
  const { loading, featuredRooms } = context;

  let rooms = featuredRooms.map(room => {
    return <Room key={room.id} room={room} />;
  });

  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : rooms}
      </div>
    </section>
  );
};

export default FeaturedRooms;
